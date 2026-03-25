import { lazy } from 'react'

/**
 * 新增工具：在此增加 path 与懒加载组件，并在 siteLocales.js 的 tools[path] 补充首页卡片中英文案。
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
]
