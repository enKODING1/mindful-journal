'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import createClient from '@/db/supabase/client';
import * as authService from '@/services/authService';

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const router = useRouter();
    const supabase = createClient();

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
        loginWithGoogle,
        logout,
    };
}
