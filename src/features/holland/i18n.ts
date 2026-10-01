export type Lang = 'ko' | 'vi'

/** 언어별 텍스트 */
export type Localized<T = string> = Record<Lang, T>

export const LANGS: readonly { code: Lang; label: string }[] = [
  { code: 'ko', label: '한국어' },
  { code: 'vi', label: 'Tiếng Việt' },
]

/** 전공 추천 이유 한 줄: 근거 문구 + 유형 코드 */
interface ReasonItem {
  text: string
  type: string
}

/** 한글 마지막 글자에 받침이 있는지 (을/를 선택용) */
const hasBatchim = (word: string) => {
  const code = word.charCodeAt(word.length - 1) - 0xac00
  return code >= 0 && code <= 11171 && code % 28 !== 0
}

/** 화면 고정 문구 */
const ko = {
  langGroup: '언어 선택',
  introTitle: '나에게 맞는 전공은 무엇일까요?',
  introValue: '나의 성향을 알면, 전공 선택이 더 쉬워집니다.',
  introDesc: '간단한 질문으로 나의 관심과 성향을 알아보세요.',
  introFeatures: ['추천 전공', '관련 직업', '대학 정보'],
  typesAria: 'Holland 6유형',
  meta: (n: number) => [`${n}문항`, '약 3분', '무료'],
  start: '테스트 시작하기',
  aboutTitle: '검사 안내',
  about: (brand: string) =>
    `이 설문은 ${brand}의 유학 컨설팅 서비스를 위한 전공 탐색 도구로 개발되었으며, RIASEC 직업흥미 이론을 바탕으로 고용노동부 고용24의 대학전공흥미검사와 진로정보망 커리어넷의 직업흥미검사 등 공공 진로·직업심리검사의 구성 및 활용 방향을 참고하여 설계되었습니다.`,
  progress: (p: number) => `진행률 ${p}%`,
  scaleLegend: (id: number) => `Q${id} 응답 선택 (1~5점)`,
  home: '← 처음으로',
  logoHome: 'DAY BY KOREA — 처음 화면으로',
  homeConfirm: '처음 화면으로 돌아가면 지금까지의 응답이 사라집니다. 돌아갈까요?',
  prev: '← 이전',
  next: '다음 →',
  seeResult: '결과 보기',
  unanswered: (done: number, total: number) => `아직 답하지 않은 문항이 있습니다. (${done}/${total})`,
  goToUnanswered: (id: number) => `Q${id}(으)로 이동 →`,
  navTitle: '문항 목록',
  navAnswered: '응답 완료',
  navSkipped: '미응답',
  navUnseen: '아직 안 봄',
  navCurrent: '현재 문항',
  codeEyebrow: '나의 Holland Code',
  profileTitle: '나의 Holland 특징',
  profile: (lead: string, middle: string, tail: string) => `${lead}, ${middle}, ${tail}`,
  combinedTitle: (code: string) => `🎯 ${code}에 어울리는 전공 분야`,
  combinedDesc: (code: string) =>
    `${[...code].join('·')} 세 유형을 함께 활용할 수 있는 전공을 우선 추천하고, 점수가 높은 유형의 비중을 더 크게 반영했습니다.`,
  majorWhy: (items: ReasonItem[]) => {
    const list = items.map((i) => `${i.text}(${i.type})`).join(', ')
    const p = hasBatchim(items[items.length - 1].text) ? '을' : '를'
    return items.length > 1 ? `${list}${p} 함께 활용할 수 있는 분야입니다.` : `${list}${p} 살릴 수 있는 분야입니다.`
  },
  whyToggle: '왜 이 전공이 추천되나요?',
  uniToggle: (n: number) => (n > 0 ? `🏫 이 전공이 있는 대학 ${n}곳 보기` : '🏫 개설 대학 확인'),
  jobsToggle: (n: number) => `💼 추천 직업 ${n}개 보기`,
  jobsTitle: '💼 추천 직업',
  jobsDesc: '전공과 관련된 직업 중 나의 Holland 성향과 연결되는 직업부터 보여줍니다.',
  jobTypesLabel: '관련 Holland 유형',
  jobShared: (code: string, types: string) => `나의 ${code} 성향과 ${types} 유형이 연결됩니다.`,
  jobNoShared: (code: string) => `나의 ${code} 성향과 직접 겹치는 유형은 적지만, 전공과 관련해 탐색해볼 수 있는 직업입니다.`,
  jobsEmpty: '이 전공의 관련 직업 예시 데이터가 아직 없습니다.',
  jobsNote: 'Holland 성향을 바탕으로 탐색해볼 수 있는 예시 직업이며, 직업 선택을 판단하는 기준은 아닙니다.',
  uniTitle: (major: string, n: number) => `${major} 전공이 있는 대학 ${n}곳`,
  uniSearched: (names: string) => `같은 이름: ${names}`,
  uniKeywords: (words: string) => `관련 키워드: ${words}`,
  uniRelated: '관련',
  uniRelatedHint: '"관련" 표시는 이름이 같지는 않지만 키워드로 찾은 유사 전공입니다.',
  uniMore: (n: number) => `더 많은 대학 보기 (+${n})`,
  uniLess: '접기',
  uniEmpty: '현재 모집요강 데이터에는 이 전공명과 일치하는 학과·전공이 없습니다.',
  uniNote: '모집요강 데이터 순서대로 표시하며, 순위나 추천이 아닙니다.',
  perTypeTitle: '나의 Holland 유형별 특징 · 추천 전공',
  rank: (n: number) => `${n}순위`,
  majorsLabel: '추천 전공 분야',
  scoresTitle: '전체 유형별 점수',
  scoreLabel: (en: string, score: number) => `${en} ${score}점`,
  note: '점수가 같을 경우 R → I → A → S → E → C 순서로 정렬됩니다. 이 결과는 참고용이며, 관심 분야를 탐색하는 출발점으로 활용해 주세요.',
  restart: '다시 테스트하기',
}

