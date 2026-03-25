import { useState, useCallback } from 'react'
import { ToolPageHeader } from '@hub/shared/components/ToolPageHeader'
import { ToolFooter } from '@hub/shared/components/ToolFooter'
import { ToolErrorBanner } from '@hub/shared/components/ToolErrorBanner'
import { useCopyWithFeedback } from '@hub/shared/hooks/useCopyWithFeedback'
import { useToolLocales } from '@hub/shared/i18n/useToolLocales'
import { caseModes } from './caseTransforms'
import { locales } from './locales'

export default function TextCaseTool() {
  const { t } = useToolLocales(locales)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const apply = useCallback(
    (mode) => {
      setError('')
      if (!input.length) {
        setOutput('')
        return
      }
      const fn = caseModes[mode]
      setOutput(fn ? fn(input) : input)
    },
    [input],
  )

  const onCopyError = useCallback(() => setError(t('errorCopy')), [t])
  const { copied, copy } = useCopyWithFeedback(onCopyError)

  const clearAll = useCallback(() => {
    setInput('')
    setOutput('')
    setError('')
  }, [])

  return (
    <div className="eth-tool-page">
      <ToolPageHeader t={t} />

      <div className="toolbar toolbar--responsive">
        <div className="toolbar-left">
          <button type="button" onClick={() => apply('upper')} className="btn btn-primary">
            {t('upper')}
          </button>
          <button type="button" onClick={() => apply('lower')} className="btn btn-secondary">
            {t('lower')}
          </button>
          <button type="button" onClick={() => apply('title')} className="btn btn-secondary">
            {t('titleCase')}
          </button>
          <button type="button" onClick={() => apply('camel')} className="btn btn-secondary">
            {t('camelCase')}
          </button>
        </div>
        <div className="toolbar-right">
          <button type="button" onClick={() => copy(output)} className="btn btn-ghost" disabled={!output}>
            {copied ? t('copied') : t('copy')}
          </button>
          <button type="button" onClick={clearAll} className="btn btn-ghost">
            {t('clear')}
          </button>
        </div>
      </div>

      <ToolErrorBanner message={error} />

      <div className="editor-container">
        <div className="panel">
          <div className="panel-header">
            <span>{t('input')}</span>
          </div>
          <textarea
            className="panel-input"
            placeholder={t('inputPlaceholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="panel">
          <div className="panel-header">
            <span>{t('output')}</span>
          </div>
          <pre className="panel-output">
            {output ? <code>{output}</code> : <span className="placeholder">{t('placeholder')}</span>}
          </pre>
        </div>
      </div>

      <ToolFooter t={t} />
    </div>
  )
}
