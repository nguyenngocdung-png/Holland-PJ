import { useState } from 'react'
import Button from '../../../components/ui/Button'
import type { MajorEntry } from '../data/majors'
import { RELATED_PROGRAMS } from '../data/relatedPrograms'
import { UI, type Lang } from '../i18n'
import type { UniversityMatch } from '../lib/universities'

interface UniversityListProps {
  lang: Lang
  major: MajorEntry
  universities: UniversityMatch[]
}

/** 처음에 보여줄 대학 수. 더 많으면 "더 많은 대학 보기"로 전체를 펼친다 */
const INITIAL_COUNT = 5

export default function UniversityList({ lang, major, universities }: UniversityListProps) {
  const t = UI[lang]
  const related = RELATED_PROGRAMS[major.name.ko]
  const [expanded, setExpanded] = useState(false)
  const hidden = universities.length - INITIAL_COUNT
  const shown = expanded ? universities : universities.slice(0, INITIAL_COUNT)

  return (
    <div className="unis">
      <p className="unis__title">{t.uniTitle(major.name[lang], universities.length)}</p>
      <p className="unis__searched">
        {t.uniSearched(major.programs.join(', '))}
        {related && (
          <>
            <br />
            {t.uniKeywords(related.include.join(', '))}
          </>
        )}
      </p>

      {universities.length === 0 ? (
        <p className="unis__empty">{t.uniEmpty}</p>
      ) : (
        <>
          <ul className="unis__list">
            {shown.map(({ university, programs }) => (
              <li key={university} className="unis__item">
                <span className="unis__name">{university}</span>
                {programs.map((p) => (
                  <span key={`${p.dept}|${p.major}`} className="unis__program">
                    {p.major ? `${p.dept} · ${p.major}` : p.dept}
                    {p.related && <span className="unis__badge">{t.uniRelated}</span>}
                  </span>
                ))}
              </li>
            ))}
          </ul>
          {hidden > 0 && (
            <Button variant="secondary" block className="unis__more" onClick={() => setExpanded((v) => !v)}>
              {expanded ? t.uniLess : t.uniMore(hidden)}
            </Button>
          )}
          <p className="unis__note">
            {t.uniNote}
            {related && (
              <>
                <br />
                {t.uniRelatedHint}
              </>
            )}
          </p>
        </>
      )}
    </div>
  )
}
