'use client';

import Image from 'next/image';
import Button from '../atom/Button';
import { getMoodImage, getMoodLabel } from '@/domain/models';
import type { Content } from '@/domain/models';

export interface JournalDetailViewProps {
    journal: Content;
    onBack?: () => void;
}

const formatFullDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
};

export default function JournalDetailView({ journal, onBack }: JournalDetailViewProps) {
    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            {/* 뒤로가기 */}
            {onBack && (
                <Button variant="ghost" onClick={onBack} className="mb-8 -ml-2">
                    ← 목록으로
                </Button>
            )}

            {/* 날짜 & 기분 */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-xl font-medium text-base-content/90">
                    {formatFullDate(journal.created_at)}
                </h1>
                <div className="flex items-center gap-2">
                    <Image
                        src={getMoodImage(journal.mood)}
                        alt={journal.mood}
                        width={28}
                        height={28}
                    />
                    <span className="text-sm text-base-content/60">
                        {getMoodLabel(journal.mood)}
                    </span>
                </div>
            </div>

            {/* 일기 내용 */}
            <div className="mb-12">
                <p className="text-base-content leading-relaxed whitespace-pre-wrap">
                    {journal.content}
                </p>
            </div>

            {/* AI 피드백 */}
            {journal.comments && journal.comments.length > 0 && (
                <div className="mt-12 pt-8 border-t border-base-300">
                    <div className="flex items-center gap-2 mb-4 text-base-content/50">
                        <span>🤖</span>
                        <span className="text-sm">마음챙김봇</span>
                    </div>
                    {journal.comments.map((comment) => (
                        <p
                            key={comment.id}
                            className="text-base-content/70 leading-relaxed whitespace-pre-wrap"
                        >
                            {comment.comment_body}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
