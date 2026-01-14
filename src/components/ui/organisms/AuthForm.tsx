'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Container from '../atom/Container';
import TabGroup from '../molecules/TabGroup';

type AuthMode = 'login' | 'signup';

export interface AuthFormProps {
    onLogin?: (email: string, password: string) => void;
    onSignup?: (email: string, password: string, alias?: string) => void;
    onGoogleLogin?: () => void;
    loading?: boolean;
    error?: string;
}

const authTabs = [
    { label: '로그인', value: 'login' },
    { label: '회원가입', value: 'signup' },
];

export default function AuthForm({
    onLogin,
    onSignup,
    onGoogleLogin,
    loading,
    error,
}: AuthFormProps) {
    const [mode, setMode] = useState<AuthMode>('login');

    return (
        <Container variant="base-200" padding="xl" gap="lg" rounded="2xl" centered={false}>
            {/* 탭 헤더 - TabGroup molecule 사용 */}
            <TabGroup
                items={authTabs}
                defaultValue={mode}
                onChange={(value) => setMode(value as AuthMode)}
            />

            {/* 폼 컨텐츠 */}
            <Container variant="base-200" padding="none" gap="none" rounded="none" centered={false}>
                {mode === 'login' ? (
                    <LoginForm
                        onSubmit={onLogin}
                        onGoogleLogin={onGoogleLogin}
                        loading={loading}
                        error={error}
                    />
                ) : (
                    <SignupForm onSubmit={onSignup} loading={loading} error={error} />
                )}
            </Container>
        </Container>
    );
}
