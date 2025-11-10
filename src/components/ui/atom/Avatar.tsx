'use client';

import { LucideProps, LucideIcon, ShieldQuestionMark } from 'lucide-react';
import React, { ComponentProps, ReactElement } from 'react';

// 이미지 or icon, color, soft
export type AvataProps = ComponentProps<'div'> & {
    src?: string;
    icon?: ReactElement;
    size?: 'sm' | 'md' | 'lg';
    fallback?: string;
    rounded?: 'xl' | 'full';
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

export default function Avatar({
    src,
    icon,
    size = 'md',
    rounded = 'full',
    fallback = '?',
    className = '',
    ...props
}: AvataProps) {
    const renderIcon = () => {
        if (!icon) return null;

        if (React.isValidElement(icon)) {
            return React.cloneElement(icon as ReactElement<{ size?: number }>, {
                size: iconSizeMap[size],
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
            className={`flex items-center justify-center ${roundedClasses[rounded]} ${sizeClasses[size]} bg-base-200`}
        >
            {renderIcon()}
        </div>
    ) : (
        <div
            className={`flex items-center justify-center ${roundedClasses[rounded]} ${sizeClasses[size]} bg-base-200`}
        >
            <ShieldQuestionMark size={iconSizeMap[size]} />
        </div>
    );
    return (
        <div className={`avatar ${className}`} {...props}>
            {content}
        </div>
    );
}
