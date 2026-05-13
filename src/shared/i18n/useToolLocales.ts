import { useMemo } from 'react'
import { useI18nLang } from './I18nContext'
import type { Lang } from './I18nContext'

export type ToolLocaleTable = Record<Lang, Record<string, string>>

/** 根据全局语言从当前工具的 locales 表取文案 */
export function useToolLocales(locales: ToolLocaleTable) {
  const { lang } = useI18nLang()
  return useMemo(() => {
    const t = (key: string) => locales[lang]?.[key] ?? key
    return { t }
  }, [lang, locales])
}