export const UI: Localized<typeof ko> = {
  ko,
  vi: {
    langGroup: 'Chọn ngôn ngữ',
    introTitle: 'Ngành học nào phù hợp với bạn?',
    introValue: 'Hiểu rõ xu hướng của mình, việc chọn ngành sẽ dễ dàng hơn.',
    introDesc: 'Trả lời vài câu hỏi đơn giản để hiểu sở thích và xu hướng của bạn.',
    introFeatures: ['Ngành gợi ý', 'Nghề liên quan', 'Trường đại học'],
    typesAria: '6 nhóm Holland',
    meta: (n: number) => [`${n} câu hỏi`, 'Khoảng 3 phút', 'Miễn phí'],
    start: 'Bắt đầu bài test',
    aboutTitle: 'Về bài khảo sát',
    about: (brand: string) =>
      `Bài khảo sát này được phát triển như một công cụ khám phá ngành học cho dịch vụ tư vấn du học của ${brand}. Dựa trên lý thuyết sở thích nghề nghiệp RIASEC, bài khảo sát được thiết kế có tham khảo cấu trúc và cách sử dụng của các bài trắc nghiệm hướng nghiệp công tại Hàn Quốc, như Bài kiểm tra sở thích ngành đại học của Goyong24 (Bộ Việc làm và Lao động) và Bài kiểm tra sở thích nghề nghiệp của CareerNet.`,
    progress: (p: number) => `Tiến độ ${p}%`,
    scaleLegend: (id: number) => `Chọn câu trả lời cho Q${id} (1–5 điểm)`,
    home: '← Về trang đầu',
    logoHome: 'DAY BY KOREA — Về trang đầu',
    homeConfirm: 'Nếu quay về trang đầu, các câu trả lời hiện tại sẽ bị xóa. Bạn có muốn quay lại không?',
    prev: '← Trước',
    next: 'Tiếp →',
    seeResult: 'Xem kết quả',
    unanswered: (done: number, total: number) => `Bạn vẫn còn câu hỏi chưa trả lời. (${done}/${total})`,
    goToUnanswered: (id: number) => `Đến câu Q${id} →`,
    navTitle: 'Danh sách câu hỏi',
    navAnswered: 'Đã trả lời',
    navSkipped: 'Chưa trả lời',
    navUnseen: 'Chưa xem',
    navCurrent: 'Câu hiện tại',
    codeEyebrow: 'Mã Holland của bạn',
    profileTitle: 'Đặc điểm Holland của bạn',
    profile: (lead: string, middle: string, tail: string) =>
      `Bạn thích ${lead}, đồng thời ${middle}, và cũng quan tâm đến ${tail}.`,
    combinedTitle: (code: string) => `🎯 Các nhóm ngành phù hợp với ${code}`,
    combinedDesc: (code: string) =>
      `Ưu tiên những ngành tận dụng được cả 3 nhóm ${[...code].join('·')}, nhóm có điểm cao hơn được tính trọng số lớn hơn.`,
    majorWhy: (items: ReasonItem[]) => {
      const parts = items.map((i) => `${i.text} (${i.type})`)
      return parts.length > 1
        ? `Ngành này giúp bạn kết hợp ${parts.slice(0, -1).join(', ')} và ${parts[parts.length - 1]}.`
        : `Ngành này giúp bạn phát huy ${parts[0]}.`
    },
    whyToggle: 'Vì sao ngành này được gợi ý?',
    uniToggle: (n: number) => (n > 0 ? `🏫 Xem ${n} trường có ngành này` : '🏫 Kiểm tra trường đào tạo'),
    jobsToggle: (n: number) => `💼 Xem ${n} nghề gợi ý`,
    jobsTitle: '💼 Nghề nghiệp gợi ý',
    jobsDesc: 'Trong các nghề liên quan đến ngành, những nghề gắn với xu hướng Holland của bạn được hiển thị trước.',
    jobTypesLabel: 'Nhóm Holland liên quan',
    jobShared: (code: string, types: string) => `Gắn với xu hướng ${code} của bạn qua nhóm ${types}.`,
    jobNoShared: (code: string) => `Ít trùng trực tiếp với xu hướng ${code} của bạn, nhưng là nghề có thể tìm hiểu thêm liên quan đến ngành này.`,
    jobsEmpty: 'Chưa có dữ liệu nghề nghiệp ví dụ cho ngành này.',
    jobsNote: 'Đây là các nghề ví dụ để tìm hiểu dựa trên xu hướng Holland, không phải tiêu chí để quyết định chọn nghề.',
    uniTitle: (major: string, n: number) => `${n} trường có ngành ${major}`,
    uniSearched: (names: string) => `Trùng tên: ${names}`,
    uniKeywords: (words: string) => `Từ khóa liên quan: ${words}`,
    uniRelated: 'Liên quan',
    uniRelatedHint: 'Nhãn "Liên quan" là ngành tương tự được tìm theo từ khóa, không trùng tên hoàn toàn.',
    uniMore: (n: number) => `Xem thêm trường (+${n})`,
    uniLess: 'Thu gọn',
    uniEmpty: 'Dữ liệu tuyển sinh hiện tại không có khoa/ngành nào trùng với tên ngành này.',
    uniNote: 'Hiển thị theo thứ tự trong dữ liệu tuyển sinh, không phải xếp hạng hay gợi ý.',
    perTypeTitle: 'Đặc điểm và ngành gợi ý theo từng nhóm Holland',
    rank: (n: number) => `Thứ ${n}`,
    majorsLabel: 'Ngành học gợi ý',
    scoresTitle: 'Điểm theo từng nhóm (4–20)',
    scoreLabel: (en: string, score: number) => `${en} ${score} điểm`,
    note: 'Nếu bằng điểm, thứ tự sẽ theo R → I → A → S → E → C. Kết quả chỉ mang tính tham khảo — hãy dùng nó làm điểm khởi đầu để khám phá lĩnh vực bạn quan tâm.',
    restart: 'Làm lại bài test',
  },
}
