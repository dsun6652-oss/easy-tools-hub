import './tool-chrome.css'

type ToolPageHeaderProps = { t: (key: string) => string }

export function ToolPageHeader({ t }: ToolPageHeaderProps) {
  return (
    <header className="eth-tool-header">
      <h1>{t('title')}</h1>
      <p className="eth-tool-subtitle">{t('subtitle')}</p>
    </header>
  )
}
