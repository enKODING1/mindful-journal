'use client';

import { ComponentProps, useState } from 'react';
import Input from '../atom/Input';
import Button from '../atom/Button';
import { Eye, EyeOff } from 'lucide-react';

export type PasswordFieldProps = Omit<ComponentProps<'input'>, 'type'> & {
    label?: string;
    error?: string;
    variant?:
        | 'neutral'
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'info'
        | 'success'
        | 'warning'
        | 'error';
    inputSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    showToggle?: boolean;
};

export default function PasswordField({
    label = '비밀번호',
    error,
    variant = 'neutral',
    inputSize = 'md',
    showToggle = true,
    className = '',
    ...props
}: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`flex flex-col gap-2 w-full ${className}`}>
            {label && <label className="font-medium text-sm">{label}</label>}
            <div className="relative w-full">
                <Input
                    type={showPassword ? 'text' : 'password'}
                    variant={error ? 'error' : variant}
                    inputSize={inputSize}
                    placeholder="••••••••"
                    className="w-full pr-12"
                    {...props}
                />
                {showToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-content/50 hover:text-neutral-content"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
            {error && <span className="text-error text-sm">{error}</span>}
        </div>
    );
}
