import { lazy } from 'react'

/**
 * 新增工具：在此增加 path 与懒加载组件，并在 siteLocales.js 的 tools[path] 补充首页卡片中英文案。
 * 页面样式优先复用 shared/styles/tool-page.css（根节点 .eth-tool-page），避免重复整页 CSS。
 */
export const toolRoutes = [
  {
    path: 'json',
    Component: lazy(() => import('./tools/json/JsonTool.jsx')),
  },
  {
    path: 'color',
    Component: lazy(() => import('./tools/color/ColorTool.jsx')),
  },
  {
    path: 'timestamp',
    Component: lazy(() => import('./tools/timestamp/TimestampTool.jsx')),
  },
  {
    path: 'url',
    Component: lazy(() => import('./tools/url/UrlTool.jsx')),
  },
  {
    path: 'base64',
    Component: lazy(() => import('./tools/base64/Base64Tool.jsx')),
  },
  {
    path: 'password',
    Component: lazy(() => import('./tools/password/PasswordTool.jsx')),
  },
  {
    path: 'uuid',
    Component: lazy(() => import('./tools/uuid/UuidTool.jsx')),
  },
  {
    path: 'text-case',
    Component: lazy(() => import('./tools/text-case/TextCaseTool.jsx')),
  },
  {
    path: 'text-diff',
    Component: lazy(() => import('./tools/text-diff/TextDiffTool.jsx')),
  },
]
