import { useState, useCallback } from 'react'
import { ToolPageHeader } from '@hub/shared/components/ToolPageHeader'
import { ToolFooter } from '@hub/shared/components/ToolFooter'
import { ToolErrorBanner } from '@hub/shared/components/ToolErrorBanner'
import { useCopyWithFeedback } from '@hub/shared/hooks/useCopyWithFeedback'
import { useToolLocales } from '@hub/shared/i18n/useToolLocales'
import { generatePassword } from './generatePassword'
import { locales } from './locales'

export default function PasswordTool() {
  const { t } = useToolLocales(locales)
  const [length, setLength] = useState(16)
  const [useUpper, setUseUpper] = useState(true)
  const [useLower, setUseLower] = useState(true)
  const [useDigit, setUseDigit] = useState(true)
  const [useSymbol, setUseSymbol] = useState(true)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const lengthForGen = length === '' ? NaN : length

  const runGenerate = useCallback(() => {
    setError('')
    const result = generatePassword(lengthForGen, {
      upper: useUpper,
      lower: useLower,
      digit: useDigit,
      symbol: useSymbol,
    })
    if (!result.ok) {
      setPassword('')
      setError(result.reason === 'noCharset' ? t('errorNoCharset') : t('errorLength'))
      return
    }
    setPassword(result.password)
  }, [lengthForGen, useUpper, useLower, useDigit, useSymbol, t])

  const onCopyError = useCallback(() => setError(t('errorCopy')), [t])
  const { copied, copy } = useCopyWithFeedback(onCopyError)

  const clearAll = useCallback(() => {
    setPassword('')
    setError('')
  }, [])

  const onLengthChange = (e) => {
    const v = e.target.value
    if (v === '') {
      setLength('')
      return
    }
    const n = Number(v)
    if (Number.isFinite(n)) setLength(n)
  }

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
          <button type="button" onClick={() => copy(password)} className="btn btn-ghost" disabled={!password}>
            {copied ? t('copied') : t('copy')}
          </button>
          <button type="button" onClick={clearAll} className="btn btn-ghost">
            {t('clear')}
          </button>
        </div>
      </div>

      <ToolErrorBanner message={error} />

      <div className="eth-tool-options">
        <label className="eth-tool-field-num">
          <span>{t('length')}</span>
          <input
            type="number"
            min={4}
            max={128}
            value={length}
            onChange={onLengthChange}
            onBlur={() => {
              if (length === '' || !Number.isFinite(lengthForGen)) setLength(16)
              else setLength(Math.min(128, Math.max(4, Math.floor(lengthForGen))))
            }}
          />
        </label>
        <label className="eth-tool-check">
          <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} />
          {t('upper')}
        </label>
        <label className="eth-tool-check">
          <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} />
          {t('lower')}
        </label>
        <label className="eth-tool-check">
          <input type="checkbox" checked={useDigit} onChange={(e) => setUseDigit(e.target.checked)} />
          {t('digit')}
        </label>
        <label className="eth-tool-check">
          <input type="checkbox" checked={useSymbol} onChange={(e) => setUseSymbol(e.target.checked)} />
          {t('symbol')}
        </label>
      </div>

      <div className="panel">
        <div className="panel-header">
          <span>{t('output')}</span>
        </div>
        <pre className="panel-output panel-output--emphasis">
          {password ? (
            <code>{password}</code>
          ) : (
            <span className="placeholder">{t('placeholder')}</span>
          )}
        </pre>
      </div>

      <ToolFooter t={t} />
    </div>
  )
}
