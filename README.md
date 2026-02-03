# 마음챙김일기

매일의 감정과 생각을 기록하고 돌아보는 마음챙김 일기 앱입니다.

## 주요 기능

- **일기 작성** - AI 질문을 통한 가이드 일기 작성
- **일기 목록** - 작성한 일기 목록 조회 및 무한 스크롤
- **통계** - 일기 작성 패턴 및 감정 분석 통계
- **기분 캘린더** - 날짜별 기분 변화 시각화
- **암호화** - 종단간 암호화로 작성 외 열람 불가

## 기술 스택

| 분류           | 기술                      |
| -------------- | ------------------------- |
| Framework      | Next.js 16, React 19      |
| Language       | TypeScript                |
| Styling        | Tailwind CSS 4, DaisyUI 5 |
| Backend        | Supabase (Auth, Database) |
| AI             | Google Generative AI      |
| Testing        | Vitest, Playwright        |
| UI Development | Storybook                 |

## 시작하기

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id
GEMINI_API_KEY=your_gemini_api_key
```

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### 기타 명령어

```bash
# 린트 검사
npm run lint

# 린트 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format

# Storybook 실행
npm run storybook
```

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── (auth)/login/       # 로그인
│   ├── journal/[id]/       # 일기 상세
│   ├── moodCalendar/       # 기분 캘린더
│   ├── setting/            # 설정
│   ├── setup-encryption/   # 암호화 설정
│   ├── stat/               # 통계
│   ├── unlock/             # 잠금 해제
│   └── write/              # 일기 작성
├── components/             # UI 컴포넌트
│   └── ui/
│       ├── atom/           # 원자 컴포넌트
│       ├── molecules/      # 분자 컴포넌트
│       └── organisms/      # 유기체 컴포넌트
├── contexts/               # React Context
├── db/                     # 데이터베이스 설정
├── domain/                 # 도메인 모델
├── hooks/                  # 커스텀 훅
├── lib/                    # 유틸리티 함수
├── services/               # 비즈니스 로직
└── stories/                # Storybook 스토리
```
