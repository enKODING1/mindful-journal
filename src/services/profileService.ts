import * as ProfileRepo from '@/db/profile';
import { Profile } from '@/domain/models';
import { SupabaseClient } from '@supabase/supabase-js';
import { UnauthorizedError } from '@/domain/errors';

export async function getMyProfile(supabase: SupabaseClient): Promise<Profile> {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new UnauthorizedError();

    return ProfileRepo.getMyProfile(supabase);
}

export async function ensureMyProfile(supabase: SupabaseClient): Promise<Profile> {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new UnauthorizedError();

    return ProfileRepo.ensureMyProfile(supabase, { id: user.id, email: user.email });
}

export async function updateMyProfile(
    supabase: SupabaseClient,
    payload: Partial<Pick<Profile, 'alias' | 'email' | 'avatar_url'>>,
): Promise<Profile> {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new UnauthorizedError();

    return ProfileRepo.updateMyProfile(supabase, user.id, payload);
}
