import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'easy-tools-hub:lang'

export type Lang = 'zh' | 'en'

type I18nValue = { lang: Lang; setLang: (l: string) => void }

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'zh' || stored === 'en') return stored
      return navigator.language.startsWith('zh') ? 'zh' : 'en'
    } catch {
      return 'zh'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  const setLang = useCallback((l: string) => {
    setLangState(l === 'zh' ? 'zh' : 'en')
  }, [])

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18nLang() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18nLang must be used within I18nProvider')
  }
  return ctx
}
