export function ToolErrorBanner({ message }) {
  if (!message) return null
  return (
    <div className="error-banner" role="alert">
      <span className="error-icon" aria-hidden>
        !
      </span>
      {message}
    </div>
  )
}
