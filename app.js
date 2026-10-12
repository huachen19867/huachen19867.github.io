(() => {
  'use strict';

  // Fallback keeps the homepage readable when opened directly with file://.
  // content.json edits are loaded over HTTP(S); file:// shows this embedded snapshot.
  // BEGIN GENERATED FALLBACK: keep this snapshot synchronized with content.json.
  const fallbackContent = window.HUACHEN_CONTENT || {
  "profile": {
    "name": "huachen",
    "chineseName": "陈化",
    "school": "青岛农业大学",
    "email": "huachen19867@163.com",
    "publication": "陈化AI札记",
    "intro": "在校园里学习，也在 AI 的新世界里探索。把亲手试过的工具、值得记下的体验，慢慢写成札记。",
    "cet4": {
      "score": null,
      "date": null
    }
  },
  "articles": [
    {
      "title": "后知后觉的GPT小姐真是逊呢",
      "date": "2026-10-03",
      "category": "AI实践",
      "summary": "记录 GPT 在执行刷课任务后重新强调使用边界的一段反差体验。",
      "url": "https://mp.weixin.qq.com/s/IgTbhakt77R5ZnMDggLxVw"
    },
    {
      "title": "智慧树/知到辅助：大学生最喜欢的一集",
      "date": "2026-10-01",
      "category": "工具笔记",
      "summary": "介绍网课辅助控制台的运行方式、模型答题流程，以及需要人工处理的验证环节。",
      "url": "https://mp.weixin.qq.com/s/TzfaIIkvKmxNxoD2b4P8Xg"
    },
    {
      "title": "一个查看双卡剩余流量的安卓App",
      "date": "2026-09-30",
      "category": "工具笔记",
      "summary": "把两张手机卡的剩余流量集中到一个安卓应用中，并提供卡片展示和项目下载入口。",
      "url": "https://mp.weixin.qq.com/s/6slURhUf9duu5_WPRQIMmA"
    },
    {
      "title": "Astra使用体验",
      "date": "2026-09-29",
      "category": "AI实践",
      "summary": "通过 SVG 动画、电路绘制、视频、扫雷和 Live2D 等任务记录 Astra 的实际表现。",
      "url": "https://mp.weixin.qq.com/s/FqyxfRk8mADhWITH28vwHw"
    },
    {
      "title": "雨课堂辅助-安卓app",
      "date": "2026-09-13",
      "category": "工具笔记",
      "summary": "将现有雨课堂工具精简为接入 DeepSeek API 的安卓答题应用，附界面和开源项目。",
      "url": "https://mp.weixin.qq.com/s/TnIJIex54QdHIvjOWnxnfg"
    },
    {
      "title": "在cursor中如何古法手搓编译C/C++代码？",
      "date": "2026-09-05",
      "category": "工具笔记",
      "summary": "整理 Cursor 配合 MinGW 编译 C/C++ 的环境配置、任务文件和多文件编译方法。",
      "url": "https://mp.weixin.qq.com/s/FpNsE-w9u_uctbZ0zqShUA"
    },
    {
      "title": "来自GPT6的震撼",
      "date": "2026-09-04",
      "category": "AI实践",
      "summary": "对比早期电脑操作尝试与新的官方演示，记录对模型能力变化的直观感受。",
      "url": "https://mp.weixin.qq.com/s/3OJeyFesl-5zx-coP5IrSw"
    },
    {
      "title": "从两次失败实践看AI的能力边界",
      "date": "2026-09-02",
      "category": "AI实践",
      "summary": "复盘交互摆件与 Live2D 制作的失败过程，反思 AI 协作中专业知识的重要性。",
      "url": "https://mp.weixin.qq.com/s/dkU-y6SX2OgWA7xsWJCFRg"
    },
    {
      "title": "用 v4f 写小说被气晕",
      "date": "2026-08-16",
      "category": "AI实践",
      "summary": "记录使用 v4f 写小说时，对文风表现和情节逻辑之间落差的感受。",
      "url": "https://mp.weixin.qq.com/s/9gGxImqZlCLSrxjnswTb3g"
    },
    {
      "title": "DeepSeek Harness初体验",
      "date": "2026-08-14",
      "category": "AI实践",
      "summary": "从安装到界面修改测试，记录 DeepSeek Harness 的使用体验与遇到的问题。",
      "url": "https://mp.weixin.qq.com/s/OJSuQ2nYAuZtlNGZgc6Piw"
    },
    {
      "title": "我做了一个奇象巡展手机端拼豆工具",
      "date": "2026-08-13",
      "category": "工具笔记",
      "summary": "作者为缺少手机端辅助工具的拼豆玩法制作了安卓应用，并介绍安装、授权与尺寸校准。",
      "url": "https://mp.weixin.qq.com/s/5xmOWD_8oLFlOMdgJ5J-aQ"
    },
    {
      "title": "我做了一个Windows本地视频播放器",
      "date": "2026-07-31",
      "category": "工具笔记",
      "summary": "介绍自制的 Windows 本地视频播放器，并提供下载方式供读者设置为默认播放器。",
      "url": "https://mp.weixin.qq.com/s/RHfyhya9VoGX7LJ8ueMVrA"
    },
    {
      "title": "从零开始带你vibe一个在线刷题平台",
      "date": "2026-07-02",
      "category": "AI实践",
      "summary": "演示从需求梳理到前后端实现的在线刷题平台开发，并借项目讨论 vibe coding 与 spec coding 的差别。",
      "url": "https://mp.weixin.qq.com/s/QfQp02sy618czL0TYBADog"
    },
    {
      "title": "一窥 AI 能力边界",
      "date": "2026-06-29",
      "category": "AI实践",
      "summary": "通过原理图作业中脚本生成与直接操作电路设计软件的失败经历，反思 AI 处理专业工程任务的能力边界。",
      "url": "https://mp.weixin.qq.com/s/QjU85jcJ92oJCzeHXfSkig"
    },
    {
      "title": "我做了一个本地音乐播放器",
      "date": "2026-06-21",
      "category": "工具笔记",
      "summary": "分享一款 Android 本地音乐播放器，支持多歌单、批量导入、播放模式切换和后台控制。",
      "url": "https://mp.weixin.qq.com/s/6mYfXR_pzeCikfcjhMgHvg"
    },
    {
      "title": "面向Codex的Kimi Work 免费版实测",
      "date": "2026-06-09",
      "category": "AI实践",
      "summary": "通过数据处理、系统修复、游戏调试和 Skills 调用等任务实测 Kimi Work，认为它速度快但处理复杂任务的稳定性仍有限。",
      "url": "https://mp.weixin.qq.com/s/SVH6kzdPiGtoY9F1OV35kQ"
    },
    {
      "title": "解决 codex一直reconnecting的问题",
      "date": "2026-05-08",
      "category": "工具笔记",
      "summary": "记录让 Codex 根据重连界面截图定位并修复反复 reconnecting 问题的一次快速排障。",
      "url": "https://mp.weixin.qq.com/s/hddzbob1m4CqlksFpTdB6w"
    },
    {
      "title": "用codex改cursor主题配色",
      "date": "2026-04-29",
      "category": "AI实践",
      "summary": "展示用 Codex 将 Cursor 主题改成 Claude 式暖米白背景、灰棕文字与陶土橙强调色的效果。",
      "url": "https://mp.weixin.qq.com/s/j-bpifVGpg7IqDfRDjAm2w"
    },
    {
      "title": "模拟恐怖提示词",
      "date": "2026-04-28",
      "category": "AI实践",
      "summary": "提供一条生成伪纪录片与 VHS 恐怖录像质感画面的提示词，强调摄像机界面、噪点和压暗氛围。",
      "url": "https://mp.weixin.qq.com/s/p87OmCxAAma6FxQwpUv0WQ"
    },
    {
      "title": "汉服初遇指南",
      "date": "2026-02-18",
      "category": "文化知识",
      "summary": "从汉服的基本特征与服饰结构入门，概览先秦至明代的多种服装形制及其特点。",
      "url": "https://mp.weixin.qq.com/s/AF9BQSryXJ7q2SBL7CFF3w"
    },
    {
      "title": "Midjourney新版本测评：专攻动漫有多强？",
      "date": "2026-01-31",
      "category": "AI实践",
      "summary": "介绍 Midjourney 的 Niji V7 更新和启用方式，并用多组动漫提示词展示其出图表现。",
      "url": "https://mp.weixin.qq.com/s/0AkDA7T8KzfwFWMSRQcdig"
    }
  ]
};
  // END GENERATED FALLBACK
  let currentContent = fallbackContent;
  let selectedCategory = 'all';
  const articlePageSize = 6;
  let visibleArticleLimit = articlePageSize;
  let toastTimer;
  const dialog = document.querySelector('#publication-dialog');
  const articleList = document.querySelector('#article-list');
  const initialArticleArt = document.querySelector('#article-art-template').content.querySelector('.article-art').cloneNode(true);

  function safeArticleUrl(value) {
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
    catch { return null; }
  }
  function externalLink(url, text, className) {
    const link = document.createElement('a');
    link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.className = className || ''; link.textContent = text;
    return link;
  }
  function arrow() {
    const span = document.createElement('span'); span.textContent = '↗'; span.setAttribute('aria-hidden', 'true'); return span;
  }
  function renderArticles(articles, totalCount = articles.length) {
    articleList.replaceChildren();
    const published = articles.filter(article => article && safeArticleUrl(article.url) && typeof article.title === 'string');
    const visible = published.slice(0, visibleArticleLimit);
    document.querySelector('#article-count').textContent = `已收录 ${String(totalCount).padStart(2, '0')} 篇`;
    document.querySelector('#article-results').textContent = `显示 ${visible.length} 篇，匹配 ${published.length} 篇，共收录 ${totalCount} 篇札记。`;
    const readingProgress = document.querySelector('#article-reading-progress');
    readingProgress.hidden = published.length === 0;
    const isFiltered = selectedCategory !== 'all' || document.querySelector('#article-search').value.trim() !== '';
    document.querySelector('#article-visible-count').textContent = `已展示 ${visible.length} / ${published.length} 篇${isFiltered ? '匹配札记' : '札记'}`;
    const moreButton = document.querySelector('#article-load-more');
    const remaining = published.length - visible.length;
    moreButton.hidden = remaining <= 0;
    document.querySelector('#article-more-count').textContent = `+${Math.min(articlePageSize, remaining)}`;
    moreButton.setAttribute('aria-label', `再展示 ${Math.min(articlePageSize, remaining)} 篇札记，还有 ${remaining} 篇`);
    if (!published.length) {
      const empty = document.createElement('p'); empty.className = 'article-empty'; empty.textContent = totalCount ? '没有找到这篇札记，试试其他关键词或分类。' : '札记正在整理，新的发现很快见。'; articleList.append(empty);
      return;
    }
    visible.forEach((article, index) => {
      const url = safeArticleUrl(article.url);
      const element = document.createElement('article'); element.className = index === 0 ? 'article-feature' : 'article-secondary';
      const time = document.createElement('time');
      if (/^\d{4}-\d{2}-\d{2}$/.test(article.date || '')) { time.dateTime = article.date; time.textContent = article.date.replaceAll('-', '.'); }
      const copy = document.createElement('div'); copy.className = 'article-copy';
      const meta = document.createElement('div'); meta.className = 'article-meta';
      const category = document.createElement('span'); category.textContent = article.category || '札记';
      meta.append(category, time);
      const title = document.createElement('h3');
      const titleLink = externalLink(url, article.title); titleLink.setAttribute('aria-label', `${article.title}（在新窗口打开）`); title.append(titleLink);
      const summary = document.createElement('p'); summary.textContent = article.summary || '';
      const readLink = externalLink(url, '去公众号读全文 ', 'read-link'); readLink.append(arrow());
      const accessibleHint = document.createElement('span'); accessibleHint.className = 'sr-only'; accessibleHint.textContent = '（在新窗口打开）'; readLink.append(accessibleHint);
      copy.append(meta, title, summary, readLink);
      if (index === 0) {
        const art = initialArticleArt.cloneNode(true); art.href = url; art.setAttribute('aria-label', `阅读 ${article.title}（在新窗口打开）`);
        // The pelican drawing illustrates the confirmed Astra article only.
        if (article.title !== 'Astra使用体验') {
          art.querySelector('svg').remove();
          art.querySelector('.article-art-label').textContent = 'FIELD NOTES';
          const artTitle = document.createElement('p'); artTitle.textContent = article.title; artTitle.style.cssText = 'font-size:32px;line-height:1.5;min-height:190px;display:flex;align-items:center;margin:20px 0';
          art.insertBefore(artTitle, art.querySelector('.article-art-bottom'));
        }
        element.append(art);
      }
      element.append(copy); articleList.append(element);
    });
  }
  function publishedArticles() {
    return currentContent.articles.filter(article => article && safeArticleUrl(article.url) && typeof article.title === 'string');
  }
  function applyArticleFilters(resetVisible = true) {
    if (resetVisible) visibleArticleLimit = articlePageSize;
    const all = publishedArticles();
    const query = document.querySelector('#article-search').value.trim().toLocaleLowerCase();
    const filtered = all.filter(article => (selectedCategory === 'all' || (article.category || '札记') === selectedCategory) && `${article.title} ${article.summary || ''} ${article.category || ''}`.toLocaleLowerCase().includes(query));
    document.querySelectorAll('.article-filter').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === selectedCategory)));
    renderArticles(filtered, all.length);
  }
  function setupArticleFilters() {
    const all = publishedArticles();
    const tools = document.querySelector('#article-tools'); tools.hidden = all.length < 2;
    const filters = document.querySelector('#article-filters'); filters.replaceChildren();
    const categories = [...new Set(all.map(article => article.category || '札记'))];
    selectedCategory = 'all'; document.querySelector('#article-search').value = '';
    if (categories.length > 1) {
      [['all', '全部'], ...categories.map(category => [category, category])].forEach(([value, label]) => {
        const button = document.createElement('button'); button.type = 'button'; button.className = 'article-filter'; button.dataset.category = value; button.textContent = label; button.setAttribute('aria-pressed', String(value === selectedCategory));
        button.addEventListener('click', () => { selectedCategory = value; applyArticleFilters(); }); filters.append(button);
      });
    }
    const dialogLink = document.querySelector('#dialog-article-link');
    dialogLink.hidden = !all.length;
    if (all.length) dialogLink.href = safeArticleUrl(all[0].url);
    applyArticleFilters();
  }
  function render(content) {
    if (!content || typeof content.profile !== 'object' || !Array.isArray(content.articles)) return;
    currentContent = { profile: { ...fallbackContent.profile, ...content.profile }, articles: content.articles };
    const profile = currentContent.profile;
    document.querySelectorAll('[data-profile]').forEach(element => {
      const value = profile[element.dataset.profile];
      if (typeof value !== 'string') return;
      element.textContent = value;
      if (element.id === 'hero-title') { const dot = document.createElement('span'); dot.className = 'title-dot'; dot.textContent = '.'; element.append(dot); }
    });
    const emailLink = document.querySelector('#email-link'); emailLink.href = `mailto:${profile.email}`; emailLink.textContent = `${profile.email} `; emailLink.append(arrow());
    const cet4 = profile.cet4 || {};
    const score = document.querySelector('#cet4-score');
    if (cet4.score !== null && cet4.score !== undefined && String(cet4.score).trim() !== '') {
      score.textContent = `${cet4.score} 分`; score.classList.remove('pending-score');
    } else {
      score.textContent = '等待补充 '; score.classList.add('pending-score'); const dot = document.createElement('span'); dot.className = 'pending-dot'; dot.setAttribute('aria-hidden', 'true'); score.append(dot);
    }
    document.querySelector('#cet4-date').textContent = cet4.date || '成绩记录';
    setupArticleFilters();
  }
  function showStatus(message) {
    const toast = document.querySelector('#status-message'); clearTimeout(toastTimer); toast.textContent = message; toast.classList.add('is-visible');
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3500);
  }
  document.querySelector('#copy-email').addEventListener('click', async () => {
    const email = currentContent.profile.email;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
      else {
        const input = document.createElement('textarea'); input.value = email; input.setAttribute('readonly', ''); input.style.cssText = 'position:fixed;top:-9999px;left:-9999px'; document.body.append(input); input.select();
        const copied = document.execCommand('copy'); input.remove(); document.querySelector('#copy-email').focus(); if (!copied) throw new Error('Copy unavailable');
      }
      showStatus('邮箱已复制，期待你的来信。');
    } catch { showStatus(`复制暂不可用，请手动复制：${email}`); }
  });
  document.querySelectorAll('[data-open-publication]').forEach(button => button.addEventListener('click', () => dialog.showModal()));
  document.querySelector('#article-search').addEventListener('input', () => applyArticleFilters());
  document.querySelector('#article-load-more').addEventListener('click', () => {
    const previousCount = articleList.querySelectorAll('article').length;
    visibleArticleLimit += articlePageSize;
    applyArticleFilters(false);
    // Move keyboard focus to the first newly revealed article; loading again rebuilds the list.
    const nextArticle = articleList.querySelectorAll('article')[previousCount];
    const nextLink = nextArticle && nextArticle.querySelector('h3 a');
    if (nextLink) nextLink.focus({ preventScroll: true });
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  document.querySelector('#copyright-year').textContent = String(new Date().getFullYear());
  render(fallbackContent);
  if (location.protocol !== 'file:') {
    fetch('./content.json').then(response => { if (!response.ok) throw new Error('Content unavailable'); return response.json(); }).then(content => {
      // A slow response for the same snapshot must preserve the visitor's filters
      // and expanded list instead of rendering the initial six articles again.
      if (JSON.stringify(content) !== JSON.stringify(currentContent)) render(content);
    }).catch(() => { /* The embedded public content remains available. */ });
  }
})();
