import { SupabaseClient } from '@supabase/supabase-js';
import { Profile } from '@/store/models';
import { UnauthorizedError, NotFoundError } from '@/store/errors';

// 현재 로그인 사용자의 프로필 가져오기
export async function getMyProfile(supabase: SupabaseClient): Promise<Profile> {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new UnauthorizedError();

    const { data, error } = await supabase.from('profiles').select('*').single();
    if (error) throw error;
    if (!data) throw new NotFoundError('프로필');
    return data as Profile;
}

// 현재 로그인 사용자의 프로필 없으면 생성
export async function ensureMyProfile(supabase: SupabaseClient): Promise<Profile> {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new UnauthorizedError();

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

// 프로필 업데이트(부분 업데이트)
export async function updateMyProfile(
    supabase: SupabaseClient,
    payload: Partial<Pick<Profile, 'alias' | 'email' | 'gender'>>,
): Promise<Profile> {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new UnauthorizedError();

    const { data, error } = await supabase
        .from('profiles')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .select('*')
        .single();

    if (error) throw error;
    return data as Profile;
}
