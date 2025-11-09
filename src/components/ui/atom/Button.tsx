'use client';
import { ComponentProps } from 'react';

export type ButtonProps = ComponentProps<'button'> & {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    soft?: boolean;
    onClick?: () => void;
};

export default function Button({
    variant = 'primary',
    size = 'md',
    soft = false,
    className = '',
    ...props
}: ButtonProps) {
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        ghost: 'btn-ghost',
    };

    const sizeClasses = {
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg',
    };

    const softClass = soft ? 'btn-soft' : '';

    const classes =
        `btn ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${softClass}`.trim();

    return (
        <button className={classes} {...props}>
            {props.children}
        </button>
    );
}
