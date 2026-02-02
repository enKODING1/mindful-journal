import { createMiddlewareClient } from '@/db/supabase/middleware';
import { NextRequest, NextResponse } from 'next/server';

const protectedPaths = ['/', '/journal', '/moodCalendar', '/stat', '/write'];
const publicPaths = ['/login', '/auth/callback'];

export async function proxy(req: NextRequest) {
    const res = NextResponse.next();
    const { pathname } = req.nextUrl;

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
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(new URL('/login', req.url));
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
