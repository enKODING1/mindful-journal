import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
            back: jest.fn(),
            forward: jest.fn(),
            refresh: jest.fn(),
        };
    },
    useSearchParams() {
        return new URLSearchParams();
    },
    useParams() {
        return {};
    },
}));

// Mock Supabase
jest.mock('./app/utils/supabase/client', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        auth: {
            getUser: jest.fn(),
            signOut: jest.fn(),
        },
        from: jest.fn(() => ({
            select: jest.fn(() => ({
                eq: jest.fn(() => ({
                    single: jest.fn(),
                    limit: jest.fn(),
                })),
                gte: jest.fn(() => ({
                    lt: jest.fn(() => ({
                        limit: jest.fn(),
                    })),
                })),
                order: jest.fn(() => ({
                    limit: jest.fn(),
                })),
            })),
            insert: jest.fn(() => ({
                select: jest.fn(() => ({
                    single: jest.fn(),
                })),
            })),
            update: jest.fn(() => ({
                eq: jest.fn(),
            })),
        })),
    })),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';
