import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** 扩展包：相对路径资源 + 独立输出目录，不拷贝站点用 public（robots/sitemap） */
export default defineConfig({
  mode: 'chrome',
  base: './',
  publicDir: false,
  build: {
    outDir: 'dist-extension',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@hub': path.resolve(__dirname, 'src'),
    },
  },
})
