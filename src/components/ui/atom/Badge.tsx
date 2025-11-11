'use client';

import { ComponentProps } from 'react';

export type BadgeProps = ComponentProps<'div'> & {
    variant?: 'outline' | 'dash' | 'soft' | 'ghost';
    color?:
        | 'neutral'
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'info'
        | 'success'
        | 'warning'
        | 'error';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const variantClasses = {
    outline: 'badge-outline',
    dash: 'badge-dash',
    soft: 'badge-soft',
    ghost: 'badge-ghost',
};

const colorClasses = {
    neutral: 'badge-neutral',
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    info: 'badge-info',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
};

const sizeClasses = {
    xs: 'badge-xs',
    sm: 'badge-sm',
    md: 'badge-md',
    lg: 'badge-lg',
    xl: 'badge-xl',
};

export default function Badge({
    variant,
    color = 'primary',
    size = 'md',
    className = '',
    ...props
}: BadgeProps) {
    const variantClass = variant ? variantClasses[variant] : '';
    const colorClass = colorClasses[color];
    const sizeClass = sizeClasses[size];

    const classes = `badge ${variantClass} ${colorClass} ${sizeClass} ${className}`.trim();

    return <div className={classes} {...props} />;
}
