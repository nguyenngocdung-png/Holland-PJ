import { useEffect, useRef } from 'react'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import ProgressBar from '../../../components/ui/ProgressBar'
import { QUESTIONS, SCALE } from '../data/questions'
import { UI, type Lang } from '../i18n'
import type { Answers } from '../lib/scoring'
import QuestionNav from './QuestionNav'

interface TestStepProps {
  lang: Lang
  index: number
  furthest: number
  answers: Answers
  onAnswer: (questionId: number, value: number) => void
  onPrev: () => void
  onNext: () => void
  onSubmit: () => void
  onJump: (index: number) => void
  onHome: () => void
}

const AUTO_ADVANCE_MS = 250

export default function TestStep({ lang, index, furthest, answers, onAnswer, onPrev, onNext, onSubmit, onJump, onHome }: TestStepProps) {
  const t = UI[lang]
  const total = QUESTIONS.length
  const question = QUESTIONS[index]
  const selected = answers[question.id]
  const answeredCount = QUESTIONS.filter((q) => typeof answers[q.id] === 'number').length
  const isFirst = index === 0
  const isLast = index === total - 1
  const allAnswered = answeredCount === total
  // 진행률 = 현재 문항 위치 기준 (1/24 → 4%)
  const percent = Math.round(((index + 1) / total) * 100)

  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [index])

  const handleSelect = (value: number) => {
    onAnswer(question.id, value)
    window.clearTimeout(timer.current)
    if (!isLast) timer.current = window.setTimeout(onNext, AUTO_ADVANCE_MS)
  }

  const firstUnanswered = QUESTIONS.findIndex((q) => typeof answers[q.id] !== 'number')

  // 응답이 하나라도 있으면 사라진다는 것을 확인받고 처음 화면으로
  const goHome = () => {
    if (answeredCount === 0 || window.confirm(t.homeConfirm)) onHome()
  }

  return (
    <div className="test">
      <button type="button" className="test__home" onClick={goHome}>
        {t.home}
      </button>
      <div className="test__progress">
        <div className="test__progress-row">
          <span className="test__count">
            <b>{index + 1}</b> / {total}
          </span>
          <span className="test__percent">{t.progress(percent)}</span>
        </div>
        <ProgressBar value={percent} label={t.progress(percent)} />
      </div>

      <Card className="question" key={question.id}>
        <p className="question__no">Q{question.id}</p>
        <h2 className="question__text">{question.text[lang]}</h2>

        <fieldset className="scale">
          <legend className="sr-only">{t.scaleLegend(question.id)}</legend>
          {SCALE.map((opt) => {
            const checked = selected === opt.value
            return (
              <label key={opt.value} className={`scale__opt${checked ? ' is-checked' : ''}`}>
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  value={opt.value}
                  checked={checked}
                  onChange={() => handleSelect(opt.value)}
                  // 이미 선택된 값을 다시 눌러도 다음으로 이동
                  onClick={() => checked && handleSelect(opt.value)}
                />
                <span className="scale__num">{opt.value}</span>
                <span className="scale__text">{opt.label[lang]}</span>
              </label>
            )
          })}
        </fieldset>
      </Card>

      <div className="test__nav">
        <Button variant="secondary" onClick={onPrev} disabled={isFirst}>
          {t.prev}
        </Button>
        {isLast ? (
          <Button onClick={onSubmit} disabled={!allAnswered}>
            {t.seeResult}
          </Button>
        ) : (
          <Button onClick={onNext}>
            {t.next}
          </Button>
        )}
      </div>

      {isLast && !allAnswered && firstUnanswered >= 0 && (
        <div className="test__hint" role="status">
          <p>{t.unanswered(answeredCount, total)}</p>
          <Button variant="ghost" onClick={() => onJump(firstUnanswered)}>
            {t.goToUnanswered(QUESTIONS[firstUnanswered].id)}
          </Button>
        </div>
      )}

      <QuestionNav lang={lang} index={index} furthest={furthest} answers={answers} onJump={onJump} />
    </div>
  )
}
