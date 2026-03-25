import { useState, useCallback } from 'react'
import { ToolPageHeader } from '@hub/shared/components/ToolPageHeader'
import { ToolFooter } from '@hub/shared/components/ToolFooter'
import { ToolErrorBanner } from '@hub/shared/components/ToolErrorBanner'
import { useCopyWithFeedback } from '@hub/shared/hooks/useCopyWithFeedback'
import { useToolLocales } from '@hub/shared/i18n/useToolLocales'
import { randomUuidV4Batch } from './uuidV4'
import { locales } from './locales'

const COUNT_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function UuidTool() {
  const { t } = useToolLocales(locales)
  const [count, setCount] = useState(1)
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const runGenerate = useCallback(() => {
    setError('')
    const lines = randomUuidV4Batch(count)
    setText(lines.join('\n'))
  }, [count])

  const onCopyError = useCallback(() => setError(t('errorCopy')), [t])
  const { copied, copy } = useCopyWithFeedback(onCopyError)

  const clearAll = useCallback(() => {
    setText('')
    setError('')
  }, [])

  return (
    <div className="eth-tool-page">
      <ToolPageHeader t={t} />

      <div className="toolbar toolbar--responsive">
        <div className="toolbar-left">
          <button type="button" onClick={runGenerate} className="btn btn-primary">
            {t('generate')}
          </button>
        </div>
        <div className="toolbar-right">
          <button type="button" onClick={() => copy(text)} className="btn btn-ghost" disabled={!text}>
            {copied ? t('copied') : t('copy')}
          </button>
          <button type="button" onClick={clearAll} className="btn btn-ghost">
            {t('clear')}
          </button>
        </div>
      </div>

      <ToolErrorBanner message={error} />

      <div className="eth-tool-options">
        <label className="unit-control">
          <span>{t('count')}</span>
          <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
            {COUNT_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="panel">
        <div className="panel-header">
          <span>{t('output')}</span>
        </div>
        <pre className="panel-output panel-output--emphasis">
          {text ? <code>{text}</code> : <span className="placeholder">{t('placeholder')}</span>}
        </pre>
      </div>

      <ToolFooter t={t} />
    </div>
  )
}
