'use client';

import Container from '../atom/Container';
import StatCard from './StatCard';
import { Mood, getMoodEmoji } from '@/domain/models';

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
        <Container
            variant="base-100"
            padding="lg"
            gap="none"
            rounded="2xl"
            centered={false}
            className={`cursor-pointer hover:shadow-lg transition-shadow ${className}`}
            onClick={onClick}
        >
            <div className="flex items-center gap-4">
                {/* 왼쪽: 날짜 표시 */}
                <div className="flex-shrink-0">
                    <StatCard
                        title={date}
                        text={dayOfWeek}
                        color="primary"
                        className="min-w-[100px]"
                    />
                </div>

                {/* 중앙: 제목 및 내용 */}
                <div className="flex-1 overflow-hidden min-w-0">
                    <h3 className="text-lg font-semibold mb-1 truncate">{title}</h3>
                    <p className="text-sm text-base-content/70 line-clamp-2">{content}</p>
                </div>

                {/* 오른쪽: 무드 이모지 */}
                <div className="text-4xl flex-shrink-0">{getMoodEmoji(mood)}</div>
            </div>
        </Container>
    );
}
