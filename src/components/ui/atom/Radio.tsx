'use client';

import { ComponentProps } from 'react';

export type RadioProps = Omit<ComponentProps<'input'>, 'type' | 'size'> & {
    color?:
        | 'neutral'
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'success'
        | 'warning'
        | 'info'
        | 'error';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const colorClasses = {
    neutral: 'radio-neutral',
    primary: 'radio-primary',
    secondary: 'radio-secondary',
    accent: 'radio-accent',
    success: 'radio-success',
    warning: 'radio-warning',
    info: 'radio-info',
    error: 'radio-error',
};

const sizeClasses = {
    xs: 'radio-xs',
    sm: 'radio-sm',
    md: 'radio-md',
    lg: 'radio-lg',
    xl: 'radio-xl',
};

export default function Radio({
    color = 'primary',
    size = 'md',
    className = '',
    ...props
}: RadioProps) {
    const colorClass = colorClasses[color];
    const sizeClass = sizeClasses[size];

    const classes = `radio ${colorClass} ${sizeClass} ${className}`.trim();

    return <input type="radio" className={classes} {...props} />;
}
