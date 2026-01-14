'use client';
import { ComponentProps } from 'react';

export type ContainerProps = ComponentProps<'div'> & {
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full' | 'none';
    padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'none';
    variant?: 'base-100' | 'base-200' | 'base-300' | 'primary' | 'secondary' | 'accent' | 'neutral';
    centered?: boolean;
};

const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-full',
    none: '',
};

const paddingClasses = {
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
    none: '',
};

const gapClasses = {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
    none: '',
};

const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
    none: '',
};

const variantClasses = {
    'base-100': 'bg-base-100',
    'base-200': 'bg-base-200',
    'base-300': 'bg-base-300',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    neutral: 'bg-neutral',
};

export default function Container({
    maxWidth = '2xl',
    padding = 'md',
    gap = 'md',
    rounded = '2xl',
    variant = 'base-300',
    centered = true,
    className = '',
    children,
    ...props
}: ContainerProps) {
    const maxWidthClass = maxWidthClasses[maxWidth];
    const paddingClass = paddingClasses[padding];
    const gapClass = gapClasses[gap];
    const roundedClass = roundedClasses[rounded];
    const variantClass = variantClasses[variant];
    const centeredClass = centered ? 'mx-auto' : '';

    const classes =
        `flex flex-col ${variantClass} ${roundedClass} ${maxWidthClass} ${centeredClass} ${paddingClass} ${gapClass} ${className}`.trim();

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
}
