import createClient from '@/app/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return res;
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
