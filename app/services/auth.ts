'use server';
import createClient from '@/app/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function getUser() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user;
}

export async function getUserOrRedirect() {
    const user = await getUser();
    if (!user) {
        redirect('/auth/login');
    }
    return user;
}

export async function hasWrittenOn(dateISO: string, userId: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('contents')
        .select('id')
        .eq('user_id', userId)
        .gte('created_at', `${dateISO}T00:00:00`)
        .lt('created_at', `${dateISO}T23:59:59`)
        .limit(1);
    return !!(data && data.length);
}

export async function checkTodayContent() {
    const user = await getUserOrRedirect();
    const today = new Date().toISOString().split('T')[0];

    if (await hasWrittenOn(today, user.id)) {
        redirect('/dashboard/home?message=already_written');
    }
    return true;
}
