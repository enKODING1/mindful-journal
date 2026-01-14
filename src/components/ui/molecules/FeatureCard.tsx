'use client';
import type { CardProps } from '@/components/ui/atom/Card';
import Card from '@/components/ui/atom/Card';
import Avatar from '@/components/ui/atom/Avatar';
import { ReactElement } from 'react';

export type FeatureCardProps = Omit<CardProps, 'children'> & {
    avatar: ReactElement<typeof Avatar>;
    title?: string;
    text?: string;
};

export default function FeatureCard({
    avatar,
    title,
    text,
    className = '',
    ...cardProps
}: FeatureCardProps) {
    return (
        <Card className={className} {...cardProps}>
            <div className="card-body items-center text-center">
                <figure className="px-10 pt-2">{avatar}</figure>
                {title && <h2 className="card-title">{title}</h2>}
                {text && <p>{text}</p>}
            </div>
        </Card>
    );
}
