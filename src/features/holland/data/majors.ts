import type { Localized } from '../i18n'
import type { HollandType } from './hollandTypes'

/** 전공이 특정 Holland 유형과 연결되는 이유 (명사구: 추천 문장에 그대로 끼워 넣는다) */
export interface MajorFit {
  type: HollandType
  reason: Localized
}

export interface MajorEntry {
  name: Localized
  /** 관련 Holland 유형, 관련성이 높은 순서 (첫 번째가 가장 중심) */
  fit: readonly MajorFit[]
  /**
   * 개설 대학 검색에 쓰는 모집요강상 전공명 (정확히 일치하는 이름만 검색).
   * 기본값은 전공 이름 그대로. 모집요강에서 같은 분야를 다른 이름으로 부르는 경우에만 명시한다.
   */
  programs: readonly string[]
}

type FitRow = [type: HollandType, ko: string, vi: string]

const major = (ko: string, vi: string, ...fit: FitRow[]): MajorEntry => ({
  name: { ko, vi },
  fit: fit.map(([type, rko, rvi]) => ({ type, reason: { ko: rko, vi: rvi } })),
  programs: [ko],
})

/** 모집요강에서 검색할 전공명을 직접 지정 */
const searchAs = (entry: MajorEntry, ...programs: string[]): MajorEntry => ({ ...entry, programs })

/**
 * 통합 전공 추천에 사용하는 전공 목록 (정적 데이터).
 * 20가지 Top 3 조합 모두에 세 유형을 함께 쓰는 전공이 2개 이상 있도록 구성했다.
 */
