import { NextResponse } from 'next/server';
import createClient from '@/app/utils/supabase/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');

    let next = searchParams.get('next') ?? '/';
    if (!next.startsWith('/')) {
        next = '/';
    }

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            // 환경변수로 기본 URL 설정
            const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || origin;
            return NextResponse.redirect(`${baseUrl}${next}`);
        }
    }

    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
