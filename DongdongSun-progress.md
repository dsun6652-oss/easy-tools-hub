# easy-tools-hub 进度摘要

## 当前架构（已合并独立仓库）

- 原 `easy-json-tool` / `easy-color-tool` / `easy-timestamp-tool` 源码迁入 `src/tools/{json,color,timestamp}/`。
- 公共：全局 `I18nProvider` + `useToolLocales(locales)`、`siteLocales`（首页/顶栏）、`LangSwitch`、`ToolPageHeader`、`ToolFooter`、`shared/theme.css`。
- 路由：`toolsRegistry.jsx` 仅引用本仓库内模块；`vite.config` 已去掉对上级目录的 `fs.allow`。

## 新增工具

在 `src/tools/<name>/` 实现组件 + `locales.js`，注册到 `toolRoutes`。

## Agent skills

- 已从用户目录 `~/.agents/skills` 移除 `frontend-design`、`vercel-react-best-practices`、`shadcn`、`react-vite-best-practices`、`find-skills`（全局）。
- 上述四项（不含 find-skills 重装）已用 `npx skills add … -y` 安装到本仓库 `.agents/skills/`；`find-skills` 仍保留在仓库内原有副本。`npx skills list -g` 应为无全局技能。

## 历史

- 曾通过相对路径引用同级独立仓库；现已单仓化。
