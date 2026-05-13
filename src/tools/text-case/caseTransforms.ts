/** 英文词首字母大写（连续拉丁字母段）；中文等原样保留 */
export function toTitleCase(text: string) {
  return text.replace(/[a-zA-Z]+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
}

/** 空格 / 连字符 / 下划线 分词 → camelCase，如 hello world → helloWorld */
export function toCamelCase(text: string) {
  const parts = text.trim().split(/[\s\-_]+/).filter(Boolean)
  if (parts.length === 0) return ''
  const head = parts[0]!.toLowerCase()
  const tail = parts
    .slice(1)
    .map((p) => {
      const core = p.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '')
      return core ? core.charAt(0).toUpperCase() + core.slice(1).toLowerCase() : ''
    })
    .join('')
  return head + tail
}

export const caseModes = {
  upper: (s: string) => s.toUpperCase(),
  lower: (s: string) => s.toLowerCase(),
  title: toTitleCase,
  camel: toCamelCase,
} as const

export type CaseMode = keyof typeof caseModes
