'use client';

import Image from 'next/image';
import { Mood, getMoodImage, getMoodLabel } from '@/domain/models';

export interface JournalCardProps {
    date: string;
    dayOfWeek?: string;
    title: string;
    content: string;
    mood: Mood;
    onClick?: () => void;
    className?: string;
}

export default function JournalCard({
    date,
    dayOfWeek,
    title,
    content,
    mood,
    onClick,
    className = '',
}: JournalCardProps) {
    return (
        <article
            onClick={onClick}
            className={`
                group cursor-pointer p-5
                bg-base-100 rounded-xl
                border border-base-200
                hover:border-base-300 hover:shadow-sm
                transition-all duration-200
                ${className}
            `}
        >
            {/* 상단: 날짜 & 기분 */}
            <div className="flex items-center justify-between mb-3">
                <time className="text-sm text-base-content/50">
                    {date}일 {dayOfWeek && `(${dayOfWeek})`}
                </time>
                <div className="flex items-center gap-1.5">
                    <Image
                        src={getMoodImage(mood)}
                        alt={mood}
                        width={16}
                        height={16}
                        className="opacity-80"
                    />
                    <span className="text-xs text-base-content/50">{getMoodLabel(mood)}</span>
                </div>
            </div>

            {/* 제목 */}
            <h3 className="font-medium text-base-content mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                {title}
            </h3>

            {/* 미리보기 */}
            {content && (
                <p className="text-sm text-base-content/60 line-clamp-2 leading-relaxed">
                    {content}
                </p>
            )}
        </article>
    );
}
