import { useCallback, useEffect, useMemo, useState } from 'react'
import logoUrl from '../../assets/daybykorea-logo.png'
import IntroStep from './components/IntroStep'
import LanguageToggle from './components/LanguageToggle'
import ResultStep from './components/ResultStep'
import TestStep from './components/TestStep'
import { QUESTIONS } from './data/questions'
import { UI, type Lang } from './i18n'
import { computeResult, isComplete, type Answers } from './lib/scoring'
import './holland.css'

type Step = 'intro' | 'test' | 'result'

/**
 * Holland Test
 * - 모든 상태는 메모리(React state)에서만 관리 → 새로고침 시 초기화
 * - 서버 전송 / localStorage / URL 파라미터 사용 없음
 * - 언어(KO/VI)는 언제든 전환 가능하며, 전환해도 응답은 유지된다
 */
export default function MiniHollandTest() {
  const [lang, setLang] = useState<Lang>('ko')
  const [step, setStep] = useState<Step>('intro')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  // 지금까지 도달한 가장 뒤 문항 → 그 앞의 미응답 문항은 '건너뜀'으로 표시
  const [furthest, setFurthest] = useState(0)
  if (index > furthest) setFurthest(index)

  const result = useMemo(() => (step === 'result' ? computeResult(QUESTIONS, answers) : null), [step, answers])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [step, index])

  const start = () => {
    setAnswers({})
    setIndex(0)
    setFurthest(0)
    setStep('test')
  }

  const answer = useCallback((id: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }, [])

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, QUESTIONS.length - 1)), [])
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), [])

  // 로고 클릭: 처음 화면으로. 응답이 있으면 (테스트 중이거나 결과 화면) 사라진다는 것을 확인받는다
  const goHome = () => {
    if (step === 'intro') return
    if (Object.keys(answers).length === 0 || window.confirm(UI[lang].homeConfirm)) setStep('intro')
  }

  const submit = () => {
    if (isComplete(QUESTIONS, answers)) setStep('result')
  }

  return (
    <main className="holland" lang={lang}>
      <div className="holland__container">
        <div className="holland__topbar">
          <button type="button" className="holland__logo-btn" onClick={goHome} aria-label={UI[lang].logoHome}>
            <img className="holland__logo" src={logoUrl} alt="DAY BY KOREA" width={1840} height={202} />
          </button>
          <LanguageToggle lang={lang} onChange={setLang} />
        </div>
        {step === 'intro' && <IntroStep lang={lang} onStart={start} />}
        {step === 'test' && (
          <TestStep
            lang={lang}
            index={index}
            furthest={furthest}
            answers={answers}
            onAnswer={answer}
            onPrev={prev}
            onNext={next}
            onSubmit={submit}
            onJump={setIndex}
            onHome={() => setStep('intro')}
          />
        )}
        {step === 'result' && result && <ResultStep lang={lang} result={result} onRestart={() => setStep('intro')} />}
      </div>
    </main>
  )
}
