# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mindful Journal (마음챙김일기) is a journaling app built with Next.js that emphasizes privacy through end-to-end encryption. Users write guided journal entries, track mood patterns, and receive AI-generated comments on their entries.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm lint

# Auto-fix linting issues
npm lint:fix

# Format code with Prettier
npm run format

# Run tests (both unit and Storybook component tests)
npm test  # Note: No dedicated test script exists; use vitest directly
npx vitest  # Run all tests with Vitest
npx vitest --run  # Run tests once and exit

# Run tests for unit tests only
npx vitest run src/**/*.test.ts

# Start Storybook UI development environment
npm run storybook

# Build Storybook for deployment
npm build-storybook
```

## Technology Stack

- **Framework**: Next.js 16, React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4, DaisyUI 5
- **Backend**: Supabase (Auth + Database)
- **AI**: Google Generative AI (Gemini)
- **Testing**: Vitest (unit + browser tests), Playwright
- **UI Component Development**: Storybook 10

## Architecture

### Core Concepts

**End-to-End Encryption**: All journal content is encrypted client-side using the Web Crypto API before being sent to the database. Only encrypted content (IV + encrypted data in Base64) is stored.

**Three-Layer Architecture**:

- **Domain Layer** (`src/domain/`): Models (Content, Mood, Comment, Question) and domain utilities
- **Service Layer** (`src/services/`): Business logic that bridges UI and database (journalService, authService, profileService)
- **Repository Layer** (`src/db/`): Direct Supabase database queries

### Key Architectural Patterns

**Protected Routes**: Middleware in `src/proxy.ts` enforces:

1. Authentication requirement (redirect to `/login` if no user)
2. Encryption key setup requirement (redirect to `/setup-encryption` if no encryption key exists)

**Encryption Flow**:

- Users create a password during setup (`/setup-encryption`)
- Password → salt → derive encryption key via PBKDF2 (600,000 iterations, SHA-256)
- Key used for AES-GCM encryption/decryption of journal content
- Encrypted data structure: `{ iv: string; data: string }` (Base64 encoded)

**Data Model - Content**:

```typescript
{
  id: string;
  created_at: string;
  content: { iv: string; data: string };  // Encrypted journal text
  decryptedContent?: string;  // Client-side only after decryption
  mood: Mood;  // Emotional state
  question_id?: number;  // Reference to AI guidance question
  ai_comments?: AIComment[];  // Encrypted AI-generated comments
}
```

### Directory Structure

- `src/app/` - Next.js App Router pages
    - `(auth)/login` - Authentication entry point
    - `write/` - Journal entry creation with AI guidance
    - `journal/[id]/` - Single journal detail view
    - `moodCalendar/` - Visual mood tracking
    - `stat/` - Analytics and mood statistics
    - `setup-encryption/` - First-time encryption setup
    - `unlock/` - Master key entry for decryption
    - `setting/` - User settings
- `src/components/ui/` - Reusable UI components organized by atomic design
    - `atom/` - Basic elements (buttons, inputs, etc.)
    - `molecules/` - Component combinations
    - `organisms/` - Complex page sections
- `src/services/` - Business logic service layer
- `src/db/` - Database queries and Supabase client setup
- `src/domain/` - Core data models, errors, and utilities
- `src/lib/` - Utility functions
    - `crypto.ts` - Encryption/decryption functions (uses Web Crypto API)
    - `encryption-setup.ts` - Master key generation and password hashing
- `src/contexts/` - React Context providers
- `src/hooks/` - Custom React hooks
- `src/stories/` - Storybook component examples (excluded from linting)

## Testing

**Test Structure**:

- Unit tests: `src/**/*.test.ts`
- Storybook component tests: Configured via Storybook addon-vitest
- Browser tests: Uses Playwright (Vitest browser mode)

**Running Tests**:

- `npx vitest` - Interactive watch mode
- `npx vitest --run` - Single run
- `npx vitest run src/lib/crypto.test.ts` - Specific test file

**Key Test Example**: `src/lib/crypto.test.ts` demonstrates encryption/decryption flow and key derivation

## Important Implementation Details

### Encryption & Security

- **PBKDF2** for key derivation: 600,000 iterations (OWASP recommended)
- **AES-GCM** for authenticated encryption (prevents tampering)
- **Web Crypto API** used exclusively (browser-native, no external crypto libraries)
- Encrypted data never travels unencrypted over the network

### AI Integration

- Gemini API calls handled through server-side proxy (`src/proxy.ts`)
- AI comments are encrypted before storage using the same master key as journals
- Model version tracked for potential versioning/rollback

### Component System

Uses atomic design pattern (atoms → molecules → organisms) organized in `src/components/ui/`

### Linting & Code Quality

- ESLint with Next.js recommended rules and TypeScript support
- Prettier for code formatting
- Pre-commit hooks via Husky run ESLint and Prettier on staged files
- Storybook stories (`src/stories/`) are excluded from linting (intentional)

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_GA_MEASUREMENT_ID
GEMINI_API_KEY
```

## Common Development Patterns

**Using Supabase in Components**:

```typescript
const supabase = createClient();
const {
    data: { user },
} = await supabase.auth.getUser();
```

**Encryption Flow in Services**:

1. Get encryption key from React Context or re-derive from password
2. Use `encryptText()` before sending to database
3. Use `decryptText()` after retrieving from database

**Service Layer Pattern**:

- Services wrap database queries and add business logic
- Always check authentication before modifying data
- Pass SupabaseClient as parameter for testability
