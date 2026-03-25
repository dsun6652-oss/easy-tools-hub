import { useState, useCallback, useEffect, useRef } from 'react'

/** 写入剪贴板并在约 2s 内显示「已复制」反馈；失败时调用 onError */
export function useCopyWithFeedback(onError) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)

  const copy = useCallback(
    async (text) => {
      if (!text) return
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = window.setTimeout(() => setCopied(false), 2000)
      } catch {
        onError?.()
      }
    },
    [onError],
  )

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )

  return { copied, copy }
}
