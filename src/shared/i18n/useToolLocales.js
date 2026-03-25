import { useMemo } from 'react'
import { useI18nLang } from './I18nContext'

/** 根据全局语言从当前工具的 locales 表取文案 */
export function useToolLocales(locales) {
  const { lang } = useI18nLang()
  return useMemo(() => {
    const t = (key) => locales[lang]?.[key] ?? key
    return { t }
  }, [lang, locales])
}
