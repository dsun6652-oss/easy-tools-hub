import { useI18nLang } from '@hub/shared/i18n/I18nContext'
import { useSiteLocales } from '@hub/shared/i18n/siteLocales'
import './LangSwitch.css'

export function LangSwitch({ className = '' }) {
  const { lang, setLang } = useI18nLang()
  const site = useSiteLocales()
  const next = lang === 'zh' ? 'en' : 'zh'

  return (
    <button
      type="button"
      className={`eth-lang-switch ${className}`.trim()}
      onClick={() => setLang(next)}
      title={lang === 'zh' ? site.langTitleToEn : site.langTitleToZh}
    >
      {lang === 'zh' ? site.langSwitchToEn : site.langSwitchToZh}
    </button>
  )
}
