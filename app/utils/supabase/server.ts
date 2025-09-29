import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function createClient() {
    const cookieStore = await cookies();

    console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        // Server Action에서는 쿠키 설정 허용
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options);
                        });
                    } catch {
                        // 일반 서버 컴포넌트에서는 쿠키 설정 실패 시 무시
                        console.log('Cookie setting skipped in server component');
                    }
                },
            },
        },
    );
}
