import { Suspense } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { LangSwitch } from '@hub/shared/components/LangSwitch'
import { useSiteLocales } from '@hub/shared/i18n/siteLocales'
import { toolRoutes } from '../toolsRegistry'
import './ToolShell.css'

function ToolFallback() {
  const site = useSiteLocales()
  return (
    <div className="tool-fallback" aria-busy="true">
      {site.loading}
    </div>
  )
}

export default function ToolShell() {
  const { toolPath } = useParams()
  const site = useSiteLocales()
  const meta = toolRoutes.find((t) => t.path === toolPath)
  if (!meta) {
    return <Navigate to="/" replace />
  }
  const Tool = meta.Component

  return (
    <div className="tool-shell">
      <nav className="tool-shell-nav" aria-label="站点">
        <Link to="/" className="tool-shell-back">
          {site.navBack}
        </Link>
        <LangSwitch className="tool-shell-lang" />
      </nav>
      <Suspense fallback={<ToolFallback />}>
        <Tool />
      </Suspense>
    </div>
  )
}
