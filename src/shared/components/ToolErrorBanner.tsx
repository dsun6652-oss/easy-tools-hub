type ToolErrorBannerProps = { message?: string }

export function ToolErrorBanner({ message }: ToolErrorBannerProps) {
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
