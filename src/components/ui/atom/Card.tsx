'use client';
import { ComponentProps, forwardRef } from 'react';

type CardVariant = 'default' | 'bordered' | 'elevated';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

type CardProps = ComponentProps<'div'> & {
    variant?: CardVariant;
    padding?: CardPadding; // 원자 단계에서는 내부 여백만 제어
    hover?: boolean; // 단순 호버 그림자
    clickable?: boolean; // 커서 포인터 등
    fullWidth?: boolean;
};

export default forwardRef<HTMLDivElement, CardProps>(function Card(
    {
        children,
        className = '',
        variant = 'default',
        padding = 'md',
        hover = false,
        clickable = false,
        fullWidth = false,
        ...rest
    },
    ref,
) {
    const base = 'card bg-base-100';
    const variantCls: Record<CardVariant, string> = {
        default: '',
        bordered: 'border border-base-300',
        elevated: 'shadow-sm',
    };
    const paddingCls: Record<CardPadding, string> = {
        none: '',
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
    };

    const classes = [
        base,
        variantCls[variant],
        hover ? 'hover:shadow-md transition-shadow' : '',
        clickable ? 'cursor-pointer' : '',
        fullWidth ? 'w-full' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div ref={ref} className={classes} {...rest}>
            <div className={`card-body ${paddingCls[padding]}`}>{children}</div>
        </div>
    );
});
