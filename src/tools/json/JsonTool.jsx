import { useState, useCallback, useEffect } from 'react'
import { ToolPageHeader } from '@hub/shared/components/ToolPageHeader'
import { ToolFooter } from '@hub/shared/components/ToolFooter'
import { useToolLocales } from '@hub/shared/i18n/useToolLocales'
import { locales } from './locales'
import './JsonTool.css'

export default function JsonTool() {
  const { t } = useToolLocales(locales)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)
  const [copied, setCopied] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [outputMode, setOutputMode] = useState('json')

  useEffect(() => {
    if (!input.trim()) {
      setValidationError('')
      return
    }
    try {
      JSON.parse(input)
      setValidationError('')
    } catch (e) {
      setValidationError(e.message || t('jsonSyntaxError'))
    }
  }, [input, t])

  useEffect(() => {
    if (outputMode !== 'json' || !output || !input.trim()) return
    try {
      const parsed = JSON.parse(input)
      const space = indent === 0 ? '\t' : indent
      setOutput(JSON.stringify(parsed, null, space))
    } catch {}
  }, [indent])

  const formatJSON = useCallback(
    (minify = false) => {
      setError('')
      setOutputMode('json')
      if (!input.trim()) {
        setOutput('')
        return
      }
      try {
        const parsed = JSON.parse(input)
        const space = indent === 0 ? '\t' : indent
        const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, space)
        setOutput(formatted)
      } catch (e) {
        setError(e.message || t('errorParse'))
        setOutput('')
      }
    },
    [input, indent, t],
  )

  const jsonToCsv = useCallback(() => {
    setError('')
    setOutputMode('csv')
    if (!input.trim()) {
      setOutput('')
      return
    }
    try {
      const parsed = JSON.parse(input)
      const rows = Array.isArray(parsed) ? parsed : [parsed]
      if (rows.length === 0) {
        setOutput('')
        return
      }
      const headers = [...new Set(rows.flatMap((r) => Object.keys(r)))]
      const escapeCsv = (val) => {
        const str = val == null ? '' : typeof val === 'object' ? JSON.stringify(val) : String(val)
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`
        }
        return str
      }
      const lines = [
        headers.join(','),
        ...rows.map((row) => headers.map((h) => escapeCsv(row[h] ?? '')).join(',')),
      ]
      setOutput(lines.join('\n'))
    } catch (e) {
      setError(e.message || t('errorConvert'))
      setOutput('')
    }
  }, [input, t])

  const copyToClipboard = useCallback(async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError(t('errorCopy'))
    }
  }, [output, t])

  const downloadFile = useCallback(() => {
    if (!output) return
    const ext = outputMode === 'csv' ? 'csv' : 'json'
    const mime = outputMode === 'csv' ? 'text/csv;charset=utf-8' : 'application/json;charset=utf-8'
    const content = outputMode === 'csv' ? '\ufeff' + output : output
    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `data.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }, [output, outputMode])

  const clearAll = useCallback(() => {
    setInput('')
    setOutput('')
    setError('')
    setValidationError('')
  }, [])

  const highlightJSON = (str) => {
    if (!str) return null
    return str.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = 'json-string'
        if (/^"/.test(match)) {
          cls = match.endsWith(':') ? 'json-key' : 'json-string'
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean'
        } else if (/null/.test(match)) {
          cls = 'json-null'
        } else if (/^-?\d/.test(match)) {
          cls = 'json-number'
        }
        return `<span class="${cls}">${escapeHtml(match)}</span>`
      },
    )
  }

  const escapeHtml = (text) => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  return (
    <div className="json-tool">
      <ToolPageHeader t={t} />

      <div className="toolbar">
        <div className="toolbar-left">
          <button type="button" onClick={() => formatJSON(false)} className="btn btn-primary">
            {t('format')}
          </button>
          <button type="button" onClick={() => formatJSON(true)} className="btn btn-secondary">
            {t('minify')}
          </button>
          <button type="button" onClick={jsonToCsv} className="btn btn-secondary">
            {t('toCsv')}
          </button>
          <label className="indent-control">
            <span>{t('indent')}</span>
            <select value={indent} onChange={(e) => setIndent(Number(e.target.value))}>
              <option value={2}>{t('indent2')}</option>
              <option value={4}>{t('indent4')}</option>
              <option value={0}>{t('indentTab')}</option>
            </select>
          </label>
        </div>
        <div className="toolbar-right">
          <button type="button" onClick={downloadFile} className="btn btn-secondary" disabled={!output}>
            {t('download')}
          </button>
          <button type="button" onClick={copyToClipboard} className="btn btn-ghost" disabled={!output}>
            {copied ? t('copied') : t('copy')}
          </button>
          <button type="button" onClick={clearAll} className="btn btn-ghost">
            {t('clear')}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span className="error-icon">!</span>
          {error}
        </div>
      )}

      <div className="editor-container">
        <div className="panel">
          <div className="panel-header">
            <span>{t('input')}</span>
            {input.trim() && (
              <span
                className={`validation-badge ${validationError ? 'invalid' : 'valid'}`}
                title={validationError || t('validSyntax')}
              >
                {validationError ? validationError : t('validSyntax')}
              </span>
            )}
          </div>
          <textarea
            className="panel-input"
            placeholder='{"name": "示例", "items": [1, 2, 3]}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="panel">
          <div className="panel-header">
            <span>{t('output')}</span>
            {output && <span className="output-mode-badge">{outputMode === 'csv' ? 'CSV' : 'JSON'}</span>}
          </div>
          <pre className="panel-output">
            {output ? (
              outputMode === 'csv' ? (
                <code>{output}</code>
              ) : (
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightJSON(output).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;'),
                  }}
                />
              )
            ) : (
              <span className="placeholder">{t('placeholder')}</span>
            )}
          </pre>
        </div>
      </div>

      <ToolFooter t={t} />
    </div>
  )
}
