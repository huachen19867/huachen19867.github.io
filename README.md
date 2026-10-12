# huachen 个人主页

网站：https://huachen19867.github.io/

文章与个人资料由私有飞书多维表格维护，GitHub Actions 每小时读取一次已勾选“公开”的文章，并生成静态网站。也可以手动运行 Sync Feishu and publish homepage。GitHub 调度可能延迟，不保证立即刷新。

应用凭据只放在 GitHub Secrets，浏览器和 Pages 发布包不包含凭据。同步失败时保留上一次有效内容。

这是原生 HTML/CSS/JS 网站；scripts/feishu-sync.mjs 仅在服务端 Actions 中运行，tests/feishu-sync.test.mjs 验证同步边界。公开仓库不包含个人本地资料、参考存档或账户会话。

