import { createMiddlewareClient } from '@/db/supabase/middleware';
import { NextRequest, NextResponse } from 'next/server';

const protectedPaths = [
    '/',
    '/journal',
    '/moodCalendar',
    '/stat',
    '/write',
    '/setting',
    '/setup-encryption',
    '/unlock',
];
const publicPaths = ['/login', '/auth/callback'];

export async function proxy(req: NextRequest) {
    const res = NextResponse.next();
    const { pathname } = req.nextUrl;
    console.log('running middleware...');
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return res;
    }

    const isProtectedPath = protectedPaths.some(
        (path) => pathname === path || (path !== '/' && pathname.startsWith(path)),
    );

    if (!isProtectedPath) {
        return res;
    }

    const supabase = createMiddlewareClient(req, res);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    const hasEncryptionKey = session.user.user_metadata?.has_encryption_key === true;
    if (!hasEncryptionKey) {
        return NextResponse.redirect(new URL('/setup-encryption', req.url));
    }

    return res;
}

export const config = {
    matcher: [
        '/',
        '/journal/:path*',
        '/moodCalendar/:path*',
        '/stat/:path*',
        '/write/:path*',
        '/login',
    ],
};
