import { HOLLAND_ORDER, type HollandType } from '../data/hollandTypes'
import type { Question } from '../data/questions'

/** questionId → 1~5 */
export type Answers = Record<number, number>

export type Scores = Record<HollandType, number>

export interface RankedType {
  type: HollandType
  score: number
}

export interface HollandResult {
  scores: Scores
  ranked: RankedType[]
  top3: RankedType[]
  code: string
}

export function calculateScores(questions: readonly Question[], answers: Answers): Scores {
  const scores: Scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
  for (const q of questions) {
    const v = answers[q.id]
    if (typeof v === 'number') scores[q.type] += v
  }
  return scores
}

/**
 * 점수 내림차순 정렬.
 * 동점이면 고정 순서 R → I → A → S → E → C 를 따른다 (항상 같은 입력 → 같은 결과).
 */
export function rankTypes(scores: Scores): RankedType[] {
  return HOLLAND_ORDER.map((type) => ({ type, score: scores[type] })).sort(
    (a, b) => b.score - a.score || HOLLAND_ORDER.indexOf(a.type) - HOLLAND_ORDER.indexOf(b.type),
  )
}

export function computeResult(questions: readonly Question[], answers: Answers): HollandResult {
  const scores = calculateScores(questions, answers)
  const ranked = rankTypes(scores)
  const top3 = ranked.slice(0, 3)
  return { scores, ranked, top3, code: top3.map((t) => t.type).join('') }
}

export function isComplete(questions: readonly Question[], answers: Answers): boolean {
  return questions.every((q) => typeof answers[q.id] === 'number')
}
