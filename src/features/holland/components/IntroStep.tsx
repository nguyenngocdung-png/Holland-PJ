import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import { HOLLAND_ORDER, HOLLAND_TYPES } from '../data/hollandTypes'
import { QUESTIONS } from '../data/questions'
import { UI, type Lang } from '../i18n'

interface IntroStepProps {
  lang: Lang
  onStart: () => void
}

/** 결과에서 확인할 수 있는 것 (추천 전공 · 관련 직업 · 대학 정보) */
const FEATURE_ICONS = ['🎯', '💼', '🏫']

const BRAND = 'DAY BY KOREA'

export default function IntroStep({ lang, onStart }: IntroStepProps) {
  const t = UI[lang]
  // 안내 문장 안의 브랜드명만 굵게
  const [aboutBefore, aboutAfter] = t.about('\u0000').split('\u0000')

  return (
    <>
      <Card className="intro">
        <p className="intro__badge">Holland Test · RIASEC</p>
        <h1 className="intro__title">{t.introTitle}</h1>
        <p className="intro__value">{t.introValue}</p>
        <p className="intro__desc">{t.introDesc}</p>

        <ul className="intro__features">
          {t.introFeatures.map((label, i) => (
            <li key={label}>
              <span className="intro__feature-icon" aria-hidden="true">
                {FEATURE_ICONS[i]}
              </span>
              {label}
            </li>
          ))}
        </ul>

        <Button onClick={onStart} block className="btn--lg intro__cta">
          {t.start}
          <span className="intro__cta-arrow" aria-hidden="true">
            →
          </span>
        </Button>

        <ul className="intro__meta">
          {t.meta(QUESTIONS.length).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <ul className="intro__chips" aria-label={t.typesAria}>
          {HOLLAND_ORDER.map((type) => (
            <li key={type} className="type-chip" style={{ ['--type-color' as string]: HOLLAND_TYPES[type].color }}>
              <b>{type}</b> {HOLLAND_TYPES[type].shortName[lang]}
            </li>
          ))}
        </ul>
      </Card>

      {/* 검사 안내: 카드 아래 작은 각주 */}
      <aside className="intro-about">
        <p className="intro-about__title">
          <span className="intro-about__icon" aria-hidden="true">
            i
          </span>
          {t.aboutTitle}
        </p>
        <p className="intro-about__text">
          {aboutBefore}
          <b>{BRAND}</b>
          {aboutAfter}
        </p>
      </aside>
    </>
  )
}
