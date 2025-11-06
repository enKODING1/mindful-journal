'use client';
import { ComponentProps, forwardRef } from 'react';

type ButtonProps = ComponentProps<'button'> & {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
};

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
        children,
        className = '',
        variant = 'primary',
        size = 'md',
        loading = false,
        disabled,
        type = 'button',
        ...rest
    },
    ref,
) {
    const baseClasses = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : ''}`;
    return (
        <button
            ref={ref}
            type={type}
            className={`${baseClasses} ${className}`}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? <span className="loading loading-spinner loading-sm" /> : null}
            {children}
        </button>
    );
});
