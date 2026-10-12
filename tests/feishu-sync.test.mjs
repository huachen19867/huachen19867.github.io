import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import {
  SyncError, parsePage, listAllRecords, dateInShanghai, buildPublicContent,
  synchronizeFallback, runSync, createClient, readConfig
} from '../scripts/feishu-sync.mjs';

const articleColumns = ['标题', '发布日期', '分类', '摘要', '文章链接', '公开', '排序'];
const articleTypes = ['text', 'datetime', 'select', 'text', 'text', 'checkbox', 'number'];
const profileColumns = ['姓名', '中文名', '学校', '邮箱', '公众号', '简介', '四级总分', '考试日期'];
const profileTypes = ['text', 'text', 'text', 'text', 'text', 'text', 'number', 'text'];
const profileRow = ['huachen', '陈化', '青岛农业大学', 'huachen19867@163.com', '陈化AI札记', '记录学习与探索。', null, null];
const articleRow = (index, visible = true) => [`文章${index}`, '2026-09-29 00:00:00', ['AI实践'], `摘要${index}`, `https://example.com/article/${index}`, visible, index];

function matrix(columns, types, ids, rows, hasMore = false, extras = {}) {
  return { timezone: 'Asia/Shanghai', fields: columns, field_id_list: columns.map((_, i) => `fld_${i}`), field_type_list: types, record_id_list: ids, data: rows, has_more: hasMore, ...extras };
}
const articlePage = (ids, rows, more = false, extras = {}) => matrix(articleColumns, articleTypes, ids, rows, more, extras);
const profilePage = () => matrix(profileColumns, profileTypes, ['rec_profile'], [profileRow]);
const response = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), { status, headers });
const authPayload = { access_token: 't-token-never-publish-783142', token_type: 'Bearer', expires_in: 7200 };
const env = outputDir => ({ FEISHU_APP_ID: 'cli-secret-id-481516', FEISHU_APP_SECRET: 'app-secret-never-publish-987654', FEISHU_BASE_TOKEN: 'basc_database', FEISHU_ARTICLES_TABLE_ID: 'tbl_articles', FEISHU_PROFILE_TABLE_ID: 'tbl_profile', FEISHU_OUTPUT_DIR: outputDir });
const records = data => parsePage(data).records;
const originalApp = '(() => {\n  // BEGIN GENERATED FALLBACK: snapshot\n  const fallbackContent = window.HUACHEN_CONTENT || {"old":true};\n  // END GENERATED FALLBACK\n  window.snapshot = fallbackContent;\n})();\n';

async function tempSite(t) {
  const outputDir = await fs.mkdtemp(path.join(os.tmpdir(), 'huachen-feishu-test-'));
  t.after(() => fs.rm(outputDir, { recursive: true, force: true }));
  const originalJson = '{"old":"last good content"}\n';
  await fs.writeFile(path.join(outputDir, 'content.json'), originalJson);
  await fs.writeFile(path.join(outputDir, 'app.js'), originalApp);
  return { outputDir, originalJson };
}

test('official v3 matrix maps columns, text, select, boolean and nullable score', () => {
  const page = articlePage(['rec_1', 'rec_hidden'], [articleRow(1), articleRow(2, false)]);
  const content = buildPublicContent(records(page), records(profilePage()));
  assert.equal(content.articles.length, 1);
  assert.deepEqual(content.articles[0], { title: '文章1', date: '2026-09-29', category: 'AI实践', summary: '摘要1', url: 'https://example.com/article/1' });
  assert.deepEqual(content.profile.cet4, { score: null, date: null });
  assert.deepEqual(Object.keys(content), ['profile', 'articles']);
  assert.equal(JSON.stringify(content).includes('rec_'), false);
});

test('hidden, absent, string true, and numeric checkbox values cannot authorize publication', () => {
  const inputs = [false, null, 'true', 1];
  const content = buildPublicContent(records(articlePage(inputs.map((_, i) => `rec_${i}`), inputs.map((value, i) => articleRow(i, value)))), records(profilePage()));
  assert.deepEqual(content.articles, []);
  const missing = records(articlePage(['rec_x'], [articleRow(4)])); delete missing[0].fields['公开'];
  assert.throws(() => buildPublicContent(missing, records(profilePage())), { code: 'REQUIRED_COLUMN_MISSING' });
});

test('short pages with has_more continue using actual returned row count', async () => {
  const offsets = [];
  const pages = [articlePage(['r1'], [articleRow(1)], true, { total: 3 }), articlePage(['r2', 'r3'], [articleRow(2), articleRow(3)], false, { total: 3 })];
  const client = { listPage: async (_, offset, limit) => { offsets.push([offset, limit]); return pages.shift(); } };
  assert.equal((await listAllRecords(client, 'table')).length, 3);
  assert.deepEqual(offsets, [[0, 200], [1, 200]]);
});

