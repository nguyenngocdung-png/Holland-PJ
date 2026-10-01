import csv from '../data/universities.csv?raw'
import type { RelatedRule } from '../data/relatedPrograms'

export interface UniversityProgram {
  /** 학과 (모집단위) */
  dept: string
  /** 전공 (없으면 빈 문자열) */
  major: string
  /** 이름이 정확히 같은 전공이 아니라 관련 키워드로 찾은 모집단위 */
  related?: boolean
}

export interface UniversityMatch {
  university: string
  programs: UniversityProgram[]
}

/** 따옴표("...")로 감싼 쉼표 포함 필드를 지원하는 최소 CSV 파서 */
function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"'
        i++
      } else if (ch === '"') quoted = false
      else cell += ch
    } else if (ch === '"') quoted = true
    else if (ch === ',') {
      row.push(cell)
      cell = ''
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else cell += ch
  }
  if (cell || row.length) rows.push([...row, cell])
  return rows
}

/**
 * 전공명 비교용 정규화: 괄호 속 부가 정보와 모집단위 접미사만 떼고 이름 자체는 그대로 비교한다.
 * 예) '경영학과' · '경영학부' · '경영학전공' · '경영학전공 [영어트랙]' → '경영'
 *     '유통마케팅학과' → '유통마케팅' (≠ '마케팅', 다른 이름은 섞이지 않음)
 */
export function normalizeProgramName(name: string): string {
  return name
    .replace(/\(.*?\)|\[.*?\]/g, '')
    .replace(/\s+/g, '')
    .replace(/전공$/, '')
    .replace(/[과부]$/, '')
    .replace(/학$/, '')
}

interface IndexedRow {
  /** CSV 내 순서 (여러 이름을 함께 검색해도 데이터 원래 순서로 보여주기 위함) */
  seq: number
  university: string
  program: UniversityProgram
}

/** 정규화된 전공명 → 해당 행 목록. 대학+학과+전공이 완전히 같은 중복 행은 1회만 */
const INDEX: Map<string, IndexedRow[]> = (() => {
  const index = new Map<string, IndexedRow[]>()
  const seen = new Set<string>()
  parseCsv(csv)
    .slice(1)
    .forEach(([university = '', dept = '', major = ''], seq) => {
      const u = university.trim()
      const d = dept.trim()
      const m = major.trim()
      if (!u || !d) return
      const dupKey = `${u}|${d}|${m}`
      if (seen.has(dupKey)) return
      seen.add(dupKey)
      // 전공이 있으면 전공명, 없으면 학과명이 실제 전공 이름
      const key = normalizeProgramName(m || d)
      const list = index.get(key) ?? []
      list.push({ seq, university: u, program: { dept: d, major: m } })
      index.set(key, list)
    })
  return index
})()

/**
 * 전공에 해당하는 모집단위가 있는 대학 목록.
 * - 이름이 정확히 같은 전공(exactNames)과, 관련 키워드(related)에 걸리는 전공을 함께 찾는다
 * - 관련 키워드로만 찾은 모집단위는 related: true 로 표시한다
 * - 이름이 정확히 같은 전공이 있는 대학을 먼저, 그 안에서는 모집요강 데이터 순서 그대로 (순위·추천 아님)
 */
export function findUniversities(exactNames: readonly string[], related?: RelatedRule): UniversityMatch[] {
  const exactKeys = new Set(exactNames.map(normalizeProgramName))
  const isRelated = (key: string) =>
    !!related &&
    related.include.some((w) => key.includes(w)) &&
    !(related.exclude ?? []).some((w) => key.includes(w))

  const rows: (IndexedRow & { related: boolean })[] = []
  for (const [key, list] of INDEX) {
    const exact = exactKeys.has(key)
    if (exact || isRelated(key)) for (const r of list) rows.push({ ...r, related: !exact })
  }
  rows.sort((a, b) => a.seq - b.seq)

  const byUniversity = new Map<string, UniversityProgram[]>()
  for (const r of rows) {
    const list = byUniversity.get(r.university) ?? []
    list.push({ ...r.program, related: r.related })
    byUniversity.set(r.university, list)
  }
  const result = [...byUniversity].map(([university, programs]) => ({
    university,
    // 대학 안에서도 같은 이름 전공을 먼저
    programs: [...programs.filter((p) => !p.related), ...programs.filter((p) => p.related)],
  }))
  const hasExact = (u: UniversityMatch) => u.programs.some((p) => !p.related)
  return [...result.filter(hasExact), ...result.filter((u) => !hasExact(u))]
}
