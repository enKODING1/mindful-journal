'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import createClient from '@/repositories/supabase/client';
import * as authService from '@/services/authService';

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const router = useRouter();
    const supabase = createClient();

    // 이메일/비밀번호 로그인
    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(undefined);
        try {
            await authService.loginWithPassword(supabase, { email, password });
            router.push('/');
            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : '로그인에 실패했습니다';
            setError(message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // 회원가입
    const signUp = async (email: string, password: string, alias?: string) => {
        setLoading(true);
        setError(undefined);
        try {
            await authService.signUp(supabase, { email, password, alias });
            router.push('/');
            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : '회원가입에 실패했습니다';
            setError(message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // 구글 로그인
    const loginWithGoogle = async () => {
        setLoading(true);
        setError(undefined);
        try {
            await authService.loginWithGoogle(supabase);
            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : '구글 로그인에 실패했습니다';
            setError(message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // 로그아웃
    const logout = async () => {
        setLoading(true);
        setError(undefined);
        try {
            await authService.signOut(supabase);
            router.push('/(auth)');
            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : '로그아웃에 실패했습니다';
            setError(message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        login,
        signUp,
        loginWithGoogle,
        logout,
    };
}
