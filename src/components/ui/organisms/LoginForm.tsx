'use client';

import { useState, FormEvent } from 'react';
import EmailField from '../molecules/EmailField';
import PasswordField from '../molecules/PasswordField';
import Button from '../atom/Button';

export interface LoginFormProps {
    onSubmit?: (email: string, password: string) => void;
    onGoogleLogin?: () => void;
    loading?: boolean;
    error?: string;
}

export default function LoginForm({
    onSubmit,
    onGoogleLogin,
    loading = false,
    error,
}: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateForm = () => {
        const newErrors = { email: '', password: '' };
        let isValid = true;

        if (!email.trim()) {
            newErrors.email = '이메일을 입력해주세요';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = '올바른 이메일 형식이 아닙니다';
            isValid = false;
        }

        if (!password) {
            newErrors.password = '비밀번호를 입력해주세요';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = '비밀번호는 6자 이상이어야 합니다';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (validateForm() && onSubmit) {
            onSubmit(email, password);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 mb-2">
                <h2 className="text-2xl font-bold">로그인</h2>
                <p className="text-sm text-neutral-content/70">계정에 로그인하세요</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <EmailField
                    label="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    inputSize="lg"
                />

                <PasswordField
                    label="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    inputSize="lg"
                />

                {error && (
                    <div className="bg-error/10 text-error p-3 rounded-lg text-sm">{error}</div>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? '로그인 중...' : '로그인'}
                </Button>
            </form>

            {/* 구분선 */}
            <div className="flex items-center gap-4 my-2">
                <div className="flex-1 border-t border-base-content/20"></div>
                <span className="text-sm text-base-content/50">또는</span>
                <div className="flex-1 border-t border-base-content/20"></div>
            </div>

            {/* 구글 로그인 */}
            <Button
                type="button"
                variant="ghost"
                size="lg"
                className="w-full border border-base-content/20"
                onClick={onGoogleLogin}
                disabled={loading}
            >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                </svg>
                구글로 로그인
            </Button>
        </div>
    );
}
