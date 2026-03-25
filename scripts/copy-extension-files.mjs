import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const out = path.join(root, 'dist-extension')
const ext = path.join(root, 'extension')

for (const file of ['manifest.json', 'background.js']) {
  fs.copyFileSync(path.join(ext, file), path.join(out, file))
}

console.log('Copied extension/manifest.json + background.js → dist-extension/')
