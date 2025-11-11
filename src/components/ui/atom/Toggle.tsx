'use client';

import { ComponentProps, forwardRef } from 'react';

export type ToggleProps = Omit<ComponentProps<'input'>, 'type' | 'size'> & {
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
    neutral: 'toggle-neutral',
    primary: 'toggle-primary',
    secondary: 'toggle-secondary',
    accent: 'toggle-accent',
    success: 'toggle-success',
    warning: 'toggle-warning',
    info: 'toggle-info',
    error: 'toggle-error',
};

const sizeClasses = {
    xs: 'toggle-xs',
    sm: 'toggle-sm',
    md: 'toggle-md',
    lg: 'toggle-lg',
    xl: 'toggle-xl',
};

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
    ({ color = 'primary', size = 'md', className = '', ...props }, ref) => {
        const colorClass = colorClasses[color];
        const sizeClass = sizeClasses[size];

        const classes = `toggle ${colorClass} ${sizeClass} ${className}`.trim();

        return <input type="checkbox" ref={ref} className={classes} {...props} />;
    },
);

Toggle.displayName = 'Toggle';

export default Toggle;
