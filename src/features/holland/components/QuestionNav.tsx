import { QUESTIONS } from '../data/questions'
import { UI, type Lang } from '../i18n'
import type { Answers } from '../lib/scoring'

interface QuestionNavProps {
  lang: Lang
  index: number
  /** 지금까지 도달한 가장 뒤 문항 index. 이 범위 안의 미응답 문항 = 건너뛴 문항 */
  furthest: number
  answers: Answers
  onJump: (index: number) => void
}

export default function QuestionNav({ lang, index, furthest, answers, onJump }: QuestionNavProps) {
  const t = UI[lang]
  return (
    <nav className="qnav" aria-label={t.navTitle}>
      <ol className="qnav__grid">
        {QUESTIONS.map((q, i) => {
          const answered = typeof answers[q.id] === 'number'
          const skipped = !answered && i <= furthest && i !== index
          const state = answered ? t.navAnswered : skipped ? t.navSkipped : t.navUnseen
          const cls = ['qnav__btn', answered && 'is-answered', skipped && 'is-skipped', i === index && 'is-current']
            .filter(Boolean)
            .join(' ')
          return (
            <li key={q.id}>
              <button
                type="button"
                className={cls}
                aria-label={`Q${q.id} · ${state}`}
                aria-current={i === index ? 'step' : undefined}
                onClick={() => onJump(i)}
              >
                {q.id}
              </button>
            </li>
          )
        })}
      </ol>
      <ul className="qnav__legend" aria-hidden="true">
        <li className="is-answered">{t.navAnswered}</li>
        <li className="is-skipped">{t.navSkipped}</li>
        <li className="is-current">{t.navCurrent}</li>
      </ul>
    </nav>
  )
}
