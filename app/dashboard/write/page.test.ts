import { redirect } from 'next/navigation';
import createClient from '../../utils/supabase/server';
import WritePage from './page';

// Mock 설정
jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

jest.mock('../../utils/supabase/server');

// Global fetch mock
global.fetch = jest.fn();

// Mock 객체들
const mockRedirect = redirect as jest.MockedFunction<typeof redirect>;
const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;

// Supabase mock 설정
const mockLimit = jest.fn();
const mockLt = jest.fn(() => ({ limit: mockLimit }));
const mockGte = jest.fn(() => ({ lt: mockLt }));
const mockEq = jest.fn(() => ({ gte: mockGte }));
const mockSelect = jest.fn(() => ({ eq: mockEq }));
const mockFrom = jest.fn(() => ({ select: mockSelect }));

const mockSupabaseClient = {
    auth: {
        getUser: jest.fn(),
    },
    from: mockFrom,
};

// Mock 함수들을 올바르게 설정
mockCreateClient.mockResolvedValue(mockSupabaseClient as any);

describe('WritePage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // redirect가 호출되면 에러를 throw하도록 설정
        mockRedirect.mockImplementation((url: string) => {
            throw new Error(`REDIRECT_TO:${url}`);
        });
    });

    it('유저가 로그인되어있지 않으면 로그인 페이지로 리다이렉트 한다.', async () => {
        // Given: 사용자가 로그인되어 있지 않은 상태
        mockSupabaseClient.auth.getUser.mockResolvedValue({
            data: { user: null },
            error: null,
        });

        // When & Then: WritePage에 접근할 때 redirect가 호출되어야 함
        await expect(WritePage()).rejects.toThrow('REDIRECT_TO:/auth/');
        expect(mockRedirect).toHaveBeenCalledWith('/auth/login');
    });

    it('오늘 일기가 이미 작성되어있다면 홈으로 리다이렉트 한다.', async () => {
        // Given: 사용자가 로그인되어 있고, 오늘 이미 일기를 작성한 상태
        mockSupabaseClient.auth.getUser.mockResolvedValue({
            data: { user: { id: 'user1' } },
            error: null,
        });

        // Supabase 쿼리 체이닝 mock
        const mockQuery = {
            data: [{ id: '1' }], // 이미 작성된 일기가 있음
            error: null,
        };

        mockLimit.mockResolvedValue(mockQuery);

        // When & Then: WritePage에 접근할 때 redirect가 호출되어야 함
        await expect(WritePage()).rejects.toThrow(
            'REDIRECT_TO:/dashboard/home?message=already_written',
        );
        expect(mockRedirect).toHaveBeenCalledWith('/dashboard/home?message=already_written');
    });

    it('오늘 일기가 작성되어있지 않다면 일기작성을 허용한다.', async () => {
        // Given: 사용자가 로그인되어 있고, 오늘 일기를 작성하지 않은 상태
        mockSupabaseClient.auth.getUser.mockResolvedValue({
            data: { user: { id: 'user1' } },
            error: null,
        });

        // Supabase 쿼리 체이닝 mock
        const mockQuery = {
            data: [], // 작성된 일기가 없음
            error: null,
        };

        mockLimit.mockResolvedValue(mockQuery);

        // When: WritePage에 접근할 때
        const result = await WritePage();

        // Then: 리다이렉트되지 않고 페이지가 렌더링되어야 함
        expect(mockRedirect).not.toHaveBeenCalled();
        expect(result).toBeDefined();
    });
});
