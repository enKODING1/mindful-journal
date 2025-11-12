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
    xs: 'card-xs',
    sm: 'card-sm',
    md: 'card-md',
    lg: 'card-lg',
    xl: 'card-xl',
};

export default function Card({
    variant,
    borderStyle,
    size = 'md',
    side = false,
    imageFull = false,
    className = '',
    ...props
}: CardProps) {
    const variantClass = variant ? variantClasses[variant] : '';
    const borderStyleClass = borderStyle ? borderStyleClasses[borderStyle] : '';
    const sizeClass = sizeClasses[size];
    const sideClass = side ? 'card-side' : '';
    const imageFullClass = imageFull ? 'image-full' : '';

    const classes =
        `card ${variantClass} ${borderStyleClass} ${sizeClass} ${sideClass} ${imageFullClass} ${className}`.trim();

    return <div className={classes} {...props} />;
}
