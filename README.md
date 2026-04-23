# 마음챙김일기

서버 관리자도 읽을 수 없는 종단간 암호화 기반 감정 일기 앱. <br>
<img width="350" alt="mindful-journal" src="./docs/mindful-journal.gif" />
<br>

### 기능

- **가이드 질문 일기 작성** — 질문으로 글쓰기 유도
- **AI 공감 한마디** — 복호화된 본문을 Gemini로 전송, 응답도 암호화하여 저장
- **감정 통계** — 연속 기록, 평균 글자수, 감정 분포, 월별 추이
- **기분 캘린더** — 날짜별 기분 시각화

## 주요 특징

### 아키텍처

<img width="780" alt="아키텍처" src="./docs/project-architecture.png" /><br>

- **3-Layer** — Domain / Service / Repository 분리로 암호화 책임 경계 명확화
- **Atomic Design** — atom / molecule / organism UI 구조

### 보안 / 암호화

<img width="780" alt="e2ee-small" src="./docs/e2ee-small-architecture.png" /><br>
<a href="./docs/e2ee-architecture.png"> 세부 다이어그램 보기</a>

- **종단간 암호화 (E2EE)** — 일기 본문이 서버로 전송되기 전 브라우저에서 암호화, DB에는 암호문만 저장
- **DEK/KEK 엔벨로프 구조** — 비밀번호(KEK)로 실제 암호화 키(DEK)를 감싸 보관 → 비밀번호 변경 시 전체 데이터 재암호화 불필요

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
