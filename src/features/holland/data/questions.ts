import type { Localized } from '../i18n'
import type { HollandType } from './hollandTypes'

export interface Question {
  id: number
  type: HollandType
  text: Localized
}

export const QUESTIONS: readonly Question[] = [
  { id: 1, type: 'R', text: { ko: '직접 도구나 기계를 사용해서 무언가를 만들거나 고치는 활동이 재미있다.', vi: 'Tôi thấy thú vị khi sử dụng dụng cụ hoặc máy móc để trực tiếp làm hoặc sửa chữa một thứ gì đó.' } },
  { id: 2, type: 'I', text: { ko: '복잡한 문제의 원인을 찾아 논리적으로 해결하는 것을 좋아한다.', vi: 'Tôi thích tìm nguyên nhân của những vấn đề phức tạp và giải quyết chúng một cách logic.' } },
  { id: 3, type: 'A', text: { ko: '새로운 아이디어를 떠올리고 나만의 방식으로 표현하는 것을 좋아한다.', vi: 'Tôi thích nghĩ ra những ý tưởng mới và thể hiện chúng theo cách riêng của mình.' } },
  { id: 4, type: 'S', text: { ko: '다른 사람에게 설명하거나 가르쳐 주는 활동이 즐겁다.', vi: 'Tôi thích giải thích hoặc hướng dẫn cho người khác.' } },
  { id: 5, type: 'E', text: { ko: '사람들을 설득하거나 어떤 일을 주도해서 진행하는 것을 좋아한다.', vi: 'Tôi thích thuyết phục người khác hoặc chủ động dẫn dắt một công việc.' } },
  { id: 6, type: 'C', text: { ko: '자료나 숫자를 정리하고 정확하게 관리하는 일을 좋아한다.', vi: 'Tôi thích sắp xếp và quản lý dữ liệu hoặc con số một cách chính xác.' } },
  { id: 7, type: 'R', text: { ko: '직접 실험하거나 무언가를 만들어 보면서 배우는 것이 좋다.', vi: 'Tôi thích học bằng cách trực tiếp thử nghiệm hoặc tự làm một thứ gì đó.' } },
  { id: 8, type: 'I', text: { ko: '새로운 정보를 찾아보고 그 내용을 깊이 있게 분석하는 것을 좋아한다.', vi: 'Tôi thích tìm kiếm thông tin mới và phân tích nội dung đó một cách sâu sắc.' } },
  { id: 9, type: 'A', text: { ko: '디자인, 영상, 글쓰기 등 창의적인 결과물을 만드는 활동에 관심이 있다.', vi: 'Tôi quan tâm đến những hoạt động tạo ra sản phẩm sáng tạo như thiết kế, video hoặc viết lách.' } },
  { id: 10, type: 'S', text: { ko: '다른 사람의 고민이나 문제를 듣고 해결을 도와주는 것이 보람 있다.', vi: 'Tôi cảm thấy có ý nghĩa khi lắng nghe vấn đề của người khác và giúp họ giải quyết.' } },
  { id: 11, type: 'E', text: { ko: '팀 프로젝트에서 사람들을 이끌고 목표를 달성하는 역할을 맡고 싶다.', vi: 'Tôi muốn đóng vai trò dẫn dắt mọi người và đạt được mục tiêu trong các dự án nhóm.' } },
  { id: 12, type: 'C', text: { ko: '계획표, 문서, 데이터 등을 체계적으로 정리하는 것을 좋아한다.', vi: 'Tôi thích sắp xếp kế hoạch, tài liệu và dữ liệu một cách có hệ thống.' } },
  { id: 13, type: 'R', text: { ko: '컴퓨터, 기계, 제품 등이 어떻게 작동하는지 직접 확인해 보는 것이 흥미롭다.', vi: 'Tôi thấy thú vị khi trực tiếp tìm hiểu cách máy tính, máy móc hoặc sản phẩm hoạt động.' } },
  { id: 14, type: 'I', text: { ko: '데이터를 비교하거나 정보를 분석해서 결론을 내리는 것을 좋아한다.', vi: 'Tôi thích so sánh dữ liệu hoặc phân tích thông tin để đưa ra kết luận.' } },
  { id: 15, type: 'A', text: { ko: '정해진 방법보다 새로운 방법을 생각해서 문제를 해결하는 것을 좋아한다.', vi: 'Tôi thích nghĩ ra cách mới để giải quyết vấn đề thay vì chỉ làm theo phương pháp có sẵn.' } },
  { id: 16, type: 'S', text: { ko: '여러 사람과 의견을 나누고 협력하면서 결과를 만들어 내는 것을 좋아한다.', vi: 'Tôi thích trao đổi ý kiến và hợp tác với nhiều người để tạo ra kết quả.' } },
  { id: 17, type: 'E', text: { ko: '새로운 프로젝트나 사업 아이디어를 생각하고 실제로 실행해 보고 싶다.', vi: 'Tôi muốn nghĩ ra những dự án hoặc ý tưởng kinh doanh mới và thực sự thử triển khai chúng.' } },
  { id: 18, type: 'C', text: { ko: '숫자, 표, 문서 등을 확인하면서 오류를 찾아내는 일을 좋아한다.', vi: 'Tôi thích kiểm tra số liệu, bảng biểu và tài liệu để tìm ra lỗi.' } },
  { id: 19, type: 'R', text: { ko: '실제 결과물을 직접 만들어 내는 활동이 이론을 공부하는 것보다 더 흥미롭다.', vi: 'Tôi thấy việc trực tiếp tạo ra sản phẩm thực tế thú vị hơn việc học lý thuyết.' } },
  { id: 20, type: 'I', text: { ko: '어떤 주제에 관심이 생기면 관련 자료를 찾아 더 깊이 공부하고 싶어진다.', vi: 'Khi quan tâm đến một chủ đề nào đó, tôi muốn tìm tài liệu liên quan và tìm hiểu sâu hơn.' } },
  { id: 21, type: 'A', text: { ko: '자유롭게 아이디어를 표현하고 새로운 것을 만들어 내는 활동을 좋아한다.', vi: 'Tôi thích tự do thể hiện ý tưởng và tạo ra những điều mới.' } },
  { id: 22, type: 'S', text: { ko: '다른 사람들과 함께 활동하면서 서로의 의견을 조율하는 것을 좋아한다.', vi: 'Tôi thích làm việc cùng người khác và điều phối ý kiến của mọi người.' } },
  { id: 23, type: 'E', text: { ko: '목표를 정하고 사람들을 설득해 원하는 결과를 만들어 내는 것이 재미있다.', vi: 'Tôi thấy thú vị khi đặt mục tiêu, thuyết phục mọi người và tạo ra kết quả mình mong muốn.' } },
  // 원문 베트남어 끝부분에 한국어("정해져 있습니다")가 섞여 있어 자연스러운 베트남어로 수정함
  { id: 24, type: 'C', text: { ko: '정해진 규칙과 절차에 따라 일을 정확하고 꼼꼼하게 처리하는 것을 좋아한다.', vi: 'Tôi thích xử lý công việc chính xác và cẩn thận theo các quy tắc và quy trình đã được quy định.' } },
]

export interface ScaleOption {
  value: 1 | 2 | 3 | 4 | 5
  label: Localized
}

export const SCALE: readonly ScaleOption[] = [
  { value: 1, label: { ko: '전혀 그렇지 않다', vi: 'Hoàn toàn không đúng với tôi' } },
  { value: 2, label: { ko: '그렇지 않은 편이다', vi: 'Không đúng với tôi' } },
  { value: 3, label: { ko: '보통이다', vi: 'Bình thường' } },
  { value: 4, label: { ko: '그런 편이다', vi: 'Khá đúng với tôi' } },
  { value: 5, label: { ko: '매우 그렇다', vi: 'Rất đúng với tôi' } },
]
