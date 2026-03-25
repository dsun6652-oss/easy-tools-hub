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
    },
  },
}

export function useSiteLocales() {
  const { lang } = useI18nLang()
  return useMemo(() => siteLocales[lang], [lang])
}
