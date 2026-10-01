# Holland Test (Holland RIASEC 전공 추천)

Frontend 전용 (React 19 + Vite + TypeScript, 추가 라이브러리 없음).
화면 오른쪽 위 토글로 한국어 / 베트남어 중 하나를 선택해 표시합니다 (기본: 한국어, 테스트 도중 전환해도 응답 유지).
백엔드·DB·개인정보 저장·서버 전송·localStorage·URL 파라미터 사용 없음. 새로고침 시 처음부터 다시 시작.

## 실행
```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # dist/ 에 정적 파일 생성 → 아무 정적 호스팅에 업로드 가능
```

## 구조
```
src/
  components/ui/            재사용 UI: Button, Card, ProgressBar
  features/holland/
    MiniHollandTest.tsx     단계 관리 (intro → test → result), 상태는 메모리에만
    components/             IntroStep, TestStep, ResultStep, LanguageToggle
    i18n.ts                 언어 타입(ko/vi) + 화면 고정 문구(UI) 사전
    data/questions.ts       24문항 (KO/VI) + 1~5점 척도
    data/hollandTypes.ts    6유형 설명(KO/VI) + 추천 전공(정적 데이터)
    data/majors.ts          통합 추천용 전공 목록: 전공별 관련 유형(중요도 순) + 유형별 추천 이유
    data/traits.ts          "나의 Holland 특징" 문장 조각 (유형별 lead/middle/tail)
    lib/scoring.ts          점수 합산, 정렬, Top 3 코드 생성
    lib/recommend.ts        Top 3 조합 기반 전공 추천 (활용 유형 수 → 점수 가중합 순)
    holland.css             기능 전용 스타일
  index.css                 디자인 토큰 + 공통 UI 스타일
```

## 계산 규칙
- 유형별 4문항 합산 (4~20점)
- 점수 내림차순 → 동점이면 R → I → A → S → E → C 고정 순서
- 상위 3개 = Holland Code (예: EAS)

## 기존 프로젝트에 붙일 때
`src/features/holland/` 와 `src/components/ui/` 를 복사하고, 원하는 라우트에서 `<MiniHollandTest />` 를 렌더링하면 됩니다.
기존 프로젝트에 Button/Card/ProgressBar 가 있으면 import 경로만 바꿔 교체하세요.
