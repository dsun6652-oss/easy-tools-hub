# Easy Tools Hub

面向开发者的**免费在线小工具集**：JSON、颜色、时间戳、编解码、密码、UUID、文本处理等，单仓库维护，首页统一入口。深色界面，**中英文切换**，计算在浏览器本地完成，无需登录。

**在线访问（GitHub Pages）**：[https://dsun6652-oss.github.io/easy-tools-hub/](https://dsun6652-oss.github.io/easy-tools-hub/)  
（与 `package.json` 的 `homepage` 一致；若更换域名或子路径，请同步修改下方 SEO 相关文件。）

## 工具一览

| 路径 | 说明 |
|------|------|
| `/` | 首页，全部工具入口 |
| `/json` | JSON 格式化、压缩、校验、转 CSV |
| `/color` | HEX / RGB / HSL 互转与取色 |
| `/timestamp` | 时间戳 ↔ 北京时间 |
| `/url` | URL 组件编码 / 解码（encodeURIComponent） |
| `/base64` | UTF-8 文本 ↔ Base64 |
| `/password` | 随机密码（长度与字符集可选） |
| `/uuid` | UUID v4 批量生成（1～10 条） |
| `/text-case` | 文本大小写：大写、小写、首字母、驼峰 |
| `/text-diff` | 双栏文本对比（行级 + 词/字级高亮） |

生产环境 `base` 为 `/easy-tools-hub/`，完整 URL 形如：`https://dsun6652-oss.github.io/easy-tools-hub/json`。

## 技术栈

- React 18、React Router 6、Vite 5  
- 深色主题 CSS 变量（`theme.css`）  
- 国际化：`I18nContext` + 各工具 `locales.js` + `siteLocales.js`

## 仓库结构

- `src/pages/Home.jsx`：首页与工具卡片  
- `src/toolsRegistry.jsx`：路由注册表（路径、懒加载组件）  
- `src/tools/<工具名>/`：各工具页面、`locales.js`；**仅在无可复用类名时**再增加专属 CSS（如 JSON 高亮、颜色面板）  
- `src/shared/`：公共能力  
  - `styles/tool-page.css`：工具页布局（`main.jsx` 已引入）。根节点使用 **`eth-tool-page`**，优先使用 `.toolbar`、`.editor-container`、`.panel*`、`.eth-tool-options`、`.eth-tool-check` 等（见该文件顶部注释）  
  - `i18n/I18nContext.jsx`：全局语言（`localStorage` 键 `easy-tools-hub:lang`）与 `I18nProvider`  
  - `i18n/siteLocales.js`：首页、顶栏、工具卡片等多语言文案  
  - `i18n/useToolLocales.js`：各工具 `locales.js` 与全局语言绑定，得到 `t`  
  - `components/LangSwitch.jsx`、`ToolPageHeader.jsx`、`ToolFooter.jsx`、`ToolErrorBanner.jsx`  
  - `hooks/useCopyWithFeedback.js`  
  - `theme.css`：全局主题变量  
- `public/robots.txt`、`public/sitemap.xml`：爬虫与站点地图（见下文 SEO）  
- `index.html`：标题、描述、Open Graph、Twitter Card、JSON-LD  

## SEO 与站点地图

为便于搜索引擎与社交预览，已做如下配置（站点根 URL 默认为 **`https://dsun6652-oss.github.io/easy-tools-hub/`**）：

| 文件 | 作用 |
|------|------|
| `index.html` | `<title>`、`<meta name="description">`、`<meta name="keywords">`、`canonical`、**Open Graph**、**Twitter Card**、**JSON-LD**（`WebSite` + `ItemList` 工具列表） |
| `public/robots.txt` | `Allow` 与 `Sitemap` 地址 |
| `public/sitemap.xml` | 首页及各工具路径的 `loc`（构建后随 `public/` 拷贝到 `dist` 根目录） |

**更换部署地址时**，请批量替换：

- `index.html` 内所有 `https://dsun6652-oss.github.io/easy-tools-hub`  
- `public/robots.txt`、`public/sitemap.xml`  
- `package.json` 的 `homepage`（若使用 gh-pages）

可选后续步骤：

- 在对应搜索引擎站长工具中提交 `sitemap.xml`  
- 如需验证站点所有权，在 `index.html` `<head>` 中加入平台提供的 `meta` 标签  
- 单页应用路由依赖前端渲染，重要着陆页可再考虑预渲染或静态快照（本仓库当前未接入）  

## 开发与构建

```bash
npm install
npm run dev
```

- 开发：`vite` 默认 `base` 为 `/`  
- 生产构建：`vite.config.js` 中 `base` 为 `/easy-tools-hub/`，与 `homepage` 一致（GitHub Pages 子路径）  

```bash
npm run build
npm run preview
```

部署：`npm run deploy`（依赖 `gh-pages`，将 `dist` 推到 `gh-pages` 分支）。

## 新增工具

1. 新建目录 `src/tools/my-tool/`，默认导出页面组件（可参考现有工具）。  
2. 添加 `locales.js`（zh/en），在组件内使用 `useToolLocales(locales)` 得到 `t`。  
3. 在 `src/shared/i18n/siteLocales.js` 的 `zh.tools` / `en.tools` 下增加与路由 `path` 一致的 key 及 `title`、`description`。  
4. 根节点使用 `<div className="eth-tool-page">`，配合 `ToolPageHeader` / `ToolFooter`，并优先复用 `tool-page.css` 中的类名。  
5. 在 `src/toolsRegistry.jsx` 的 `toolRoutes` 中增加 `path` 与 `lazy(() => import(...))`。  
6. **SEO**：在 `public/sitemap.xml` 与 `index.html` 的 JSON-LD `ItemList` 中追加新工具 URL（保持 `numberOfItems` 与实际条数一致）。  
7. 若需新的 npm 依赖，在本仓库根目录安装。  

## Agent skills（仅本仓库）

与前端规范相关的 [skills.sh](https://skills.sh/) 技能安装在 **项目内** `.agents/skills/`，**不使用** `npx skills add … -g`，避免与其它项目全局规范冲突。

在本仓库根目录执行 `npx skills list` 可查看当前技能；全局列表为 `npx skills list -g`（应为空）。
