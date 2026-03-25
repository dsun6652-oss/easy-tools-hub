const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const DIGIT = '0123456789'
const SYMBOL = '!@#$%^&*-_+=.,?'

function pickIndex(max) {
  const buf = new Uint32Array(1)
  globalThis.crypto.getRandomValues(buf)
  return buf[0] % max
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = pickIndex(i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * @param {number} length
 * @param {{ upper: boolean, lower: boolean, digit: boolean, symbol: boolean }} flags
 * @returns {{ ok: true, password: string } | { ok: false, reason: 'noCharset' | 'length' }}
 */
export function generatePassword(length, { upper, lower, digit, symbol }) {
  const categories = []
  if (lower) categories.push(LOWER)
  if (upper) categories.push(UPPER)
  if (digit) categories.push(DIGIT)
  if (symbol) categories.push(SYMBOL)

  if (categories.length === 0) {
    return { ok: false, reason: 'noCharset' }
  }

  const len = Math.floor(Number(length))
  if (!Number.isFinite(len) || len < 4 || len > 128) {
    return { ok: false, reason: 'length' }
  }

  const all = categories.join('')
  const chars = []

  if (len >= categories.length) {
    for (const cat of categories) {
      chars.push(cat[pickIndex(cat.length)])
    }
    while (chars.length < len) {
      chars.push(all[pickIndex(all.length)])
    }
  } else {
    for (let i = 0; i < len; i++) {
      chars.push(all[pickIndex(all.length)])
    }
  }

  return { ok: true, password: shuffle(chars).join('') }
}
