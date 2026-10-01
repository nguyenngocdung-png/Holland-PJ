import type { CSSProperties } from 'react'
import { HOLLAND_TYPES } from '../data/hollandTypes'
import { UI, type Lang } from '../i18n'
import { JOBS_SHOWN, type JobMatch } from '../lib/jobMatch'

interface JobListProps {
  lang: Lang
  /** 사용자 Holland Code (예: ACR) */
  code: string
  /** 사용자 성향과 연결성이 높은 순으로 정렬된 관련 직업 */
  jobs: JobMatch[]
}

const colorVar = (color: string) => ({ ['--type-color' as string]: color }) as CSSProperties

export default function JobList({ lang, code, jobs }: JobListProps) {
  const t = UI[lang]

  return (
    <div className="jobs">
      <p className="jobs__title">{t.jobsTitle}</p>
      {jobs.length === 0 ? (
        <p className="jobs__empty">{t.jobsEmpty}</p>
      ) : (
        <ul className="jobs__list">
          {jobs.slice(0, JOBS_SHOWN).map(({ job, jobTypes, sharedTypes }) => (
            <li key={job.jobName.ko} className="jobs__card">
              <span className="jobs__head">
                <span className="jobs__name">{job.jobName[lang]}</span>
                <span className="jobs__types" aria-label={`${t.jobTypesLabel}: ${jobTypes.join(' · ')}`}>
                  {jobTypes.map((type) => (
                    <span
                      key={type}
                      className={`jobs__type${sharedTypes.includes(type) ? ' is-shared' : ''}`}
                      style={colorVar(HOLLAND_TYPES[type].color)}
                    >
                      {type}
                    </span>
                  ))}
                </span>
              </span>
              <span className="jobs__link">
                {sharedTypes.length > 0 ? t.jobShared(code, sharedTypes.join(' · ')) : t.jobNoShared(code)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
