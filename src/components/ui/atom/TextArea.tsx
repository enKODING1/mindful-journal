'use client';
import { ComponentProps } from 'react';

export type TextAreaProps = ComponentProps<'textarea'> & {
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
    neutral: 'textarea-neutral',
    primary: 'textarea-primary',
    secondary: 'textarea-secondary',
    accent: 'textarea-accent',
    info: 'textarea-info',
    success: 'textarea-success',
    warning: 'textarea-warning',
    error: 'textarea-error',
};

const inputSizeClasses = {
    xs: 'textarea-xs',
    sm: 'textarea-sm',
    md: 'textarea-md',
    lg: 'textarea-lg',
    xl: 'textarea-xl',
};

export default function TextArea({
    variant = 'neutral',
    inputSize = 'md',
    activate = true,
    placeholder,
    ...props
}: TextAreaProps) {
    const classes = `textarea ${variantClasses[variant]} ${inputSizeClasses[inputSize]}`;
    const isDisabled = !activate;
    return (
        <textarea
            {...props}
            className={classes}
            placeholder={placeholder}
            disabled={isDisabled}
        ></textarea>
    );
}
