import type { Localized } from '../i18n'
import type { HollandType } from './hollandTypes'

/** 직업의 Holland 유형별 관련 정도 (1 = 낮음 ~ 5 = 높음) */
export type HollandLevel = 1 | 2 | 3 | 4 | 5

export interface Job {
  jobName: Localized
  /**
   * 관련 전공. MAJOR_CATALOG의 전공명과 같은 이름으로 적는다.
   * (학과·학부·전공 접미사는 무시하고 비교하므로 '마케팅'과 '마케팅전공'은 같은 전공)
   */
  relatedMajors: readonly string[]
  holland: Record<HollandType, HollandLevel>
}

type Digit = '1' | '2' | '3' | '4' | '5'
/** R I A S E C 순서의 6자리 점수. 예) '125354' = R1 I2 A5 S3 E5 C4 */
type ProfileCode = `${Digit}${Digit}${Digit}${Digit}${Digit}${Digit}`

const job = (ko: string, vi: string, profile: ProfileCode, relatedMajors: string[]): Job => {
  const [R, I, A, S, E, C] = [...profile].map(Number) as HollandLevel[]
  return { jobName: { ko, vi }, relatedMajors, holland: { R, I, A, S, E, C } }
}

/**
 * 관련 직업 — Holland 기반 "탐색용 예시 데이터".
 * 직업별 Holland 점수는 일반적인 직무 특성을 바탕으로 작성한 참고값이며 공식 분류가 아니다.
 * 실제 직업 데이터로 교체할 때는 같은 Job 형태로 이 배열만 바꾸면 된다.
 */
