import type { Localized } from '../i18n'
import type { HollandType } from './hollandTypes'

/**
 * "나의 Holland 특징" 문장을 Top 3 순서대로 조립하기 위한 유형별 문장 조각.
 * - lead: 1순위 유형 (…좋아하면서도 / Bạn thích …)
 * - middle: 2순위 유형 (…강하고 / đồng thời …)
 * - tail: 3순위 유형 (…관심이 있는 편입니다 / và cũng quan tâm đến …)
 * 순서만 바꿔 끼워도 자연스럽게 읽히도록 각 조각은 독립된 구로 작성한다.
 */
export interface TraitPhrases {
  lead: string
  middle: string
  tail: string
}

export const TRAITS: Record<HollandType, Localized<TraitPhrases>> = {
  R: {
    ko: {
      lead: '직접 몸을 움직이고 도구나 기계를 다루는 것을 좋아하면서도',
      middle: '손으로 직접 만들고 고치는 실습형 활동에 강하고',
      tail: '실제 결과물을 만들어내는 활동에도 관심이 있는 편입니다.',
    },
    vi: {
      lead: 'vận động và làm việc với dụng cụ, máy móc',
      middle: 'làm tốt các hoạt động thực hành như tự tay làm và sửa chữa đồ vật',
      tail: 'những hoạt động tạo ra kết quả thực tế',
    },
  },
  I: {
    ko: {
      lead: '궁금한 것을 깊이 탐구하고 분석하는 것을 좋아하면서도',
      middle: '자료를 분석해 원리와 원인을 찾아내는 데 강하고',
      tail: '새로운 지식을 탐구하는 활동에도 관심이 있는 편입니다.',
    },
    vi: {
      lead: 'tìm hiểu sâu và phân tích vấn đề',
      middle: 'giỏi phân tích dữ liệu để tìm ra nguyên lý và nguyên nhân',
      tail: 'những hoạt động khám phá kiến thức mới',
    },
  },
  A: {
    ko: {
      lead: '창의적인 아이디어를 떠올리고 표현하는 것을 좋아하면서도',
      middle: '자신만의 방식으로 새롭게 표현하는 데 강하고',
      tail: '창의적으로 표현하는 활동에도 관심이 있는 편입니다.',
    },
    vi: {
      lead: 'nghĩ ra ý tưởng sáng tạo và thể hiện chúng',
      middle: 'giỏi thể hiện ý tưởng theo cách riêng của mình',
      tail: 'những hoạt động thể hiện sự sáng tạo',
    },
  },
  S: {
    ko: {
      lead: '사람들과 소통하고 돕는 것을 좋아하면서도',
      middle: '다른 사람의 이야기를 잘 듣고 협력하는 데 강하고',
      tail: '사람을 돕고 가르치는 활동에도 관심이 있는 편입니다.',
    },
    vi: {
      lead: 'giao tiếp và giúp đỡ mọi người',
      middle: 'biết lắng nghe và hợp tác tốt với người khác',
      tail: 'những hoạt động giúp đỡ và hướng dẫn người khác',
    },
  },
  E: {
    ko: {
      lead: '목표를 세우고 사람들을 이끄는 것을 좋아하면서도',
      middle: '사람들을 설득하고 일을 주도적으로 추진하는 데 강하고',
      tail: '사람들을 이끌고 도전하는 활동에도 관심이 있는 편입니다.',
    },
    vi: {
      lead: 'đặt mục tiêu và dẫn dắt mọi người',
      middle: 'giỏi thuyết phục và chủ động thúc đẩy công việc',
      tail: 'những hoạt động dẫn dắt và thử thách bản thân',
    },
  },
  C: {
    ko: {
      lead: '자료를 체계적으로 정리하고 정확하게 처리하는 것을 좋아하면서도',
      middle: '정해진 구조와 기준에 따라 꼼꼼하게 작업하는 데 강하고',
      tail: '계획과 자료를 체계적으로 관리하는 활동에도 관심이 있는 편입니다.',
    },
    vi: {
      lead: 'sắp xếp dữ liệu có hệ thống và xử lý công việc chính xác',
      middle: 'làm việc cẩn thận theo cấu trúc và tiêu chuẩn rõ ràng',
      tail: 'những hoạt động quản lý kế hoạch và dữ liệu có hệ thống',
    },
  },
}
