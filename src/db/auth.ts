import { SupabaseClient } from '@supabase/supabase-js';

export async function getUser(supabase: SupabaseClient) {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) throw error;
    return user;
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
