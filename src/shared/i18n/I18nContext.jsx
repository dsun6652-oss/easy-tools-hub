import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'easy-tools-hub:lang'

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return (
        localStorage.getItem(STORAGE_KEY) ||
        (navigator.language.startsWith('zh') ? 'zh' : 'en')
      )
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

  const setLang = useCallback((l) => {
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
