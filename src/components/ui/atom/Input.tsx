'use client';

import { ComponentProps } from 'react';

export type InputProps = ComponentProps<'input'> & {
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
    activate?: boolean;
};

const variantClasses = {
    neutral: 'input-neutral',
    primary: 'input-primary',
    secondary: 'input-secondary',
    accent: 'input-accent',
    info: 'input-info',
    success: 'input-success',
    warning: 'input-warning',
    error: 'input-error',
};

const inputSizeClasses = {
    xs: 'input-xs',
    sm: 'input-sm',
    md: 'input-md',
    lg: 'input-lg',
    xl: 'input-xl',
};

export default function Input({
    variant = 'neutral',
    inputSize = 'md',
    activate = true,
    placeholder,
    ...props
}: InputProps) {
    const classes = `input ${variantClasses[variant]} ${inputSizeClasses[inputSize]}`;
    const isDisabled = !activate;
    return (
        <input
            {...props}
            type="text"
            placeholder={placeholder}
            className={classes}
            disabled={isDisabled}
        />
    );
}
