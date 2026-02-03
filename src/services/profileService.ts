import * as ProfileRepo from '@/db/profile';
import { Profile } from '@/domain/models';
import { SupabaseClient } from '@supabase/supabase-js';

export async function getMyProfile(supabase: SupabaseClient): Promise<Profile> {
    return ProfileRepo.getMyProfile(supabase);
}

export async function ensureMyProfile(supabase: SupabaseClient): Promise<Profile> {
    return ProfileRepo.ensureMyProfile(supabase);
}

export async function updateMyProfile(
    supabase: SupabaseClient,
    payload: Partial<Pick<Profile, 'alias' | 'email' | 'avatar_url'>>,
): Promise<Profile> {
    return ProfileRepo.updateMyProfile(supabase, payload);
}
