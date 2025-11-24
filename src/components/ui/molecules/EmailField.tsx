'use client';

import { ComponentProps } from 'react';
import Input from '../atom/Input';

export type EmailFieldProps = Omit<ComponentProps<'input'>, 'type'> & {
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
};

export default function EmailField({
    label = '이메일',
    error,
    variant = 'neutral',
    inputSize = 'md',
    className = '',
    ...props
}: EmailFieldProps) {
    return (
        <div className={`flex flex-col gap-2 w-full ${className}`}>
            {label && <label className="font-medium text-sm">{label}</label>}
            <Input
                type="email"
                variant={error ? 'error' : variant}
                inputSize={inputSize}
                placeholder="example@email.com"
                className="w-full"
                {...props}
            />
            {error && <span className="text-error text-sm">{error}</span>}
        </div>
    );
}
