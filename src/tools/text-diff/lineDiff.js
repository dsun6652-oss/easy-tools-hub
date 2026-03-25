/** 按行 LCS 差异：返回 { type: 'eq'|'del'|'add', left, right }[] */

export function computeLineDiff(textA, textB) {
  const a = textA.split('\n')
  const b = textB.split('\n')
  const n = a.length
  const m = b.length
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
      raw.unshift({ type: 'eq', left: a[i - 1], right: b[j - 1] })
      i--
      j--
    } else if (i > 0 && (j === 0 || dp[i - 1][j] >= dp[i][j - 1])) {
      raw.unshift({ type: 'del', left: a[i - 1], right: '' })
      i--
    } else {
      raw.unshift({ type: 'add', left: '', right: b[j - 1] })
      j--
    }
  }
  return raw
}
