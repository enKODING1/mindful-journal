'use client';

import Container from '../atom/Container';
import StatCard from '../molecules/StatCard';
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

const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

export default function JournalDetailView({ journal, onBack }: JournalDetailViewProps) {
    return (
        <Container variant="base-300" padding="none" gap="lg" rounded="2xl" className="max-w-3xl">
            {onBack && (
                <Container variant="base-300" padding="lg" gap="none" rounded="none">
                    <Button variant="ghost" onClick={onBack}>
                        ← 돌아가기
                    </Button>
                </Container>
            )}

            <Container variant="base-200" padding="xl" gap="md" rounded="2xl">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold mb-2">
                            {formatFullDate(journal.created_at)}
                        </h1>
                        <p className="text-sm text-base-content/70">
                            {formatTime(journal.created_at)}에 작성
                        </p>
                    </div>

                    <StatCard
                        title={
                            <Image
                                src={getMoodImage(journal.mood)}
                                alt={journal.mood}
                                width={40}
                                height={40}
                                className="w-10 h-10 inline-block"
                            />
                        }
                        text={getMoodLabel(journal.mood)}
                        className="min-w-[120px]"
                    />
                </div>
            </Container>

            <Container variant="base-100" padding="xl" gap="none" rounded="2xl">
                <div className="prose prose-lg max-w-none">
                    <p className="whitespace-pre-wrap text-base-content leading-relaxed">
                        {journal.content}
                    </p>
                </div>
            </Container>

            {/* AI 피드백 섹션 */}
            {journal.comments && journal.comments.length > 0 && (
                <Container variant="base-200" padding="xl" gap="md" rounded="2xl">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        🤖 마음챙김봇의 한마디
                    </h3>
                    {journal.comments.map((comment) => (
                        <p
                            key={comment.id}
                            className="text-base-content/80 leading-relaxed whitespace-pre-wrap"
                        >
                            {comment.comment_body}
                        </p>
                    ))}
                </Container>
            )}
        </Container>
    );
}
