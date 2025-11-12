'use client';
import type { CardProps } from '@/components/ui/atom/Card';
import Card from '@/components/ui/atom/Card';

export type FeatureCardProps = Omit<CardProps, 'children'> & {
    title?: string;
    text?: string;
    color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'error' | 'warning';
};

const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    neutral: 'text-neutral',
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
};

export default function StatCard({
    title,
    text,
    color,
    className = '',
    ...cardProps
}: FeatureCardProps) {
    const colorClass = color ? colorClasses[color] : '';
    const textClass = `card-title text-4xl ${colorClass}`.trim();
    return (
        <Card className={className} {...cardProps}>
            <div className="card-body items-center text-center">
                {title && <h1 className={textClass}>{title}</h1>}
                {text && <p>{text}</p>}
            </div>
        </Card>
    );
}
