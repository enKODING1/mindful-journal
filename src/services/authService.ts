import { SupabaseClient } from '@supabase/supabase-js';
import * as AuthRepo from '@/repositories/authRepository';
import { ValidationError } from '@/domain/errors';

export async function signUp(
    supabase: SupabaseClient,
    input: {
        email: string;
        password: string;
        alias?: string;
    },
) {
    if (!input.email?.trim()) {
        throw new ValidationError('이메일을 입력해주세요');
    }
    if (!input.password || input.password.length < 6) {
        throw new ValidationError('비밀번호는 6자 이상 입력해주세요');
    }

    return AuthRepo.signUp(supabase, {
        email: input.email,
        password: input.password,
        metadata: {
            alias: input.alias,
        },
    });
}

export async function loginWithPassword(
    supabase: SupabaseClient,
    input: {
        email: string;
        password: string;
    },
) {
    if (!input.email && !input.password) {
        throw new ValidationError('아이디 또는 패스워드를 입력해주세요');
    }

    return AuthRepo.loginWithPassword(supabase, {
        email: input.email,
        password: input.password,
    });
}

export async function loginWithGoogle(supabase: SupabaseClient) {
    const redirectTo = `${window.location.origin}/auth/callback?next=/dashboard/home`;
    return AuthRepo.loginWithGoogle(supabase, redirectTo);
}

export async function signOut(supabase: SupabaseClient) {
    return AuthRepo.signOut(supabase);
}
