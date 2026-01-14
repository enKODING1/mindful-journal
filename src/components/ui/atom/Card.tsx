'use client';

import { ComponentProps } from 'react';

export type CardProps = ComponentProps<'div'> & {
    variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'error' | 'warning' | 'success';
    borderStyle?: 'border' | 'dash';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    side?: boolean;
    imageFull?: boolean;
};

const variantClasses = {
    primary: 'bg-primary-content ',
    secondary: 'bg-secondary-content',
    accent: 'bg-accent-content',
    neutral: 'bg-neutral-content',
    error: 'bg-error-content',
    warning: 'bg-warning-content',
    success: 'bg-success-content',
};

const borderStyleClasses = {
    border: 'card-border',
    dash: 'card-dash',
};

const sizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
};

export default function Card({
    variant,
    borderStyle,
    size,
    side = false,
    imageFull = false,
    className = '',
    children,
    ...props
}: CardProps) {
    const variantClass = variant ? variantClasses[variant] : '';
    const borderStyleClass = borderStyle ? borderStyleClasses[borderStyle] : '';
    const sizeClass = size ? sizeClasses[size] : '';
    const sideClass = side ? 'card-side' : '';
    const imageFullClass = imageFull ? 'image-full' : '';

    const classes =
        `card w-full ${variantClass} ${borderStyleClass} ${sizeClass} ${sideClass} ${imageFullClass} ${className}`.trim();

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
}
