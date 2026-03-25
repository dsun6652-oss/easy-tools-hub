import { computeLineDiff } from './lineDiff'

/** trim 后无换行则视为单段，直接走词/字级 diff，避免行级「整段删除+整段新增」 */
export function isEffectivelySingleLine(text) {
  const t = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()
  return t.length === 0 || !/[\n\v\f\u2028\u2029]/.test(t)
}

function isWhitespaceCodePoint(cp) {
  if (cp === 9 || cp === 10 || cp === 11 || cp === 12 || cp === 13 || cp === 32 || cp === 133 || cp === 160) return true
  return /\s/u.test(String.fromCodePoint(cp))
}

/** CJK / 假名 / 韩文音节：按单字 token，便于只标差异字 */
function isEastAsianUnit(cp) {
  return (
    (cp >= 0x3040 && cp <= 0x30ff) ||
    (cp >= 0x3400 && cp <= 0x4dbf) ||
    (cp >= 0x4e00 && cp <= 0x9fff) ||
    (cp >= 0xf900 && cp <= 0xfaff) ||
    (cp >= 0xac00 && cp <= 0xd7a3)
  )
}

function isWordCodePoint(cp) {
  const ch = String.fromCodePoint(cp)
  return /[\p{L}\p{N}]/u.test(ch) || ch === "'" || ch === '-' || ch === '_'
}

/** 英文连续词、中日韩单字、空白、其余单码点各为 token */
export function tokenizeForDiff(s) {
  const tokens = []
  let i = 0
  while (i < s.length) {
    const cp = s.codePointAt(i)
    const w = cp > 0xffff ? 2 : 1

    if (isWhitespaceCodePoint(cp)) {
      let j = i
      while (j < s.length) {
        const cpj = s.codePointAt(j)
        if (!isWhitespaceCodePoint(cpj)) break
        j += cpj > 0xffff ? 2 : 1
      }
      tokens.push(s.slice(i, j))
      i = j
      continue
    }

    if (isEastAsianUnit(cp)) {
      tokens.push(String.fromCodePoint(cp))
      i += w
      continue
    }

    if (isWordCodePoint(cp)) {
      let j = i
      while (j < s.length) {
        const cpj = s.codePointAt(j)
        if (!isWordCodePoint(cpj)) break
        j += cpj > 0xffff ? 2 : 1
      }
      tokens.push(s.slice(i, j))
      i = j
      continue
    }

    tokens.push(String.fromCodePoint(cp))
    i += w
  }
  return tokens
}

function lcsUnifiedParts(tokensA, tokensB) {
  const a = tokensA
  const b = tokensB
  const n = a.length
  const m = b.length
  if (n === 0 && m === 0) return []

  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
    }
  }

  const raw = []
  let i = n
  let j = m
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      raw.unshift({ type: 'eq', text: a[i - 1] })
      i--
      j--
    } else if (i > 0 && (j === 0 || dp[i - 1][j] >= dp[i][j - 1])) {
      raw.unshift({ type: 'del', text: a[i - 1] })
      i--
    } else {
      raw.unshift({ type: 'add', text: b[j - 1] })
      j--
    }
  }

  return mergeAdjacentParts(raw)
}

function mergeAdjacentParts(parts) {
  const out = []
  for (const p of parts) {
    const last = out[out.length - 1]
    if (last && last.type === p.type) {
      last.text += p.text
    } else {
      out.push({ type: p.type, text: p.text })
    }
  }
  return out
}

/** 词/字级统一 diff（供左右栏渲染） */
export function computeWordUnifiedParts(textA, textB) {
  return lcsUnifiedParts(tokenizeForDiff(textA), tokenizeForDiff(textB))
}

function toLineRow(r) {
  if (r.type === 'eq') {
    return {
      mode: 'line',
      leftText: r.left,
      rightText: r.right,
      kind: { left: 'eq', right: 'eq' },
    }
  }
  if (r.type === 'del') {
    return {
      mode: 'line',
      leftText: r.left,
      rightText: '',
      kind: { left: 'del', right: 'pad' },
    }
  }
  return {
    mode: 'line',
    leftText: '',
    rightText: r.right,
    kind: { left: 'pad', right: 'add' },
  }
}

/**
 * 单段（trim 后无换行）直接全文词/字级 diff。
 * 多行则先行对齐，再对「删一行+增一行」且各自为单段的内容做词/字级合并。
 */
export function buildUiRows(textA, textB) {
  if (isEffectivelySingleLine(textA) && isEffectivelySingleLine(textB)) {
    return [{ mode: 'word', unified: computeWordUnifiedParts(textA, textB) }]
  }

  const raw = computeLineDiff(textA, textB)
  const out = []
  let i = 0
  while (i < raw.length) {
    const cur = raw[i]
    const next = raw[i + 1]
    const canMerge =
      cur.type === 'del' &&
      next?.type === 'add' &&
      isEffectivelySingleLine(cur.left) &&
      isEffectivelySingleLine(next.right)
    if (canMerge) {
      out.push({
        mode: 'word',
        unified: computeWordUnifiedParts(cur.left, next.right),
      })
      i += 2
      continue
    }
    out.push(toLineRow(cur))
    i += 1
  }
  return out
}
