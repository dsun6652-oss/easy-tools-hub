import './tool-chrome.css'

export function ToolPageHeader({ t }) {
  return (
    <header className="eth-tool-header">
      <h1>{t('title')}</h1>
      <p className="eth-tool-subtitle">{t('subtitle')}</p>
    </header>
  )
}
