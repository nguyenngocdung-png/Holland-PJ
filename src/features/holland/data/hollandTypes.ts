import type { Localized } from '../i18n'

export type HollandType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C'

/** 고정 순서. 동점 처리 시에도 이 순서를 기준으로 사용한다. */
export const HOLLAND_ORDER: readonly HollandType[] = ['R', 'I', 'A', 'S', 'E', 'C']

export interface HollandTypeInfo {
  code: HollandType
  en: string
  name: Localized
  /** 칩·점수 목록처럼 좁은 곳에 쓰는 짧은 이름 */
  shortName: Localized
  keywords: Localized<string[]>
  desc: Localized
  majors: Localized[]
  color: string
}

export const HOLLAND_TYPES: Record<HollandType, HollandTypeInfo> = {
  R: {
    code: 'R',
    en: 'Realistic',
    name: { ko: '현실형', vi: 'Nhóm kỹ thuật - thực tế' },
    shortName: { ko: '현실형', vi: 'Thực tế' },
    keywords: { ko: ['실천적', '손재주', '도구·기계'], vi: ['Thực tế', 'Khéo tay', 'Dụng cụ · máy móc'] },
    desc: {
      ko: '직접 몸을 움직이고 도구나 기계를 다루며 눈에 보이는 결과물을 만드는 것을 좋아합니다. 이론보다 실습과 경험을 통해 배우는 편입니다.',
      vi: 'Bạn thích vận động, sử dụng dụng cụ hoặc máy móc và tạo ra kết quả cụ thể, nhìn thấy được. Bạn thường học tốt hơn qua thực hành và trải nghiệm thay vì lý thuyết.',
    },
    majors: [
      { ko: '기계공학', vi: 'Kỹ thuật cơ khí' },
      { ko: '전기공학', vi: 'Kỹ thuật điện' },
      { ko: '건축공학', vi: 'Kỹ thuật kiến trúc' },
      { ko: '자동차공학', vi: 'Kỹ thuật ô tô' },
      { ko: '환경공학', vi: 'Kỹ thuật môi trường' },
    ],
    color: '#2f855a',
  },
  I: {
    code: 'I',
    en: 'Investigative',
    name: { ko: '탐구형', vi: 'Nhóm nghiên cứu - khám phá' },
    shortName: { ko: '탐구형', vi: 'Nghiên cứu' },
    keywords: { ko: ['논리적', '분석적', '호기심'], vi: ['Logic', 'Phân tích', 'Tò mò'] },
    desc: {
      ko: '궁금한 것을 깊이 파고들고, 자료를 분석해 원리와 원인을 밝혀내는 것을 좋아합니다. 논리적으로 생각하고 스스로 답을 찾는 과정에서 만족을 느낍니다.',
      vi: 'Bạn thích tìm hiểu sâu những điều mình tò mò, phân tích dữ liệu để khám phá nguyên lý và nguyên nhân. Bạn cảm thấy hài lòng khi tư duy logic và tự mình tìm ra câu trả lời.',
    },
    majors: [
      { ko: '데이터사이언스', vi: 'Khoa học dữ liệu' },
      { ko: '컴퓨터공학', vi: 'Kỹ thuật máy tính' },
      { ko: '생명과학', vi: 'Khoa học sự sống' },
      { ko: '화학', vi: 'Hóa học' },
      { ko: '수학', vi: 'Toán học' },
    ],
    color: '#2b6cb0',
  },
  A: {
    code: 'A',
    en: 'Artistic',
    name: { ko: '예술형', vi: 'Nhóm nghệ thuật - sáng tạo' },
    shortName: { ko: '예술형', vi: 'Nghệ thuật' },
    keywords: { ko: ['창의적', '표현력', '자유로움'], vi: ['Sáng tạo', 'Biểu đạt', 'Tự do'] },
    desc: {
      ko: '새로운 아이디어를 떠올리고 글, 디자인, 영상 등 자신만의 방식으로 표현하는 것을 좋아합니다. 정해진 틀보다 자유롭고 개성 있는 환경에서 능력을 발휘합니다.',
      vi: 'Bạn thích nghĩ ra ý tưởng mới và thể hiện chúng theo cách riêng qua văn bản, thiết kế, video… Bạn phát huy tốt nhất trong môi trường tự do, đề cao cá tính thay vì khuôn mẫu cố định.',
    },
    majors: [
      { ko: '디자인', vi: 'Thiết kế' },
      { ko: '영상', vi: 'Điện ảnh - video' },
      { ko: '미디어', vi: 'Truyền thông đa phương tiện' },
      { ko: '콘텐츠', vi: 'Sáng tạo nội dung' },
      { ko: '광고', vi: 'Quảng cáo' },
    ],
    color: '#b83280',
  },
  S: {
    code: 'S',
    en: 'Social',
    name: { ko: '사회형', vi: 'Nhóm xã hội - hỗ trợ' },
    shortName: { ko: '사회형', vi: 'Xã hội' },
    keywords: { ko: ['공감', '협력', '도움'], vi: ['Đồng cảm', 'Hợp tác', 'Giúp đỡ'] },
    desc: {
      ko: '사람들과 소통하며 가르치고, 돕고, 함께 성장하는 것에서 보람을 느낍니다. 다른 사람의 이야기를 잘 듣고 협력하는 환경을 좋아합니다.',
      vi: 'Bạn cảm thấy ý nghĩa khi giao tiếp, hướng dẫn, giúp đỡ và cùng phát triển với mọi người. Bạn biết lắng nghe và thích môi trường làm việc hợp tác.',
    },
    majors: [
      { ko: '교육학', vi: 'Giáo dục học' },
      { ko: '심리학', vi: 'Tâm lý học' },
      { ko: '사회복지학', vi: 'Công tác xã hội' },
      { ko: '상담', vi: 'Tư vấn' },
      { ko: '아동학', vi: 'Nghiên cứu trẻ em' },
    ],
    color: '#c05621',
  },
  E: {
    code: 'E',
    en: 'Enterprising',
    name: { ko: '기업형', vi: 'Nhóm lãnh đạo - kinh doanh' },
    shortName: { ko: '기업형', vi: 'Kinh doanh' },
    keywords: { ko: ['리더십', '설득력', '도전'], vi: ['Lãnh đạo', 'Thuyết phục', 'Thử thách'] },
    desc: {
      ko: '목표를 세우고 사람들을 이끌며 일을 주도적으로 추진하는 것을 좋아합니다. 설득과 협상에 강하고, 새로운 기회와 도전에 적극적입니다.',
      vi: 'Bạn thích đặt mục tiêu, dẫn dắt mọi người và chủ động thúc đẩy công việc. Bạn giỏi thuyết phục, đàm phán và luôn tích cực với những cơ hội, thử thách mới.',
    },
    majors: [
      { ko: '경영학', vi: 'Quản trị kinh doanh' },
      { ko: '마케팅', vi: 'Marketing' },
      { ko: '국제통상', vi: 'Thương mại quốc tế' },
      { ko: '창업', vi: 'Khởi nghiệp' },
      { ko: '광고홍보', vi: 'Quảng cáo - Quan hệ công chúng' },
    ],
    color: '#c53030',
  },
  C: {
    code: 'C',
    en: 'Conventional',
    name: { ko: '관습형', vi: 'Nhóm nghiệp vụ - tổ chức' },
    shortName: { ko: '관습형', vi: 'Nghiệp vụ' },
    keywords: { ko: ['꼼꼼함', '체계적', '정확성'], vi: ['Tỉ mỉ', 'Có hệ thống', 'Chính xác'] },
    desc: {
      ko: '자료와 숫자를 체계적으로 정리하고, 정해진 규칙과 절차에 따라 정확하게 일을 처리하는 것을 좋아합니다. 안정적이고 질서 있는 환경에서 강점을 보입니다.',
      vi: 'Bạn thích sắp xếp dữ liệu, con số một cách có hệ thống và xử lý công việc chính xác theo quy tắc, quy trình. Bạn phát huy thế mạnh trong môi trường ổn định, có trật tự.',
    },
    majors: [
      { ko: '회계학', vi: 'Kế toán' },
      { ko: '세무학', vi: 'Thuế' },
      { ko: '금융', vi: 'Tài chính - Ngân hàng' },
      { ko: '경영정보', vi: 'Hệ thống thông tin quản lý' },
      { ko: '행정학', vi: 'Hành chính học' },
    ],
    color: '#4c51bf',
  },
}
