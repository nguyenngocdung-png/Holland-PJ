import { HOLLAND_ORDER, type HollandType } from '../data/hollandTypes'
import { JOBS, type Job } from '../data/jobs'
import type { Scores } from './scoring'
import { normalizeProgramName } from './universities'

/** 사용자 유형 점수 범위 (유형당 4문항 × 1~5점) */
const USER_MIN = 4
const USER_MAX = 20
/** 직업 Holland 점수 최댓값 (1~5) */
const JOB_MAX = 5
/** 전공마다 보여줄 최대 직업 수 */
export const JOBS_SHOWN = 5
/** 직업의 "관련 Holland 유형"으로 보여줄 최소 점수 */
const RELATED_LEVEL = 4

export interface JobMatch {
  job: Job
  /** 0~100. 직업 정렬에만 쓰는 내부 값이며 적합도를 뜻하지 않는다 (UI에 표시하지 않음) */
  matchScore: number
  /** 직업 profile에서 상대적으로 높은 유형 (최대 3개, 높은 순) */
  jobTypes: HollandType[]
  /** jobTypes 중 사용자 Top 3에도 있는 유형 (사용자 순위 순) */
  sharedTypes: HollandType[]
}

/** 사용자 점수(4~20)와 직업 점수(1~5)를 각각 0~1로 맞춘 뒤, 6유형 평균 차이가 작을수록 높은 값 */
export function matchingScore(userScores: Scores, job: Job): number {
  const totalDiff = HOLLAND_ORDER.reduce((sum, type) => {
    const user = (userScores[type] - USER_MIN) / (USER_MAX - USER_MIN)
    const target = job.holland[type] / JOB_MAX
    return sum + Math.abs(user - target)
  }, 0)
  return Math.round((1 - totalDiff / HOLLAND_ORDER.length) * 100)
}

/** 직업 profile에서 4점 이상인 유형을 높은 순으로 최대 3개 (없으면 가장 높은 1개) */
export function jobHollandTypes(job: Job): HollandType[] {
  const sorted = [...HOLLAND_ORDER].sort((a, b) => job.holland[b] - job.holland[a])
  const high = sorted.filter((t) => job.holland[t] >= RELATED_LEVEL).slice(0, 3)
  return high.length > 0 ? high : sorted.slice(0, 1)
}

/**
 * 선택한 전공의 관련 직업.
 * 1) 전공과 관련된 직업만 남긴 뒤 (relatedMajors에 같은 이름의 전공이 있는 직업)
 * 2) 사용자 Holland 점수와 연결성이 높은 순으로 정렬 (동점이면 데이터 순서)
 */
export function jobsForMajor(majorName: string, userScores: Scores, userTop3: readonly HollandType[]): JobMatch[] {
  const target = normalizeProgramName(majorName)
  return JOBS.filter((job) => job.relatedMajors.some((m) => normalizeProgramName(m) === target))
    .map((job) => {
      const jobTypes = jobHollandTypes(job)
      return {
        job,
        matchScore: matchingScore(userScores, job),
        jobTypes,
        sharedTypes: userTop3.filter((t) => jobTypes.includes(t)),
      }
    })
    .sort((a, b) => b.matchScore - a.matchScore)
}