export const MAJOR_CATALOG: readonly MajorEntry[] = [
  // ── R · I · C
  major('기계공학', 'Kỹ thuật cơ khí',
    ['R', '기계를 직접 설계·제작하는 일', 'chế tạo và lắp ráp máy móc thực tế'],
    ['I', '역학 원리를 분석하는 능력', 'khả năng phân tích các nguyên lý cơ học'],
    ['C', '정밀한 도면과 규격을 다루는 꼼꼼함', 'sự tỉ mỉ khi làm việc với bản vẽ và tiêu chuẩn kỹ thuật']),
  searchAs(major('전기전자공학', 'Kỹ thuật điện - điện tử',
    ['R', '회로와 장비를 직접 다루는 실습', 'thực hành trực tiếp với mạch điện và thiết bị'],
    ['I', '전기·전자 원리에 대한 탐구', 'việc tìm hiểu nguyên lý điện - điện tử'],
    ['C', '정확한 측정과 안전 기준 준수', 'đo lường chính xác và tuân thủ tiêu chuẩn an toàn']), '전기전자공학', '전자전기공학'),
  major('컴퓨터공학', 'Kỹ thuật máy tính',
    ['I', '문제를 논리적으로 분석하는 능력', 'tư duy logic để phân tích vấn đề'],
    ['R', '프로그램과 시스템을 직접 만드는 일', 'tự tay xây dựng chương trình và hệ thống'],
    ['C', '규칙에 맞게 코드를 체계적으로 관리하는 습관', 'thói quen quản lý mã nguồn có hệ thống theo quy tắc']),
  major('인공지능', 'Trí tuệ nhân tạo',
    ['I', '데이터 속 패턴을 찾는 탐구심', 'tinh thần khám phá quy luật trong dữ liệu'],
    ['R', '모델을 직접 구현하고 실험하는 일', 'tự xây dựng và thử nghiệm mô hình'],
    ['C', '데이터를 정확하게 정리하는 꼼꼼함', 'sự tỉ mỉ khi chuẩn bị dữ liệu chính xác']),
  major('화학', 'Hóa học',
    ['I', '물질의 원리를 탐구하는 호기심', 'sự tò mò về nguyên lý của vật chất'],
    ['R', '실험 기구를 다루는 실험 활동', 'thao tác với dụng cụ thí nghiệm'],
    ['C', '절차에 따른 정확한 실험 기록', 'ghi chép thí nghiệm chính xác theo quy trình']),

  // ── R · I · S
  major('환경공학', 'Kỹ thuật môi trường',
    ['R', '현장에서 환경 설비를 다루는 일', 'làm việc với thiết bị môi trường tại hiện trường'],
    ['I', '오염 원인을 분석하는 능력', 'khả năng phân tích nguyên nhân ô nhiễm'],
    ['S', '사람들의 건강과 생활을 지키려는 마음', 'mong muốn bảo vệ sức khỏe và cuộc sống của cộng đồng']),
  major('생명과학', 'Khoa học sự sống',
    ['I', '생명 현상에 대한 탐구', 'việc khám phá các hiện tượng sự sống'],
    ['R', '실험실에서의 실습', 'thực hành trong phòng thí nghiệm'],
    ['S', '의료·건강 분야에 기여하려는 마음', 'mong muốn đóng góp cho y tế và sức khỏe']),
  major('간호학', 'Điều dưỡng',
    ['S', '환자를 돌보고 공감하는 마음', 'sự quan tâm, đồng cảm khi chăm sóc bệnh nhân'],
    ['I', '의학 지식에 대한 이해', 'hiểu biết về kiến thức y học'],
    ['R', '의료 기구를 다루는 실무 능력', 'kỹ năng thực hành với dụng cụ y tế']),
  major('물리치료학', 'Vật lý trị liệu',
    ['S', '환자의 회복을 돕는 일', 'việc giúp bệnh nhân phục hồi'],
    ['R', '몸을 직접 움직이는 치료 활동', 'các hoạt động trị liệu bằng vận động'],
    ['I', '인체 구조에 대한 이해', 'hiểu biết về cấu trúc cơ thể']),

  // ── R · I · E
  searchAs(major('토목·건설환경공학', 'Kỹ thuật xây dựng',
    ['R', '실제 구조물을 만드는 현장 경험', 'trải nghiệm thi công công trình thực tế'],
    ['I', '구조 안전을 계산하는 분석력', 'khả năng tính toán an toàn kết cấu'],
    ['E', '프로젝트를 이끄는 추진력', 'năng lực dẫn dắt dự án']), '토목공학', '건설환경공학'),
  major('산업공학', 'Kỹ thuật công nghiệp',
    ['I', '생산 과정을 분석하는 능력', 'khả năng phân tích quy trình sản xuất'],
    ['R', '현장의 설비와 공정 개선', 'việc cải tiến thiết bị và dây chuyền thực tế'],
    ['E', '효율을 높여 성과를 내는 추진력', 'tinh thần thúc đẩy hiệu quả và kết quả']),
  major('식품공학', 'Công nghệ thực phẩm',
    ['R', '식품을 직접 만들고 가공하는 일', 'trực tiếp chế biến và sản xuất thực phẩm'],
    ['I', '성분과 품질을 분석하는 능력', 'khả năng phân tích thành phần và chất lượng'],
    ['E', '새로운 제품을 기획하는 도전 정신', 'tinh thần thử thách khi phát triển sản phẩm mới']),

  // ── R · I · A
  major('건축공학', 'Kỹ thuật kiến trúc',
    ['R', '건물을 실제로 짓는 시공 경험', 'kinh nghiệm thi công công trình thực tế'],
    ['I', '구조와 재료에 대한 분석', 'việc phân tích kết cấu và vật liệu'],
    ['A', '공간에 대한 미적 감각', 'cảm quan thẩm mỹ về không gian']),
  major('게임콘텐츠', 'Nội dung game',
    ['I', '게임 시스템을 설계하는 논리력', 'tư duy logic khi thiết kế hệ thống game'],
    ['A', '세계관과 캐릭터를 상상하는 창의력', 'óc sáng tạo về thế giới và nhân vật'],
    ['R', '직접 개발하고 테스트하는 실행력', 'khả năng tự phát triển và thử nghiệm']),

  // ── A · R · C
  major('건축학', 'Kiến trúc',
    ['A', '창의적인 공간 설계', 'thiết kế không gian sáng tạo'],
    ['C', '도면·계획·규정의 체계적인 관리', 'quản lý bản vẽ, kế hoạch và quy định một cách có hệ thống'],
    ['R', '실제 공간과 구조를 다루는 일', 'làm việc với không gian và kết cấu thực tế']),
  major('산업디자인', 'Thiết kế công nghiệp',
    ['A', '제품의 형태를 새롭게 구상하는 창의력', 'óc sáng tạo khi hình dung kiểu dáng sản phẩm'],
    ['R', '모형과 시제품을 직접 만드는 일', 'tự tay làm mô hình và sản phẩm mẫu'],
    ['C', '치수와 생산 기준을 정확히 맞추는 꼼꼼함', 'sự tỉ mỉ khi tuân theo kích thước và tiêu chuẩn sản xuất']),
  searchAs(major('인테리어디자인', 'Thiết kế nội thất',
    ['A', '공간 분위기를 연출하는 감각', 'cảm quan tạo không khí cho không gian'],
    ['R', '자재와 시공을 직접 다루는 일', 'làm việc trực tiếp với vật liệu và thi công'],
    ['C', '예산과 일정의 체계적인 관리', 'quản lý ngân sách và tiến độ có hệ thống']), '인테리어디자인', '실내건축', '실내건축디자인', '실내디자인'),
  major('조경학', 'Kiến trúc cảnh quan',
    ['A', '자연과 어우러지는 경관 디자인', 'thiết kế cảnh quan hài hòa với thiên nhiên'],
    ['R', '식물과 야외 현장을 다루는 일', 'làm việc với cây xanh và hiện trường ngoài trời'],
    ['C', '설계도와 시공 계획의 정확한 관리', 'quản lý chính xác bản vẽ và kế hoạch thi công']),

  // ── R · A · E
  searchAs(major('조리외식', 'Ẩm thực - Dịch vụ ăn uống',
    ['R', '직접 요리하는 손재주', 'sự khéo tay khi trực tiếp nấu ăn'],
    ['A', '맛과 플레이팅의 창의성', 'sự sáng tạo về hương vị và cách trình bày'],
    ['E', '외식 사업을 운영하는 경영 감각', 'tư duy kinh doanh khi vận hành nhà hàng']), '외식조리', '호텔외식조리', '호텔조리'),
  major('패션디자인', 'Thiết kế thời trang',
    ['A', '개성 있는 스타일을 만드는 감각', 'cảm quan tạo phong cách cá tính'],
    ['R', '원단과 의상을 직접 제작하는 일', 'tự tay làm việc với vải và may trang phục'],
    ['E', '트렌드를 읽고 브랜드를 키우는 추진력', 'khả năng nắm bắt xu hướng và phát triển thương hiệu']),
  searchAs(major('영화·영상', 'Điện ảnh - Sản xuất video',
    ['A', '이야기를 영상으로 표현하는 창의력', 'óc sáng tạo khi kể chuyện bằng hình ảnh'],
    ['R', '촬영·편집 장비를 다루는 기술', 'kỹ thuật sử dụng thiết bị quay và dựng phim'],
    ['E', '제작팀을 이끄는 리더십', 'khả năng dẫn dắt ê-kíp sản xuất']), '영화', '영화영상', '영상'),

  // ── R · A · S
  major('작업치료학', 'Hoạt động trị liệu',
    ['S', '일상 회복을 돕는 마음', 'mong muốn giúp người bệnh trở lại cuộc sống thường ngày'],
    ['R', '손과 도구를 활용한 치료 활동', 'hoạt động trị liệu bằng tay và dụng cụ'],
    ['A', '치료 활동을 창의적으로 구성하는 능력', 'khả năng thiết kế hoạt động trị liệu sáng tạo']),
  searchAs(major('뷰티·미용', 'Làm đẹp',
    ['A', '개성 있는 스타일을 연출하는 감각', 'cảm quan tạo phong cách cá tính'],
    ['R', '손으로 직접 시술하는 기술', 'kỹ năng thực hành trực tiếp bằng tay'],
    ['S', '고객을 배려하는 서비스 정신', 'tinh thần phục vụ chu đáo khách hàng']), '뷰티케어', '뷰티산업', '뷰티아트', '미용예술'),

  // ── R · S · E
  major('스포츠과학', 'Khoa học thể thao',
    ['R', '몸을 직접 움직이는 활동', 'các hoạt động vận động cơ thể'],
    ['S', '다른 사람의 건강을 돕는 지도', 'việc hướng dẫn giúp người khác khỏe mạnh'],
    ['E', '목표를 세우고 도전하는 태도', 'thái độ đặt mục tiêu và thử thách']),
  major('스포츠경영', 'Quản trị thể thao',
    ['E', '스포츠 산업을 이끄는 경영 감각', 'tư duy kinh doanh trong ngành thể thao'],
    ['R', '현장 중심의 활동적인 성향', 'tính cách năng động, thích làm việc tại hiện trường'],
    ['S', '선수·팬과 소통하는 능력', 'khả năng giao tiếp với vận động viên và người hâm mộ']),

  // ── R · S · C
  major('경찰행정학', 'Cảnh sát - Hành chính',
    ['S', '시민을 보호하고 돕는 마음', 'mong muốn bảo vệ và giúp đỡ người dân'],
    ['R', '현장에서 직접 움직이는 활동성', 'sự năng động khi hành động tại hiện trường'],
    ['C', '법과 규정을 정확히 지키는 태도', 'thái độ tuân thủ chính xác pháp luật và quy định']),
  major('응급구조학', 'Cấp cứu y tế',
    ['R', '응급 장비를 다루는 실무 능력', 'kỹ năng sử dụng thiết bị cấp cứu'],
    ['S', '위급한 사람을 돕는 사명감', 'tinh thần trách nhiệm giúp người gặp nguy hiểm'],
    ['C', '정해진 응급 절차의 정확한 수행', 'việc thực hiện chính xác quy trình cấp cứu']),

  // ── R · E · C
  searchAs(major('물류유통', 'Logistics - Chuỗi cung ứng',
    ['C', '재고와 일정의 체계적인 관리', 'quản lý hàng tồn kho và lịch trình có hệ thống'],
    ['E', '유통 흐름을 조율하는 추진력', 'năng lực điều phối dòng lưu thông hàng hóa'],
    ['R', '물류 현장과 운송을 다루는 실무', 'công việc thực tế tại kho bãi và vận chuyển']), '물류', '국제물류', '유통물류'),
  major('부동산학', 'Bất động sản',
    ['E', '거래를 성사시키는 협상력', 'khả năng đàm phán để chốt giao dịch'],
    ['C', '계약과 법규의 꼼꼼한 확인', 'việc kiểm tra cẩn thận hợp đồng và luật lệ'],
    ['R', '건물과 토지를 직접 살펴보는 현장 감각', 'cảm quan thực địa khi trực tiếp khảo sát nhà đất']),

  // ── I · A · S
  major('심리학', 'Tâm lý học',
    ['S', '사람의 마음에 대한 관심', 'sự quan tâm đến tâm lý con người'],
    ['I', '행동을 분석하는 탐구심', 'tinh thần nghiên cứu, phân tích hành vi'],
    ['A', '사람을 다양하게 이해하는 열린 시각', 'góc nhìn cởi mở để hiểu con người theo nhiều cách']),
  major('상담심리', 'Tư vấn tâm lý',
    ['S', '고민을 들어주고 돕는 공감 능력', 'khả năng đồng cảm, lắng nghe và hỗ trợ'],
    ['A', '감정을 섬세하게 읽는 감수성', 'sự nhạy cảm khi thấu hiểu cảm xúc'],
    ['I', '문제의 원인을 깊이 이해하는 분석력', 'khả năng phân tích để hiểu sâu nguyên nhân vấn đề']),
  major('문예창작', 'Sáng tác văn học',
    ['A', '글로 표현하는 창의력', 'óc sáng tạo khi thể hiện bằng ngôn từ'],
    ['S', '사람과 삶에 대한 공감', 'sự đồng cảm với con người và cuộc sống'],
    ['I', '주제를 깊이 탐구하는 태도', 'thái độ tìm hiểu sâu một chủ đề']),

  // ── I · A · C
  searchAs(major('디지털미디어디자인', 'Thiết kế truyền thông số',
    ['A', '디지털 화면을 구상하는 창의력', 'óc sáng tạo khi thiết kế cho màn hình số'],
    ['I', '사용자와 기술에 대한 이해', 'hiểu biết về người dùng và công nghệ'],
    ['C', '디자인 규칙을 일관되게 지키는 꼼꼼함', 'sự tỉ mỉ khi giữ quy tắc thiết kế nhất quán']), '디지털미디어디자인', '미디어디자인'),
  searchAs(major('문화유산', 'Di sản văn hóa',
    ['I', '역사와 유물을 연구하는 탐구심', 'tinh thần nghiên cứu lịch sử và hiện vật'],
    ['A', '예술 작품을 이해하는 미적 감각', 'cảm quan thẩm mỹ để hiểu tác phẩm nghệ thuật'],
    ['C', '기록과 보존 절차의 정확한 수행', 'việc thực hiện chính xác quy trình ghi chép và bảo quản']), '문화유산', '문화재'),

  // ── I · A · E
  major('디지털콘텐츠', 'Nội dung số',
    ['A', '새로운 콘텐츠 아이디어', 'ý tưởng nội dung mới'],
    ['E', '프로젝트를 기획하고 이끄는 추진력', 'năng lực lên kế hoạch và dẫn dắt dự án'],
    ['I', '트렌드와 시장을 분석하는 능력', 'khả năng phân tích xu hướng và thị trường']),
  searchAs(major('창업(앙트러프러너십)', 'Khởi nghiệp',
    ['E', '새로운 사업에 도전하는 추진력', 'tinh thần dám thử thách với việc kinh doanh mới'],
    ['A', '남다른 아이디어', 'những ý tưởng khác biệt'],
    ['I', '시장과 고객을 분석하는 능력', 'khả năng phân tích thị trường và khách hàng']), '앙트러프러너십'),

  // ── I · S · E
  major('법학', 'Luật học',
    ['E', '논리적으로 주장하고 설득하는 능력', 'khả năng lập luận và thuyết phục'],
    ['I', '법 조문을 분석하는 사고력', 'tư duy phân tích các điều luật'],
    ['S', '사람들의 권리를 지키려는 마음', 'mong muốn bảo vệ quyền lợi của mọi người']),
  major('정치외교학', 'Chính trị - Ngoại giao',
    ['E', '협상하고 이끄는 리더십', 'khả năng lãnh đạo và đàm phán'],
    ['S', '다양한 사람과 소통하는 능력', 'khả năng giao tiếp với nhiều người khác nhau'],
    ['I', '국제 정세를 분석하는 시각', 'góc nhìn phân tích tình hình quốc tế']),

  // ── I · S · C
  major('약학', 'Dược học',
    ['I', '약의 성분과 효과에 대한 탐구', 'việc tìm hiểu thành phần và tác dụng của thuốc'],
    ['C', '정확한 조제와 기준 준수', 'pha chế chính xác và tuân thủ tiêu chuẩn'],
    ['S', '환자의 건강을 돕는 상담', 'việc tư vấn giúp bệnh nhân khỏe mạnh']),
  major('보건행정학', 'Quản lý y tế',
    ['C', '의료 정보와 제도의 체계적인 관리', 'quản lý thông tin và chế độ y tế có hệ thống'],
    ['S', '사람들의 건강을 돕는 일', 'công việc hỗ trợ sức khỏe cộng đồng'],
    ['I', '보건 데이터를 분석하는 능력', 'khả năng phân tích dữ liệu y tế']),
  major('문헌정보학', 'Thông tin - Thư viện',
    ['C', '정보를 분류하고 정리하는 능력', 'khả năng phân loại và sắp xếp thông tin'],
    ['I', '자료를 찾아 탐색하는 탐구심', 'tinh thần tìm kiếm, khám phá tài liệu'],
    ['S', '이용자에게 필요한 정보를 안내하는 서비스', 'việc hướng dẫn thông tin cho người dùng']),

  // ── I · E · C
  major('경제학', 'Kinh tế học',
    ['I', '경제 현상을 분석하는 사고력', 'tư duy phân tích các hiện tượng kinh tế'],
    ['E', '시장과 기업에 대한 관심', 'sự quan tâm đến thị trường và doanh nghiệp'],
    ['C', '통계와 수치를 정확히 다루는 능력', 'khả năng xử lý chính xác số liệu thống kê']),
  major('데이터사이언스', 'Khoa học dữ liệu',
    ['I', '데이터 속 의미를 찾는 분석력', 'khả năng phân tích để tìm ý nghĩa trong dữ liệu'],
    ['C', '데이터를 정확하게 정리하는 꼼꼼함', 'sự tỉ mỉ khi sắp xếp dữ liệu chính xác'],
    ['E', '분석 결과로 의사결정을 이끄는 능력', 'khả năng dùng kết quả phân tích để dẫn dắt quyết định']),
  major('회계학', 'Kế toán',
    ['C', '숫자와 장부를 정확히 관리하는 능력', 'khả năng quản lý chính xác số liệu và sổ sách'],
    ['E', '기업 경영에 대한 이해', 'hiểu biết về quản trị doanh nghiệp'],
    ['I', '재무 자료를 분석하는 능력', 'khả năng phân tích báo cáo tài chính']),
  major('금융', 'Tài chính - Ngân hàng',
    ['E', '투자와 기회를 판단하는 감각', 'sự nhạy bén khi đánh giá đầu tư và cơ hội'],
    ['C', '금융 데이터의 정확한 관리', 'việc quản lý chính xác dữ liệu tài chính'],
    ['I', '시장 흐름을 분석하는 능력', 'khả năng phân tích biến động thị trường']),
  major('경영정보', 'Hệ thống thông tin quản lý',
    ['C', '업무 정보를 체계적으로 관리하는 능력', 'khả năng quản lý thông tin công việc có hệ thống'],
    ['I', 'IT 시스템에 대한 이해', 'hiểu biết về hệ thống CNTT'],
    ['E', '기업 문제를 해결하는 실행력', 'năng lực giải quyết vấn đề của doanh nghiệp']),

  // ── A · S · E
  major('미디어커뮤니케이션', 'Truyền thông',
    ['A', '메시지를 창의적으로 표현하는 능력', 'khả năng thể hiện thông điệp một cách sáng tạo'],
    ['E', '여론을 이끄는 영향력', 'sức ảnh hưởng để dẫn dắt dư luận'],
    ['S', '대중과 소통하는 능력', 'khả năng giao tiếp với công chúng']),
  major('문화콘텐츠', 'Nội dung văn hóa',
    ['A', '문화를 콘텐츠로 만드는 창의력', 'óc sáng tạo biến văn hóa thành nội dung'],
    ['S', '사람들이 즐길 경험을 만드는 공감', 'sự thấu hiểu để tạo trải nghiệm cho mọi người'],
    ['E', '기획과 홍보를 이끄는 추진력', 'năng lực dẫn dắt khâu lên kế hoạch và quảng bá']),
  searchAs(major('연극·뮤지컬', 'Sân khấu - Nhạc kịch',
    ['A', '무대 위의 표현력', 'khả năng biểu diễn trên sân khấu'],
    ['S', '관객과 교감하는 능력', 'khả năng kết nối với khán giả'],
    ['E', '무대에 서는 자신감', 'sự tự tin khi đứng trên sân khấu']), '연극', '연극영화', '뮤지컬'),
  major('교육학', 'Giáo dục học',
    ['S', '가르치고 성장을 돕는 일', 'việc giảng dạy và giúp người khác phát triển'],
    ['A', '수업을 재미있게 구성하는 창의력', 'óc sáng tạo khi thiết kế bài học thú vị'],
    ['E', '학생들을 이끄는 리더십', 'khả năng dẫn dắt học sinh']),
  major('한국어교육', 'Giảng dạy tiếng Hàn',
    ['S', '외국인 학습자를 돕는 마음', 'mong muốn hỗ trợ người học nước ngoài'],
    ['A', '언어와 문화를 전달하는 표현력', 'khả năng truyền đạt ngôn ngữ và văn hóa'],
    ['E', '수업을 주도하는 진행력', 'khả năng chủ động điều hành lớp học']),
  major('광고홍보', 'Quảng cáo & Quan hệ công chúng',
    ['E', '사람들을 설득하는 능력', 'khả năng thuyết phục mọi người'],
    ['A', '눈길을 끄는 아이디어', 'những ý tưởng thu hút sự chú ý'],
    ['S', '소비자와 소통하는 능력', 'khả năng giao tiếp với người tiêu dùng']),

  // ── A · S · C
  major('영어통번역', 'Biên - Phiên dịch tiếng Anh',
    ['S', '사람 사이의 소통을 돕는 일', 'việc giúp mọi người giao tiếp với nhau'],
    ['A', '언어를 자연스럽게 표현하는 감각', 'cảm quan diễn đạt ngôn ngữ tự nhiên'],
    ['C', '원문을 정확하게 옮기는 꼼꼼함', 'sự tỉ mỉ khi chuyển ngữ chính xác']),
  major('유아교육', 'Giáo dục mầm non',
    ['S', '아이들을 돌보고 가르치는 마음', 'mong muốn chăm sóc và dạy dỗ trẻ'],
    ['A', '놀이와 활동을 창의적으로 만드는 능력', 'khả năng sáng tạo trò chơi và hoạt động'],
    ['C', '교육 계획과 관찰 기록의 체계적인 관리', 'quản lý có hệ thống kế hoạch giảng dạy và ghi chép quan sát']),

  // ── A · E · C
  searchAs(major('마케팅', 'Marketing',
    ['E', '시장을 공략하는 전략', 'chiến lược chinh phục thị trường'],
    ['A', '브랜드를 매력적으로 표현하는 창의력', 'óc sáng tạo khi thể hiện thương hiệu hấp dẫn'],
    ['C', '판매 데이터를 체계적으로 관리하는 능력', 'khả năng quản lý dữ liệu bán hàng có hệ thống']), '유통마케팅', '국제마케팅', '마케팅경영'),
  major('시각디자인', 'Thiết kế đồ họa',
    ['A', '시각적으로 표현하는 감각', 'cảm quan thể hiện bằng hình ảnh'],
    ['C', '레이아웃과 디자인 규칙을 정확히 지키는 꼼꼼함', 'sự tỉ mỉ khi tuân thủ bố cục và quy tắc thiết kế'],
    ['E', '브랜드 메시지를 전달하는 설득력', 'khả năng truyền tải thông điệp thương hiệu']),

  // ── S · E · C
  major('경영학', 'Quản trị kinh doanh',
    ['E', '조직을 이끄는 리더십', 'khả năng lãnh đạo tổ chức'],
    ['C', '업무와 자원의 체계적인 관리', 'quản lý công việc và nguồn lực có hệ thống'],
    ['S', '사람들과 협력하는 능력', 'khả năng hợp tác với mọi người']),
  major('국제통상', 'Thương mại quốc tế',
    ['E', '해외 시장을 개척하는 도전 정신', 'tinh thần thử thách khi mở rộng thị trường nước ngoài'],
    ['C', '무역 서류와 규정의 정확한 처리', 'việc xử lý chính xác chứng từ và quy định thương mại'],
    ['S', '다양한 문화의 사람들과 소통하는 능력', 'khả năng giao tiếp với người từ nhiều nền văn hóa']),
  searchAs(major('호텔관광경영', 'Quản trị du lịch - khách sạn',
    ['E', '서비스 사업을 운영하는 경영 감각', 'tư duy kinh doanh khi vận hành dịch vụ'],
    ['S', '고객을 친절하게 대하는 서비스 정신', 'tinh thần phục vụ khách hàng chu đáo'],
    ['C', '예약과 운영의 체계적인 관리', 'quản lý đặt chỗ và vận hành có hệ thống']), '호텔관광', '호텔관광경영', '관광경영', '호텔경영'),
  major('사회복지학', 'Công tác xã hội',
    ['S', '어려운 이웃을 돕는 마음', 'mong muốn giúp đỡ người gặp khó khăn'],
    ['E', '지원 사업을 추진하는 실행력', 'năng lực triển khai các chương trình hỗ trợ'],
    ['C', '복지 제도와 서류의 꼼꼼한 처리', 'việc xử lý cẩn thận chế độ phúc lợi và hồ sơ']),
  major('행정학', 'Hành chính học',
    ['C', '정책과 제도를 체계적으로 다루는 능력', 'khả năng xử lý chính sách và thể chế có hệ thống'],
    ['E', '조직을 운영하는 관리 능력', 'năng lực quản lý vận hành tổ chức'],
    ['S', '시민을 위한 공공 서비스 정신', 'tinh thần phục vụ cộng đồng']),
  major('항공서비스', 'Dịch vụ hàng không',
    ['S', '승객을 배려하는 서비스 정신', 'tinh thần phục vụ chu đáo hành khách'],
    ['E', '자신감 있는 대인 관계 능력', 'kỹ năng giao tiếp tự tin'],
    ['C', '안전 규정을 정확히 지키는 태도', 'thái độ tuân thủ chính xác quy định an toàn']),
]
