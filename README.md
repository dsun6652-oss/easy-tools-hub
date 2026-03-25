# Easy Tools Hub

开发者常用小工具集合：JSON、颜色、时间戳等，单仓库维护、首页统一入口。

## 结构说明

- `src/pages/Home.jsx`：首页与工具卡片
- `src/toolsRegistry.jsx`：路由注册表（路径、标题、懒加载组件）
- `src/tools/<工具名>/`：各工具页面、`locales.js` 与专属样式
- `src/shared/`：公共能力
  - `i18n/I18nContext.jsx`：全局语言（`easy-tools-hub:lang`）与 `I18nProvider`
  - `i18n/siteLocales.js`：首页、顶栏、工具卡片等多语言文案
  - `i18n/useToolLocales.js`：各工具 `locales.js` 与全局语言绑定，得到 `t`
  - `components/LangSwitch.jsx`：语言切换按钮（用于首页与工具顶栏）
  - `components/ToolPageHeader.jsx`、`ToolFooter.jsx`：工具页标题区与页脚（无语言按钮）
  - `theme.css`：全局主题变量

## 开发与构建

```bash
npm install
npm run dev
```

- 开发：`base` 为 `/`
- 生产构建：`base` 为 `/easy-tools-hub/`，与 `package.json` 的 `homepage` 一致（如 GitHub Pages）

## 新增工具

1. 新建目录 `src/tools/my-tool/`，提供默认导出组件（可参考现有工具）。
2. 添加 `locales.js`（zh/en），在组件内使用 `useToolLocales(locales)` 得到 `t`。
3. 在 `src/shared/i18n/siteLocales.js` 的 `zh.tools` / `en.tools` 下增加 `my-tool` 的 `title`、`description`（供首页卡片）。
4. 使用 `ToolPageHeader` / `ToolFooter` 保持与其它页一致。
5. 在 `src/toolsRegistry.jsx` 的 `toolRoutes` 中增加 `path` 与 `lazy(() => import('./tools/my-tool/MyTool.jsx'))`。
6. 若需新的 npm 依赖，在本仓库根目录安装。

## Agent skills（仅本仓库）

与前端规范相关的 [skills.sh](https://skills.sh/) 技能安装在 **项目内** `.agents/skills/`，**不使用** `npx skills add … -g`，避免与公司其它项目全局规范冲突。

在本仓库根目录执行 `npx skills list` 可查看当前技能；全局列表为 `npx skills list -g`（应为空）。
