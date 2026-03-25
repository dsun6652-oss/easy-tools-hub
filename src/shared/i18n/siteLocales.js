import { useMemo } from 'react'
import { useI18nLang } from './I18nContext'

const siteLocales = {
  zh: {
    homeTitle: 'Easy Tools',
    homeLead: '开发者常用小工具，单页入口，持续扩展。',
    navBack: '← 返回工具集',
    loading: '加载中…',
    cardCta: '进入 →',
    langSwitchToEn: 'EN',
    langSwitchToZh: '中',
    langTitleToEn: 'Switch to English',
    langTitleToZh: '切换到中文',
    tools: {
      json: { title: 'JSON 工具', description: '格式化、压缩、实时校验、转 CSV' },
      color: { title: '颜色工具', description: 'HEX / RGB / HSL 互转与取色' },
      timestamp: { title: '时间戳工具', description: '时间戳与北京时间互转' },
      url: { title: 'URL 编码', description: '文本与 URL 编码互转' },
      base64: { title: 'Base64', description: '文本与 Base64 互转' },
      password: { title: '随机密码', description: '长度与字符集可选，本地生成' },
      uuid: { title: 'UUID v4', description: '批量生成随机 UUID，最多 10 条' },
      'text-case': { title: '文本大小写', description: '大写、小写、首字母、驼峰' },
      'text-diff': { title: '文本对比', description: '双栏按行比对，标出差异' },
    },
  },
  en: {
    homeTitle: 'Easy Tools',
    homeLead: 'Handy dev utilities in one place. Easy to extend.',
    navBack: '← Back to hub',
    loading: 'Loading…',
    cardCta: 'Open →',
    langSwitchToEn: 'EN',
    langSwitchToZh: '中文',
    langTitleToEn: 'Switch to English',
    langTitleToZh: '切换到中文',
    tools: {
      json: { title: 'JSON', description: 'Format, minify, validate, export CSV' },
      color: { title: 'Color', description: 'HEX / RGB / HSL conversion & picker' },
      timestamp: { title: 'Timestamp', description: 'Timestamp ↔ Beijing time' },
      url: { title: 'URL Encode', description: 'Encode & decode URL text' },
      base64: { title: 'Base64', description: 'Text ↔ Base64' },
      password: { title: 'Password', description: 'Length & sets; generated locally' },
      uuid: { title: 'UUID v4', description: 'Random UUIDs, up to 10 at once' },
      'text-case': { title: 'Text case', description: 'Upper, lower, title, camelCase' },
      'text-diff': { title: 'Text diff', description: 'Two-pane line diff with highlights' },
    },
  },
}

export function useSiteLocales() {
  const { lang } = useI18nLang()
  return useMemo(() => siteLocales[lang], [lang])
}
