# Mindful Journal (마음챙김 일기)

> 종단간 암호화(E2EE)를 통해 누구도 열어볼 수 없는 안전한 공간에서 감정을 기록하고 돌아보는 일기 앱

<br>
<p>
  <img width="350" alt="mindful-journal" src="./docs/mindful-journal.gif" />
</p>
<br>

## 주요 기능

- **가이드 질문 일기 작성** — 질문으로 글쓰기 유도
- **AI 공감 한마디** — 복호화된 본문을 Gemini로 전송, 응답도 암호화하여 저장
- **감정 통계** — 연속 기록, 평균 글자수, 감정 분포, 월별 추이
- **기분 캘린더** — 날짜별 기분 시각화

## 설계 및 기술적 특징

### 1. 보안 및 암호화

<img width="780" alt="e2ee-small" src="./docs/e2ee-small-architecture.png" /><br>
<a href="./docs/e2ee-architecture.png">E2EE 세부 동작 다이어그램 보기</a>

- **종단간 암호화 (E2EE)**
    - 모든 일기 데이터는 브라우저 환경에서 암호화된 후 서버로 전송됩니다. 데이터베이스에는 암호문만 저장되므로 서버 관리자도 원문을 읽을 수 없습니다.
- **DEK/KEK 엔벨로프(Envelope) 암호화 패턴**
    - 사용자의 비밀번호로 도출된 KEK(Key Encryption Key)로, 실제 데이터를 암호화하는 DEK(Data Encryption Key)를 암호화하여 보관합니다.
    - 이 구조를 통해 비밀번호를 변경할 때 기존에 작성한 일기 전체를 재암호화할 필요 없이, 암호화된 DEK만 갱신하여 처리 비용을 최소화했습니다.

### 2. 아키텍처

<img width="780" alt="아키텍처" src="./docs/project-architecture.png" /><br>

- **레이어드 아키텍처**
    - `Domain` / `Service` / `Repository` 계층으로 책임을 분리하여 뷰 레이어에서의 데이터베이스 직접 접근을 차단했습니다.
- **아토믹 디자인 (Atomic Design Pattern)**
    - UI 컴포넌트를 `Atom`, `Molecule`, `Organism` 단위로 나누어 설계했습니다.

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
