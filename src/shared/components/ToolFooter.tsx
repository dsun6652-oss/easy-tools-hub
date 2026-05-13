type ToolFooterProps = { t: (key: string) => string }

export function ToolFooter({ t }: ToolFooterProps) {
  return (
    <footer className="eth-tool-footer">
      <span>{t('footerDesc')}</span>
      <p className="eth-tool-footer__sponsor">
        {t('supportAuthor')}
        <a
          href="https://afdian.com/a/sundd1898"
          target="_blank"
          rel="noopener noreferrer"
          className="eth-tool-footer__link"
        >
          {t('supportLink')}
        </a>
      </p>
    </footer>
  )
}
