'use client';

import { useState, FormEvent } from 'react';
import EmailField from '../molecules/EmailField';
import PasswordField from '../molecules/PasswordField';
import Button from '../atom/Button';
import Container from '../atom/Container';

export interface LoginFormProps {
    onSubmit?: (email: string, password: string) => void;
    loading?: boolean;
    error?: string;
}

export default function LoginForm({ onSubmit, loading = false, error }: LoginFormProps) {
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
        <Container variant="base-300" padding="xl" gap="md" rounded="2xl" centered={false}>
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
        </Container>
    );
}
