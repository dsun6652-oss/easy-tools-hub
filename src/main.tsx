import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { I18nProvider } from './shared/i18n/I18nContext'
import './index.css'
import '@hub/shared/styles/tool-page.css'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Missing #root element')

createRoot(rootEl).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
)
