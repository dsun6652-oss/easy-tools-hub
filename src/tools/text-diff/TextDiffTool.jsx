import { useState, useCallback } from 'react'
import { ToolPageHeader } from '@hub/shared/components/ToolPageHeader'
import { ToolFooter } from '@hub/shared/components/ToolFooter'
import { useToolLocales } from '@hub/shared/i18n/useToolLocales'
import { buildUiRows } from './wordDiff'
import { locales } from './locales'
import './TextDiffTool.css'

function WordLine({ unified, side }) {
  if (unified.length === 0) {
    return (
      <div className="diff-line diff-line--eq" aria-hidden>
        {'\u00a0'}
      </div>
    )
  }
  return (
    <div className="diff-line diff-line--word">
      {unified.map((p, idx) => {
        if (side === 'left' && p.type === 'add') return null
        if (side === 'right' && p.type === 'del') return null
        const cls =
          p.type === 'del' ? 'word-token word-token--del' : p.type === 'add' ? 'word-token word-token--add' : 'word-token'
        return (
          <span key={idx} className={cls}>
            {p.text}
          </span>
        )
      })}
    </div>
  )
}

function DiffPane({ rows, side }) {
  return (
    <pre className="diff-pre" aria-readonly>
      {rows.map((row, i) =>
        row.mode === 'word' ? (
          <WordLine key={i} unified={row.unified} side={side} />
        ) : (
          <div key={i} className={`diff-line diff-line--${row.kind[side]}`}>
            {(side === 'left' ? row.leftText : row.rightText) || '\u00a0'}
          </div>
        ),
      )}
    </pre>
  )
}

export default function TextDiffTool() {
  const { t } = useToolLocales(locales)
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [showDiff, setShowDiff] = useState(false)
  const [displayRows, setDisplayRows] = useState([])

  const runCompare = useCallback(() => {
    setDisplayRows(buildUiRows(left, right))
    setShowDiff(true)
  }, [left, right])

  const backToEdit = useCallback(() => setShowDiff(false), [])

  const clearAll = useCallback(() => {
    setLeft('')
    setRight('')
    setDisplayRows([])
    setShowDiff(false)
  }, [])

  return (
    <div className="eth-tool-page text-diff-tool">
      <ToolPageHeader t={t} />

      <div className="toolbar">
        <div className="toolbar-left">
          <button type="button" onClick={runCompare} className="btn btn-primary">
            {t('compare')}
          </button>
          <button type="button" onClick={backToEdit} className="btn btn-secondary" disabled={!showDiff}>
            {t('edit')}
          </button>
        </div>
        <div className="toolbar-right">
          <button type="button" onClick={clearAll} className="btn btn-ghost">
            {t('clear')}
          </button>
        </div>
      </div>

      {showDiff && (
        <p className="diff-hint" role="status">
          {t('diffHint')}
        </p>
      )}

      <div className="editor-container">
        <div className="panel">
          <div className="panel-header">
            <span>{t('left')}</span>
          </div>
          {!showDiff ? (
            <textarea
              className="panel-input"
              placeholder={t('leftPlaceholder')}
              value={left}
              onChange={(e) => setLeft(e.target.value)}
              spellCheck={false}
            />
          ) : (
            <DiffPane rows={displayRows} side="left" />
          )}
        </div>

        <div className="panel">
          <div className="panel-header">
            <span>{t('right')}</span>
          </div>
          {!showDiff ? (
            <textarea
              className="panel-input"
              placeholder={t('rightPlaceholder')}
              value={right}
              onChange={(e) => setRight(e.target.value)}
              spellCheck={false}
            />
          ) : (
            <DiffPane rows={displayRows} side="right" />
          )}
        </div>
      </div>

      <ToolFooter t={t} />
    </div>
  )
}
