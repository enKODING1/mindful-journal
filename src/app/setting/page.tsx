import createServerClient from '@/db/supabase/server';
import * as profileService from '@/services/profileService';
import SettingClient from './SettingClient';

export default async function SettingPage() {
    const supabase = await createServerClient();
    const profile = await profileService.ensureMyProfile(supabase);

    return <SettingClient profile={profile} />;
}
