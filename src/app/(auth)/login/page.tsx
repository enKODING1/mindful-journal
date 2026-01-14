'use client';

import AuthForm from '@/components/ui/organisms/AuthForm';
import Container from '@/components/ui/atom/Container';
import { useAuth } from '@/hooks';

export default function AuthPage() {
    const { login, signUp, loginWithGoogle, loading, error } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Container
                variant="base-100"
                padding="lg"
                gap="lg"
                rounded="2xl"
                centered={true}
                className="max-w-md w-full"
            >
                {/* <div className="text-center mb-4">
                    <h1 className="text-4xl font-bold mb-2">마음챙김 저널</h1>
                    <p className="text-base-content/70">
                        매일의 생각과 감정을 기록하며
                        <br />
                        마음의 평화를 찾아보세요
                    </p>
                </div> */}

                <AuthForm
                    onLogin={login}
                    onSignup={signUp}
                    onGoogleLogin={loginWithGoogle}
                    loading={loading}
                    error={error}
                />
            </Container>
        </div>
    );
}
