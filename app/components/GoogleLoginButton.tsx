'use client';

import createClient from '@/app/utils/supabase/client';

export default function GoogleLoginButton() {
    const supabase = createClient();

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (error) {
            console.error('Error logging in with Google:', error);
        }
    };

    return <button onClick={handleLogin}>구글로 로그인</button>;
}
