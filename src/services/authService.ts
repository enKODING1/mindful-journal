import { SupabaseClient } from '@supabase/supabase-js';
import * as AuthRepo from '@/db/auth';

export async function loginWithGoogle(supabase: SupabaseClient) {
    const redirectTo = `${window.location.origin}/auth/callback?next=`;
    return AuthRepo.loginWithGoogle(supabase, redirectTo);
}

export async function signOut(supabase: SupabaseClient) {
    return AuthRepo.signOut(supabase);
}
