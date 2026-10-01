import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import { HOLLAND_ORDER, HOLLAND_TYPES } from '../data/hollandTypes'
import { QUESTIONS } from '../data/questions'
import { UI, type Lang } from '../i18n'

interface IntroStepProps {
  lang: Lang
  onStart: () => void
}

export default function IntroStep({ lang, onStart }: IntroStepProps) {
  const t = UI[lang]
  return (
    <Card className="intro">
      <p className="eyebrow">Holland Test · RIASEC</p>
      <h1 className="intro__title">{t.introTitle}</h1>
      <p className="intro__desc">{t.introDesc}</p>

      <ul className="intro__chips" aria-label={t.typesAria}>
        {HOLLAND_ORDER.map((type) => (
          <li key={type} className="type-chip" style={{ ['--type-color' as string]: HOLLAND_TYPES[type].color }}>
            <b>{type}</b> {HOLLAND_TYPES[type].shortName[lang]}
          </li>
        ))}
      </ul>

      <ul className="intro__meta">
        <li>{t.metaCount(QUESTIONS.length)}</li>
      </ul>

      <Button onClick={onStart} block className="btn--lg">
        {t.start}
      </Button>
    </Card>
  )
}
