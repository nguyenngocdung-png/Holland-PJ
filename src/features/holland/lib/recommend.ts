import { MAJOR_CATALOG, type MajorEntry, type MajorFit } from '../data/majors'
import type { RankedType } from './scoring'

/** 전공의 관련 유형 목록 안 위치별 가중치 (첫 번째가 가장 중심 유형) */
const POSITION_WEIGHT = [1, 0.6, 0.3] as const

export interface MajorRecommendation {
  major: MajorEntry
  /**
   * 실제 추천 근거로 쓰인 유형 = 이 전공의 관련 유형 ∩ 사용자 Top 3.
   * 사용자 순위 순서로 정렬 (예: ACR 결과면 A → C → R)
   */
  fits: MajorFit[]
  score: number
}

/**
 * Top 3 Holland Code 조합 기반 통합 전공 추천.
 *
 * 1) Top 3 중 몇 개 유형을 함께 활용하는 전공인지(fits.length)를 먼저 본다
 *    → ACR이면 A·C·R을 모두 쓰는 전공이 A·R만 쓰는 전공보다 항상 먼저 나온다
 * 2) 같은 개수끼리는 Σ(사용자 유형 점수 × 전공 내 위치 가중치)로 정렬
 *    → 사용자 점수가 높은 유형이 그 전공의 중심일수록 위로 올라간다
 * 3) 동점이면 MAJOR_CATALOG 순서 유지 → 같은 입력이면 항상 같은 결과
 */
export function recommendMajors(top3: readonly RankedType[], limit = 6): MajorRecommendation[] {
  const userScore = new Map(top3.map((t) => [t.type, t.score]))
  const userRank = new Map(top3.map((t, i) => [t.type, i]))

  return MAJOR_CATALOG.map((major) => {
    const fits = major.fit
      .filter((f) => userRank.has(f.type))
      .sort((a, b) => (userRank.get(a.type) ?? 0) - (userRank.get(b.type) ?? 0))
    const score = major.fit.reduce((sum, f, i) => sum + (userScore.get(f.type) ?? 0) * POSITION_WEIGHT[i], 0)
    return { major, fits, score }
  })
    .filter((r) => r.fits.length > 0)
    .sort((a, b) => b.fits.length - a.fits.length || b.score - a.score) // 안정 정렬
    .slice(0, limit)
}
