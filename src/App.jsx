import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import ToolShell from './layouts/ToolShell'
import Home from './pages/Home'

const rawBase = import.meta.env.BASE_URL.replace(/\/$/, '')
const isChromeExtension = import.meta.env.VITE_CHROME_EXTENSION === 'true'
const Router = isChromeExtension ? HashRouter : BrowserRouter
const basename = isChromeExtension ? undefined : rawBase || undefined

export default function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:toolPath" element={<ToolShell />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
