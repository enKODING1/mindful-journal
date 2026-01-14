import { SupabaseClient } from '@supabase/supabase-js';

export type SignUpMetadata = {
    alias?: string;
    birth?: string; // YYYY-MM-DD 등
    gender?: 'male' | 'female' | 'other' | string;
};

export type SignUpParams = {
    email: string;
    password: string;
    redirectTo?: string; // 이메일 인증 후 이동 URL (선택)
    metadata?: SignUpMetadata;
};

export async function getUser(supabase: SupabaseClient) {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) throw error;
    return user;
}

export async function signUp(
    supabase: SupabaseClient,
    { email, password, redirectTo, metadata }: SignUpParams,
) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: redirectTo,
            data: {
                alias: metadata?.alias,
                birth: metadata?.birth,
                gender: metadata?.gender,
            },
        },
    });
    if (error) throw error;
    return data;
}

export async function loginWithPassword(
    supabase: SupabaseClient,
    { email, password }: { email: string; password: string },
) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;
    return data;
}

export async function loginWithGoogle(supabase: SupabaseClient, redirectTo: string) {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
    });
    if (error) throw error;
}

export async function signOut(supabase: SupabaseClient) {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}
