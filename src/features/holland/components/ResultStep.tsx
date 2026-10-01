import { useMemo, useState, type CSSProperties } from 'react'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import ProgressBar from '../../../components/ui/ProgressBar'
import { HOLLAND_TYPES } from '../data/hollandTypes'
import { RELATED_PROGRAMS } from '../data/relatedPrograms'
import { TRAITS } from '../data/traits'
import { UI, type Lang } from '../i18n'
import { JOBS_SHOWN, jobsForMajor } from '../lib/jobMatch'
import { recommendMajors } from '../lib/recommend'
import { findUniversities } from '../lib/universities'
import JobList from './JobList'
import UniversityList from './UniversityList'
import type { HollandResult } from '../lib/scoring'

interface ResultStepProps {
  lang: Lang
  result: HollandResult
  onRestart: () => void
}

const MIN = 4
const MAX = 20

const colorVar = (color: string) => ({ ['--type-color' as string]: color }) as CSSProperties

export default function ResultStep({ lang, result, onRestart }: ResultStepProps) {
  const t = UI[lang]
  const { top3, ranked, code, scores } = result
  const recommendations = useMemo(
    () =>
      recommendMajors(top3).map((r) => ({
        ...r,
        universities: findUniversities(r.major.programs, RELATED_PROGRAMS[r.major.name.ko]),
        jobs: jobsForMajor(
          r.major.name.ko,
          scores,
          top3.map((x) => x.type),
        ),
      })),
    [top3, scores],
  )
  // 추천 직업 / 개설 대학 목록은 한 번에 하나만 펼친다
  const [open, setOpen] = useState<{ major: string; panel: 'jobs' | 'unis' } | null>(null)
  const [first, second, third] = top3.map((r) => TRAITS[r.type][lang])

  return (
    <div className="result">
      {/* 1. Holland Code 요약 */}
      <Card className="result__hero">
        <p className="eyebrow">{t.codeEyebrow}</p>
        <div className="result__code" aria-label={`Holland Code ${code}`}>
          {top3.map((r) => (
            <span key={r.type} style={colorVar(HOLLAND_TYPES[r.type].color)}>
              {r.type}
            </span>
          ))}
        </div>
        <ul className="result__types">
          {top3.map((r) => {
            const info = HOLLAND_TYPES[r.type]
            return (
              <li key={r.type} style={colorVar(info.color)}>
                <b>{info.code}</b>
                <span className="result__type-name">{info.name[lang]}</span>
                <span className="result__type-score">
                  <b>{r.score}</b>/{MAX}
                </span>
              </li>
            )
          })}
        </ul>
      </Card>

      {/* 2. 나의 Holland 특징: Top 3 조합 설명 */}
      <Card className="profile">
        <h2 className="section-title section-title--sm">{t.profileTitle}</h2>
        <p className="profile__text">{t.profile(first.lead, second.middle, third.tail)}</p>
        <ul className="keywords profile__keywords">
          {top3.flatMap((r) =>
            HOLLAND_TYPES[r.type].keywords[lang].map((k) => (
              <li key={`${r.type}-${k}`} style={colorVar(HOLLAND_TYPES[r.type].color)}>
                <b>{r.type}</b> {k}
              </li>
            )),
          )}
        </ul>
      </Card>

      {/* 3. 통합 추천 전공 + 추천 이유 */}
      <Card className="combined">
        <h2 className="combined__title">{t.combinedTitle(code)}</h2>
        <p className="combined__desc">{t.combinedDesc(code)}</p>
        <ol className="combined__list">
          {recommendations.map(({ major, fits, universities, jobs }) => (
            <li key={major.name.ko} className="combined__item">
              <div className="combined__head">
                <span className="combined__name">{major.name[lang]}</span>
                <span className="combined__tags" aria-label={fits.map((f) => f.type).join(' · ')}>
                  {fits.map((f) => (
                    <span key={f.type} style={colorVar(HOLLAND_TYPES[f.type].color)}>
                      {f.type}
                    </span>
                  ))}
                </span>
              </div>
              <p className="combined__why">
                {t.majorWhy(fits.map((f) => ({ text: f.reason[lang], type: f.type })))}
              </p>
              {/* 추천 이유: 유형별 근거를 바로 노출 */}
              <div className="combined__details">
                <p className="combined__details-title">{t.whyToggle}</p>
                <ul>
                  {fits.map((f) => (
                    <li key={f.type} style={colorVar(HOLLAND_TYPES[f.type].color)}>
                      <b>{f.type}</b>
                      <span>
                        <span className="combined__type-name">{HOLLAND_TYPES[f.type].shortName[lang]}</span>
                        {f.reason[lang]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* 추천 직업 · 개설 대학은 버튼으로 펼침 */}
              <div className="combined__actions">
                {(['jobs', 'unis'] as const).map((panel) => {
                  const isOpen = open?.major === major.name.ko && open.panel === panel
                  return (
                    <button
                      key={panel}
                      type="button"
                      className={`combined__unis-btn${isOpen ? ' is-open' : ''}`}
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : { major: major.name.ko, panel })}
                    >
                      {panel === 'jobs' ? t.jobsToggle(Math.min(jobs.length, JOBS_SHOWN)) : t.uniToggle(universities.length)}
                    </button>
                  )
                })}
              </div>
              {open?.major === major.name.ko && open.panel === 'jobs' && (
                <JobList lang={lang} code={code} jobs={jobs} />
              )}
              {open?.major === major.name.ko && open.panel === 'unis' && (
                <UniversityList key={major.name.ko} lang={lang} major={major} universities={universities} />
              )}
            </li>
          ))}
        </ol>
        <p className="combined__note">
          {t.jobsDesc} {t.jobsNote}
        </p>
      </Card>

      {/* 4. 유형별 특징 + 유형별 추천 전공 (기존) */}
      <h2 className="section-title">{t.perTypeTitle}</h2>

      <div className="type-list">
        {top3.map((r, i) => {
          const info = HOLLAND_TYPES[r.type]
          return (
            <Card key={r.type} className="type-card" style={colorVar(info.color)}>
              <div className="type-card__head">
                <span className="type-card__badge">{info.code}</span>
                <div className="type-card__title">
                  <span className="type-card__rank">{t.rank(i + 1)}</span>
                  <h3>
                    {info.code} — {info.en}
                  </h3>
                  <p>{info.name[lang]}</p>
                </div>
                <span className="type-card__score">
                  <b>{r.score}</b>/{MAX}
                </span>
              </div>

              <ul className="keywords">
                {info.keywords[lang].map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>

              <p className="type-card__desc">{info.desc[lang]}</p>

              <div className="majors">
                <p className="majors__label">{t.majorsLabel}</p>
                <ul>
                  {info.majors.map((m) => (
                    <li key={m.ko}>{m[lang]}</li>
                  ))}
                </ul>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="scores">
        <h2 className="section-title section-title--sm">{t.scoresTitle}</h2>
        <ul className="scores__list">
          {ranked.map((r) => {
            const info = HOLLAND_TYPES[r.type]
            const isTop = top3.some((x) => x.type === r.type)
            return (
              <li key={r.type} className={isTop ? 'is-top' : ''}>
                <span className="scores__name">
                  <b>{r.type}</b> {info.shortName[lang]}
                </span>
                <ProgressBar
                  value={((r.score - MIN) / (MAX - MIN)) * 100}
                  color={isTop ? info.color : undefined}
                  label={t.scoreLabel(info.en, r.score)}
                />
                <span className="scores__value">{r.score}</span>
              </li>
            )
          })}
        </ul>
        <p className="note">{t.note}</p>
      </Card>

      <Button variant="secondary" block onClick={onRestart} className="btn--lg">
        {t.restart}
      </Button>
    </div>
  )
}
