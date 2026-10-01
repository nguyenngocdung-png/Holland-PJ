import { LANGS, UI, type Lang } from '../i18n'

interface LanguageToggleProps {
  lang: Lang
  onChange: (lang: Lang) => void
}

export default function LanguageToggle({ lang, onChange }: LanguageToggleProps) {
  return (
    <div className="lang-toggle" role="group" aria-label={UI[lang].langGroup}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          className={`lang-toggle__btn${l.code === lang ? ' is-active' : ''}`}
          aria-pressed={l.code === lang}
          onClick={() => onChange(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
