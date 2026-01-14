'use client';

import { ComponentProps } from 'react';

export type LoadingProps = ComponentProps<'span'> & {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?:
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'neutral'
        | 'info'
        | 'success'
        | 'warning'
        | 'error';
};

const sizeClasses = {
    xs: 'loading-xs',
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
    xl: 'loading-xl',
};

const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    neutral: 'text-neutral',
    info: 'text-info',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
};

export default function Loading({
    size = 'md',
    color = 'primary',
    className = '',
    ...props
}: LoadingProps) {
    const classes =
        `loading loading-ring ${sizeClasses[size]} ${colorClasses[color]} ${className}`.trim();

    return <span className={classes} {...props} />;
}
