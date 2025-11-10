'use client';

import { LucideProps, LucideIcon, ShieldQuestionMark } from 'lucide-react';
import React, { ComponentProps, ReactElement } from 'react';

// 이미지 or icon, color, soft
export type AvatarProps = ComponentProps<'div'> & {
    src?: string;
    icon?: ReactElement;
    size?: 'sm' | 'md' | 'lg';
    rounded?: 'xl' | 'full';
    soft?: boolean;
    variant?:
        | 'primary'
        | 'secondary'
        | 'accent'
        | 'success'
        | 'warning'
        | 'error'
        | 'info'
        | 'neutral';
};
const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
};
const roundedClasses = {
    xl: 'rounded-xl',
    full: 'rounded-full',
};
const iconSizeMap = {
    sm: 20,
    md: 28,
    lg: 36,
};
const variantStyles = {
    primary: {
        bg: 'bg-primary/10',
        icon: 'text-primary',
        iconSoft: 'text-primary/70',
    },
    secondary: {
        bg: 'bg-secondary/10',
        icon: 'text-secondary',
        iconSoft: 'text-secondary/70',
    },
    accent: {
        bg: 'bg-accent/10',
        icon: 'text-accent',
        iconSoft: 'text-accent/70',
    },
    success: {
        bg: 'bg-success/10',
        icon: 'text-success',
        iconSoft: 'text-success/70',
    },
    warning: {
        bg: 'bg-warning/10',
        icon: 'text-warning',
        iconSoft: 'text-warning/70',
    },
    error: {
        bg: 'bg-error/10',
        icon: 'text-error',
        iconSoft: 'text-error/70',
    },
    info: {
        bg: 'bg-info/10',
        icon: 'text-info',
        iconSoft: 'text-info/70',
    },
    neutral: {
        bg: 'bg-base-200',
        icon: 'text-base-content',
        iconSoft: 'text-base-content/60',
    },
};
export default function Avatar({
    src,
    icon,
    size = 'md',
    rounded = 'full',
    soft = true,
    className = '',
    variant = 'neutral',
    ...props
}: AvatarProps) {
    const variantStyle = variantStyles[variant];
    const iconColorClass = soft ? 'text-base-content/60' : 'text-base-content';
    const bgClass = variantStyle.bg;

    const renderIcon = () => {
        if (!icon) return null;

        if (React.isValidElement(icon)) {
            return React.cloneElement(icon as ReactElement<{ size?: number; className?: string }>, {
                size: iconSizeMap[size],
                className: variantStyle.iconSoft,
            });
        }
        return icon;
    };

    const content = src ? (
        <img
            src={src}
            alt={'avatar'}
            className={`${roundedClasses[rounded]} ${sizeClasses[size]} object-cover`}
        />
    ) : icon ? (
        <div
            className={`flex items-center justify-center ${roundedClasses[rounded]} ${sizeClasses[size]} ${bgClass}`}
        >
            {renderIcon()}
        </div>
    ) : (
        <div
            className={`flex items-center justify-center ${roundedClasses[rounded]} ${sizeClasses[size]} ${bgClass}`}
        >
            <ShieldQuestionMark size={iconSizeMap[size]} className={variantStyle.iconSoft} />
        </div>
    );
    return (
        <div className={`avatar ${className}`} {...props}>
            {content}
        </div>
    );
}