test('repeated records, empty continuing pages, truncated totals and schema changes fail closed', async () => {
  for (const pages of [
    [articlePage(['r1'], [articleRow(1)], true), articlePage(['r1'], [articleRow(1)])],
    [articlePage([], [], true)],
    [articlePage(['r1'], [articleRow(1)], false, { total: 2 })],
    [articlePage(['r1'], [articleRow(1)], true), articlePage(['r2'], [articleRow(2)], false, { timezone: 'UTC' })]
  ]) {
    await assert.rejects(listAllRecords({ listPage: async () => pages.shift() }, 'table'), SyncError);
  }
});

test('bounded page count stops an unending unique-record stream', async () => {
  let index = 0;
  await assert.rejects(listAllRecords({ listPage: async () => articlePage([`rec${++index}`], [articleRow(index)], true) }, 'table', { maxPages: 3 }), { code: 'PAGINATION_LIMIT' });
});

test('official matrix shape takes priority and malformed columns are rejected', () => {
  const malformed = articlePage(['r1'], [articleRow(1)]); malformed.field_id_list.pop(); malformed.items = [{ record_id: 'fallback', fields: {} }];
  assert.throws(() => parsePage(malformed), { code: 'INVALID_MATRIX' });
  assert.throws(() => parsePage({ items: [], has_more: 'false' }), { code: 'INVALID_PAGINATION' });
  assert.throws(() => parsePage(articlePage([], [], false, { ignored_fields: [{ name: '公开' }] })), { code: 'INCOMPLETE_FIELDS' });
  assert.equal(parsePage({ records: [{ record_id: 'r', fields: { 标题: 'wrapper' } }], has_more: false }).records[0].fields['标题'], 'wrapper');
});

test('Shanghai date mapping converts UTC boundaries and rejects invalid/ambiguous dates', () => {
  assert.equal(dateInShanghai('2026-09-28T18:00:00Z'), '2026-09-29');
  assert.equal(dateInShanghai(Date.parse('2026-09-28T18:00:00Z')), '2026-09-29');
  assert.equal(dateInShanghai('2026-09-29 00:00:00'), '2026-09-29');
  assert.throws(() => dateInShanghai('2026-02-31 00:00:00'), { code: 'INVALID_DATE' });
  assert.throws(() => dateInShanghai('2026-02-31T00:00:00+08:00'), { code: 'INVALID_DATE' });
  assert.throws(() => dateInShanghai('2026-09-29 00:00:00', 'America/New_York'), { code: 'AMBIGUOUS_DATE_TIMEZONE' });
});

test('only HTTPS links without embedded credentials are exported, Markdown URL is decoded', () => {
  for (const url of ['http://example.com', 'javascript:alert(1)', 'https://username:password@example.com']) {
    const input = records(articlePage(['r1'], [articleRow(1)])); input[0].fields['文章链接'] = url;
    assert.throws(() => buildPublicContent(input, records(profilePage())), { code: 'INVALID_ARTICLE_URL' });
  }
  const input = records(articlePage(['r1'], [articleRow(1)])); input[0].fields['文章链接'] = '[文章](https://example.com/a)';
  assert.equal(buildPublicContent(input, records(profilePage())).articles[0].url, 'https://example.com/a');
});

test('ordering is explicit ascending then most recent publication; private columns never export', () => {
  const rows = [articleRow(2), articleRow(1)];
  const input = records(articlePage(['r2', 'r1'], rows)); input[0].fields['私人备注'] = 'private bookkeeping';
  assert.deepEqual(buildPublicContent(input, records(profilePage())).articles.map(item => item.title), ['文章1', '文章2']);
  assert.equal(JSON.stringify(buildPublicContent(input, records(profilePage()))).includes('private bookkeeping'), false);
});

test('secret found in a public field rejects publication without exposing it in error text', () => {
  const secret = 'a-secret-that-must-never-appear';
  const input = records(articlePage(['r1'], [articleRow(1)])); input[0].fields['摘要'] = secret;
  assert.throws(() => buildPublicContent(input, records(profilePage()), [secret]), error => error.code === 'SECRET_FOUND_IN_PUBLIC_DATA' && !error.message.includes(secret));
});

test('fallback JSON is literal data, preserves outside source, and cannot inject JavaScript', () => {
  const content = { profile: { name: '"; window.injected=true; //\u2028' }, articles: [] };
  const source = synchronizeFallback(originalApp, content), context = { window: {} };
  vm.runInNewContext(source, context);
  assert.equal(context.window.injected, undefined);
  assert.equal(context.window.snapshot.profile.name, content.profile.name);
  assert.equal(source.includes('window.snapshot = fallbackContent'), true);
  assert.throws(() => synchronizeFallback('missing marker', content), { code: 'FALLBACK_MARKER_MISSING' });
});

