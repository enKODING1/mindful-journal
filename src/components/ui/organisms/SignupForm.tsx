'use client';

import { useState, FormEvent } from 'react';
import EmailField from '../molecules/EmailField';
import PasswordField from '../molecules/PasswordField';
import Input from '../atom/Input';
import Button from '../atom/Button';

export interface SignupFormProps {
    onSubmit?: (email: string, password: string, alias?: string) => void;
    loading?: boolean;
    error?: string;
}

export default function SignupForm({ onSubmit, loading = false, error }: SignupFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alias, setAlias] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        alias: '',
    });

    const validateForm = () => {
        const newErrors = {
            email: '',
            password: '',
            confirmPassword: '',
            alias: '',
        };
        let isValid = true;

        // 이메일 검증
        if (!email.trim()) {
            newErrors.email = '이메일을 입력해주세요';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = '올바른 이메일 형식이 아닙니다';
            isValid = false;
        }

        // 비밀번호 검증
        if (!password) {
            newErrors.password = '비밀번호를 입력해주세요';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = '비밀번호는 6자 이상이어야 합니다';
            isValid = false;
        }

        // 비밀번호 확인 검증
        if (!confirmPassword) {
            newErrors.confirmPassword = '비밀번호를 다시 입력해주세요';
            isValid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (validateForm() && onSubmit) {
            onSubmit(email, password, alias || undefined);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 mb-2">
                <h2 className="text-2xl font-bold">회원가입</h2>
                <p className="text-sm text-neutral-content/70">새 계정을 만드세요</p>
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

                <PasswordField
                    label="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={errors.confirmPassword}
                    inputSize="lg"
                    showToggle={false}
                />

                <div className="flex flex-col gap-2 w-full">
                    <label className="font-medium text-sm">별칭 (선택)</label>
                    <Input
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        placeholder="사용할 별칭을 입력하세요"
                        inputSize="lg"
                        className="w-full"
                    />
                    {errors.alias && <span className="text-error text-sm">{errors.alias}</span>}
                </div>

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
                    {loading ? '가입 중...' : '가입하기'}
                </Button>
            </form>
        </div>
    );
}
