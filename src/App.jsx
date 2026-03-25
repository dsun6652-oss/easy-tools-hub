import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ToolShell from './layouts/ToolShell'
import Home from './pages/Home'

const rawBase = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={rawBase || undefined}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:toolPath" element={<ToolShell />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