test('429 Retry-After and transient network errors use bounded retries', async () => {
  const waits = []; let call = 0;
  const client = createClient(readConfig(env('.')), { sleep: async ms => waits.push(ms), fetchImpl: async () => {
    call++;
    if (call === 1) return response({}, 429, { 'Retry-After': '2' });
    if (call === 2) throw new Error('private transport exception with credentials');
    return response(authPayload);
  } });
  await client.authenticate(); assert.deepEqual(waits, [2000, 2000]); assert.equal(call, 3);
});

test('authentication uses explicit client_credentials form and does not send a user token', async () => {
  const config = readConfig(env('.')); let call;
  const client = createClient(config, { fetchImpl: async (url, options) => { call = { url, options }; return response(authPayload); } });
  await client.authenticate();
  assert.equal(call.url, 'https://accounts.feishu.cn/oauth/v3/token');
  assert.equal(call.options.method, 'POST');
  assert.equal(call.options.headers['Content-Type'], 'application/x-www-form-urlencoded');
  assert.equal(call.options.headers.Authorization, undefined);
  assert.deepEqual(Object.fromEntries(new URLSearchParams(call.options.body)), { grant_type: 'client_credentials', client_id: config.appId, client_secret: config.appSecret });
  let attempts = 0;
  const rejected = createClient(config, { fetchImpl: async () => { attempts++; return response({ error: 'invalid_client', error_description: config.appSecret }); } });
  await assert.rejects(rejected.authenticate(), error => error.code === 'AUTH_REJECTED' && !error.message.includes(config.appSecret));
  assert.equal(attempts, 1);
});

test('successful end-to-end sync publishes only safe content and updates matching fallback', async t => {
  const { outputDir } = await tempSite(t);
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, options });
    if (url.includes('/oauth/v3/token')) return response(authPayload);
    return response({ code: 0, data: url.includes('tbl_profile') ? profilePage() : articlePage(['r1', 'private'], [articleRow(1), articleRow(2, false)]) });
  };
  const result = await runSync({ env: env(outputDir), fetchImpl });
  assert.deepEqual(result, { changed: true, publishedCount: 1 });
  assert.match(calls[1].url, /\/open-apis\/base\/v3\/bases\/basc_database\/tables\/tbl_articles\/records\?offset=0&limit=200$/);
  assert.equal(calls[1].options.headers.Authorization, `Bearer ${authPayload.access_token}`);
  const json = await fs.readFile(path.join(outputDir, 'content.json'), 'utf8'), app = await fs.readFile(path.join(outputDir, 'app.js'), 'utf8');
  const content = JSON.parse(json), context = { window: {} }; vm.runInNewContext(app, context);
  assert.equal(JSON.stringify(context.window.snapshot), JSON.stringify(content));
  for (const secret of [env(outputDir).FEISHU_APP_ID, env(outputDir).FEISHU_APP_SECRET, authPayload.access_token, 'private']) { assert.equal(json.includes(secret), false); assert.equal(app.includes(secret), false); }
  assert.deepEqual(await fs.readdir(outputDir), ['app.js', 'content.json']);
  assert.deepEqual(await runSync({ env: env(outputDir), fetchImpl }), { changed: false, publishedCount: 1 });
});

test('permission, network, invalid schema and later-page failure preserve both last-good files', async t => {
  for (const mode of ['permission', 'network', 'schema', 'later-page']) {
    const { outputDir, originalJson } = await tempSite(t);
    let count = 0;
    const fetchImpl = async url => {
      if (url.includes('/oauth/v3/token')) return response(authPayload);
      if (mode === 'permission') return response({ code: 91403, msg: env(outputDir).FEISHU_APP_SECRET }, 403);
      if (mode === 'network') throw new Error(env(outputDir).FEISHU_APP_SECRET);
      if (mode === 'schema') return response({ code: 0, data: articlePage([], [], false, { fields: ['not-public'] }) });
      if (++count === 1) return response({ code: 0, data: articlePage(['r1'], [articleRow(1)], true) });
      return response({ code: 91403, msg: authPayload.access_token });
    };
    await assert.rejects(runSync({ env: env(outputDir), fetchImpl, sleep: async () => {} }), error => error instanceof SyncError && !error.message.includes(env(outputDir).FEISHU_APP_SECRET) && !error.message.includes(authPayload.access_token));
    assert.equal(await fs.readFile(path.join(outputDir, 'content.json'), 'utf8'), originalJson);
    assert.equal(await fs.readFile(path.join(outputDir, 'app.js'), 'utf8'), originalApp);
  }
});

