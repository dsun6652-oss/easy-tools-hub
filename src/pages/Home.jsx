import { Link } from 'react-router-dom'
import { LangSwitch } from '@hub/shared/components/LangSwitch'
import { useSiteLocales } from '@hub/shared/i18n/siteLocales'
import { toolRoutes } from '../toolsRegistry'
import './Home.css'

export default function Home() {
  const site = useSiteLocales()

  return (
    <div className="home">
      <header className="home-header">
        <div className="home-header-bar">
          <div className="home-header-text">
            <h1>{site.homeTitle}</h1>
            <p className="home-lead">{site.homeLead}</p>
          </div>
          <LangSwitch className="home-lang-switch" />
        </div>
      </header>

      <ul className="tool-grid">
        {toolRoutes.map(({ path }) => {
          const tool = site.tools[path]
          if (!tool) return null
          return (
            <li key={path}>
              <Link className="tool-card" to={path}>
                <span className="tool-card-title">{tool.title}</span>
                <span className="tool-card-desc">{tool.description}</span>
                <span className="tool-card-cta">{site.cardCta}</span>
              </Link>
            </li>
          )
        })}
      </ul>

      <footer className="home-footer">
        <span>{site.homeFooter}</span>
      </footer>
    </div>
  )
}
