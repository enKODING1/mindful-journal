'use client';

import { ComponentProps } from 'react';

export type AlertProps = ComponentProps<'div'> & {
    variant?: 'outline' | 'dash' | 'soft';
    color?: 'info' | 'success' | 'warning' | 'error';
    direction?: 'vertical' | 'horizontal';
};

const variantClasses = {
    outline: 'alert-outline',
    dash: 'alert-dash',
    soft: 'alert-soft',
};

const colorClasses = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error',
};

const directionClasses = {
    vertical: 'alert-vertical',
    horizontal: 'alert-horizontal',
};

export default function Alert({
    variant,
    color = 'info',
    direction,
    className = '',
    ...props
}: AlertProps) {
    const variantClass = variant ? variantClasses[variant] : '';
    const colorClass = colorClasses[color];
    const directionClass = direction ? directionClasses[direction] : '';

    const classes = `alert ${variantClass} ${colorClass} ${directionClass} ${className}`.trim();

    return (
        <div role="alert" className={classes} {...props}>
            {props.children}
        </div>
    );
}
