import { SupabaseClient } from '@supabase/supabase-js';
import { Profile } from '@/domain/models';
import { NotFoundError } from '@/domain/errors';

export async function getMyProfile(supabase: SupabaseClient): Promise<Profile> {
    const { data, error } = await supabase.from('profiles').select('*').single();
    if (error) throw error;
    if (!data) throw new NotFoundError('프로필');
    return data as Profile;
}

export async function ensureMyProfile(
    supabase: SupabaseClient,
    user: { id: string; email?: string },
): Promise<Profile> {
    const { data, error } = await supabase.from('profiles').select('*').single();
    if (!error && data) return data as Profile;

    const { data: created, error: insertError } = await supabase
        .from('profiles')
        .insert({
            user_id: user.id,
            email: user.email,
            alias: 'anonymous',
        })
        .select('*')
        .single();

    if (insertError) throw insertError;
    return created as Profile;
}

export async function updateMyProfile(
    supabase: SupabaseClient,
    userId: string,
    payload: Partial<Pick<Profile, 'alias' | 'email' | 'avatar_url'>>,
): Promise<Profile> {
    const { data, error } = await supabase
        .from('profiles')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('user_id', userId)
        .select('*')
        .single();

    if (error) throw error;
    return data as Profile;
}