export const JOBS: readonly Job[] = [
  // ── 마케팅 · 광고 · 콘텐츠
  job('브랜드 마케터', 'Chuyên viên marketing thương hiệu', '125354', ['마케팅', '경영학', '광고홍보']),
  job('디지털 마케터', 'Chuyên viên digital marketing', '144254', ['마케팅', '경영학', '광고홍보', '데이터사이언스', '경영정보']),
  job('콘텐츠 마케터', 'Chuyên viên content marketing', '125442', ['마케팅', '광고홍보', '미디어커뮤니케이션', '디지털콘텐츠', '문화콘텐츠']),
  job('광고 기획자', 'Người lập kế hoạch quảng cáo', '135352', ['광고홍보', '마케팅', '미디어커뮤니케이션']),
  job('마케팅 기획자', 'Chuyên viên kế hoạch marketing', '143254', ['마케팅', '경영학']),
  job('홍보 담당자', 'Chuyên viên quan hệ công chúng (PR)', '124553', ['광고홍보', '미디어커뮤니케이션', '정치외교학']),
  job('상품기획자(MD)', 'Chuyên viên phát triển sản phẩm (MD)', '234254', ['마케팅', '경영학', '패션디자인', '산업디자인', '물류유통']),
  job('데이터 분석가', 'Chuyên viên phân tích dữ liệu', '252235', ['데이터사이언스', '인공지능', '경영정보', '경제학', '마케팅', '컴퓨터공학']),
  job('UX/UI 디자이너', 'Nhà thiết kế UX/UI', '245324', ['디지털미디어디자인', '시각디자인', '산업디자인', '컴퓨터공학']),
  job('콘텐츠 기획자', 'Người lập kế hoạch nội dung', '135343', ['디지털콘텐츠', '문화콘텐츠', '미디어커뮤니케이션', '문예창작', '영화·영상', '게임콘텐츠']),
  job('광고 카피라이터', 'Người viết quảng cáo (copywriter)', '135342', ['광고홍보', '문예창작']),
  job('브랜드 디자이너', 'Nhà thiết kế thương hiệu', '135244', ['시각디자인', '마케팅']),
  job('시각 디자이너', 'Nhà thiết kế đồ họa', '225234', ['시각디자인', '광고홍보']),
  job('스포츠 마케터', 'Chuyên viên marketing thể thao', '323353', ['스포츠경영', '마케팅']),

  // ── 공학 · IT
  job('기계설계 엔지니어', 'Kỹ sư thiết kế cơ khí', '542124', ['기계공학', '산업공학']),
  job('자동차 엔지니어', 'Kỹ sư ô tô', '542123', ['기계공학', '전기전자공학']),
  job('반도체 엔지니어', 'Kỹ sư bán dẫn', '451124', ['전기전자공학', '화학']),
  job('전기설비 엔지니어', 'Kỹ sư hệ thống điện', '541224', ['전기전자공학', '건축공학']),
  job('소프트웨어 개발자', 'Lập trình viên phần mềm', '453124', ['컴퓨터공학', '인공지능', '게임콘텐츠']),
  job('정보보안 전문가', 'Chuyên gia an ninh thông tin', '351225', ['컴퓨터공학', '경영정보', '경찰행정학']),
  job('AI 엔지니어', 'Kỹ sư AI', '353124', ['인공지능', '컴퓨터공학', '데이터사이언스']),
  job('IT 기획자', 'Chuyên viên kế hoạch IT', '242354', ['경영정보', '컴퓨터공학']),
  job('생산관리자', 'Quản lý sản xuất', '441345', ['산업공학', '기계공학', '식품공학']),
  job('품질관리 엔지니어', 'Kỹ sư quản lý chất lượng', '441225', ['산업공학', '식품공학', '화학']),
  job('토목 엔지니어', 'Kỹ sư xây dựng dân dụng', '541234', ['토목·건설환경공학', '건축공학']),
  job('건설 현장관리자', 'Quản lý công trường xây dựng', '531354', ['토목·건설환경공학', '건축공학', '건축학']),
  job('건축 구조기술자', 'Kỹ sư kết cấu công trình', '552124', ['건축공학', '토목·건설환경공학']),
  job('환경 엔지니어', 'Kỹ sư môi trường', '541324', ['환경공학', '토목·건설환경공학']),
  job('환경 컨설턴트', 'Chuyên viên tư vấn môi trường', '351443', ['환경공학', '조경학']),

  // ── 자연과학 · 보건 · 의료
  job('화학 연구원', 'Nghiên cứu viên hóa học', '451114', ['화학', '생명과학', '식품공학']),
  job('화장품 연구원', 'Nghiên cứu viên mỹ phẩm', '453223', ['화학', '뷰티·미용', '생명과학']),
  job('바이오 연구원', 'Nghiên cứu viên công nghệ sinh học', '452214', ['생명과학', '약학', '식품공학']),
  job('식품개발 연구원', 'Nghiên cứu viên phát triển thực phẩm', '453233', ['식품공학', '조리외식']),
  job('임상연구 코디네이터', 'Điều phối viên nghiên cứu lâm sàng', '241535', ['간호학', '약학', '생명과학', '보건행정학']),
  job('간호사', 'Điều dưỡng viên', '441524', ['간호학']),
  job('보건교육사', 'Chuyên viên giáo dục sức khỏe', '233533', ['간호학', '보건행정학']),
  job('물리치료사', 'Chuyên viên vật lý trị liệu', '541523', ['물리치료학', '스포츠과학']),
  job('운동처방사', 'Chuyên viên kê đơn vận động', '541532', ['스포츠과학', '물리치료학']),
  job('작업치료사', 'Chuyên viên hoạt động trị liệu', '433523', ['작업치료학']),
  job('재활운동 지도사', 'Huấn luyện viên phục hồi chức năng', '531532', ['물리치료학', '작업치료학', '스포츠과학']),
  job('아동발달 지도사', 'Chuyên viên hỗ trợ phát triển trẻ em', '334523', ['작업치료학', '유아교육', '심리학']),
  job('응급구조사', 'Nhân viên cấp cứu', '531524', ['응급구조학']),
  job('소방관', 'Lính cứu hỏa', '521534', ['응급구조학']),
  job('안전관리자', 'Chuyên viên quản lý an toàn', '431325', ['응급구조학', '산업공학', '환경공학']),
  job('약사', 'Dược sĩ', '251435', ['약학']),
  job('의약품 인허가 담당자', 'Chuyên viên cấp phép dược phẩm', '141235', ['약학', '보건행정학']),
  job('병원 행정 관리자', 'Quản lý hành chính bệnh viện', '131445', ['보건행정학']),

  // ── 디자인 · 예술 · 미디어
  job('건축설계사', 'Kiến trúc sư thiết kế', '445234', ['건축학', '건축공학']),
  job('제품 디자이너', 'Nhà thiết kế sản phẩm', '435234', ['산업디자인']),
  job('인테리어 디자이너', 'Nhà thiết kế nội thất', '425344', ['인테리어디자인', '건축학']),
  job('공간 스타일리스트(VMD)', 'Chuyên viên trưng bày không gian (VMD)', '325344', ['인테리어디자인', '패션디자인', '마케팅']),
  job('전시·공간 디자이너', 'Nhà thiết kế không gian triển lãm', '425333', ['인테리어디자인', '산업디자인', '문화유산']),
  job('조경 설계사', 'Nhà thiết kế cảnh quan', '535224', ['조경학', '환경공학']),
  job('도시재생 코디네이터', 'Điều phối viên tái thiết đô thị', '333543', ['조경학', '행정학', '부동산학']),
  job('게임 기획자', 'Người lên ý tưởng game', '245343', ['게임콘텐츠', '디지털콘텐츠']),
  job('게임 그래픽 디자이너', 'Nhà thiết kế đồ họa game', '325223', ['게임콘텐츠', '시각디자인', '디지털미디어디자인']),
  job('UX 리서처', 'Nhà nghiên cứu UX', '154423', ['심리학', '디지털미디어디자인']),
  job('패션 디자이너', 'Nhà thiết kế thời trang', '425233', ['패션디자인']),
  job('패션 MD', 'Chuyên viên MD thời trang', '234354', ['패션디자인', '마케팅']),
  job('영상 PD', 'Nhà sản xuất video (PD)', '335352', ['영화·영상', '미디어커뮤니케이션']),
  job('영상 편집자', 'Biên tập viên video', '425224', ['영화·영상', '디지털콘텐츠']),
  job('방송작가', 'Biên kịch truyền hình', '135432', ['문예창작', '영화·영상']),
  job('작가', 'Nhà văn', '145322', ['문예창작']),
  job('기자', 'Phóng viên', '145442', ['미디어커뮤니케이션']),
  job('배우', 'Diễn viên', '225441', ['연극·뮤지컬', '영화·영상']),
  job('공연기획자', 'Nhà sản xuất biểu diễn', '225453', ['연극·뮤지컬', '문화콘텐츠']),
  job('문화기획자', 'Người tổ chức sự kiện văn hóa', '125453', ['문화콘텐츠', '연극·뮤지컬']),
  job('학예사(큐레이터)', 'Người phụ trách bảo tàng (curator)', '255324', ['문화유산', '문화콘텐츠']),
  job('문화재 보존원', 'Chuyên viên bảo tồn di sản', '454114', ['문화유산']),
  job('메이크업 아티스트', 'Chuyên viên trang điểm', '415432', ['뷰티·미용', '연극·뮤지컬']),
  job('뷰티 컨설턴트', 'Chuyên viên tư vấn làm đẹp', '324542', ['뷰티·미용']),
  job('조리사(셰프)', 'Đầu bếp', '524333', ['조리외식']),
  job('외식 창업가', 'Người khởi nghiệp nhà hàng', '424353', ['조리외식', '창업', '호텔관광경영']),

  // ── 사회 · 교육 · 상담
  job('임상심리사', 'Chuyên viên tâm lý lâm sàng', '153513', ['심리학', '상담심리']),
  job('상담심리사', 'Chuyên viên tư vấn tâm lý', '144522', ['상담심리', '심리학']),
  job('아동 상담사', 'Chuyên viên tư vấn trẻ em', '134522', ['유아교육', '상담심리']),
  job('유치원 교사', 'Giáo viên mầm non', '224523', ['유아교육']),
  job('교사', 'Giáo viên', '133543', ['교육학']),
  job('교육 콘텐츠 개발자', 'Chuyên viên phát triển nội dung giáo dục', '145433', ['교육학', '한국어교육', '디지털콘텐츠']),
  job('한국어 교원', 'Giáo viên tiếng Hàn', '134533', ['한국어교육']),
  job('다문화 교육 코디네이터', 'Điều phối viên giáo dục đa văn hóa', '133543', ['한국어교육', '사회복지학', '교육학']),
  job('사회복지사', 'Nhân viên công tác xã hội', '232534', ['사회복지학']),
  job('복지 프로그램 기획자', 'Chuyên viên kế hoạch chương trình phúc lợi', '133544', ['사회복지학', '행정학']),
  job('스포츠 트레이너', 'Huấn luyện viên thể thao', '531542', ['스포츠과학']),
  job('스포츠 에이전트', 'Người đại diện thể thao', '222453', ['스포츠경영']),
  job('스포츠 이벤트 기획자', 'Người tổ chức sự kiện thể thao', '323453', ['스포츠경영', '스포츠과학']),

  // ── 법 · 행정 · 공공 · 국제
  job('경찰관', 'Cảnh sát', '531444', ['경찰행정학']),
  job('경호원', 'Vệ sĩ', '521334', ['경찰행정학']),
  job('변호사', 'Luật sư', '152454', ['법학']),
  job('법무 담당자', 'Chuyên viên pháp chế', '141335', ['법학', '행정학']),
  job('노무사', 'Chuyên viên tư vấn lao động', '141545', ['법학', '경영학']),
  job('공무원(행정직)', 'Công chức hành chính', '131435', ['행정학']),
  job('정책 분석가', 'Chuyên viên phân tích chính sách', '151344', ['행정학', '정치외교학', '경제학']),
  job('외교관', 'Nhà ngoại giao', '142553', ['정치외교학']),
  job('국제기구 직원', 'Nhân viên tổ chức quốc tế', '142544', ['정치외교학', '국제통상', '영어통번역']),
  job('통번역사', 'Biên - phiên dịch viên', '134524', ['영어통번역']),
  job('해외영업 담당자', 'Nhân viên kinh doanh quốc tế', '122454', ['영어통번역', '국제통상']),
  job('사서', 'Thủ thư', '142415', ['문헌정보학']),
  job('데이터베이스 관리자', 'Quản trị cơ sở dữ liệu', '351125', ['문헌정보학', '경영정보', '컴퓨터공학']),
  job('기록물 관리 전문가', 'Chuyên viên quản lý hồ sơ lưu trữ', '241215', ['문헌정보학', '문화유산', '행정학']),

  // ── 경영 · 경제 · 금융 · 서비스
  job('경영 컨설턴트', 'Chuyên viên tư vấn quản trị', '152354', ['경영학', '경영정보']),
  job('인사 담당자', 'Chuyên viên nhân sự', '131545', ['경영학', '심리학']),
  job('창업가', 'Nhà khởi nghiệp', '234353', ['창업', '경영학']),
  job('스타트업 사업개발 매니저', 'Quản lý phát triển kinh doanh startup', '143353', ['창업', '경영학', '국제통상']),
  job('경제 연구원', 'Nghiên cứu viên kinh tế', '151234', ['경제학', '금융']),
  job('회계사', 'Kế toán viên công chứng', '141235', ['회계학', '금융']),
  job('세무사', 'Chuyên viên thuế', '141335', ['회계학']),
  job('재무 분석가', 'Chuyên viên phân tích tài chính', '151245', ['금융', '경제학', '회계학']),
  job('은행원', 'Nhân viên ngân hàng', '131445', ['금융', '경영학']),
  job('물류관리사', 'Chuyên viên quản lý logistics', '431245', ['물류유통', '국제통상']),
  job('바이어', 'Chuyên viên thu mua (buyer)', '233354', ['물류유통', '국제통상', '패션디자인']),
  job('무역 사무원', 'Nhân viên xuất nhập khẩu', '121345', ['국제통상', '물류유통']),
  job('공인중개사', 'Môi giới bất động sản', '221454', ['부동산학']),
  job('부동산 자산관리사', 'Chuyên viên quản lý tài sản bất động sản', '231355', ['부동산학', '금융']),
  job('호텔리어', 'Nhân viên khách sạn', '222544', ['호텔관광경영', '항공서비스']),
  job('여행상품 기획자', 'Người thiết kế tour du lịch', '134453', ['호텔관광경영']),
  job('항공 승무원', 'Tiếp viên hàng không', '312544', ['항공서비스']),
  job('공항 지상직', 'Nhân viên mặt đất sân bay', '221535', ['항공서비스', '호텔관광경영']),
]
