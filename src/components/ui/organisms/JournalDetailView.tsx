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
    // 복호화된 내용 사용 (없으면 빈 문자열)
    const content = journal.decryptedContent ?? '';
    // 질문이 있으면 질문을, 없으면 내용의 첫 줄을 제목으로
    const title = journal.question?.question || content.split('\n')[0] || '';
    // 제목으로 사용한 첫 줄을 제외한 나머지 내용
    const bodyContent = journal.question ? content : content.split('\n').slice(1).join('\n').trim();

    return (
        <article className="max-w-2xl mx-auto px-4 py-8">
            {/* 뒤로가기 */}
            {onBack && (
                <Button variant="ghost" onClick={onBack} className="mb-8 -ml-2">
                    ← 목록으로
                </Button>
            )}

            {/* 헤더 영역 */}
            <header className="mb-10">
                {/* 제목 */}
                {title && (
                    <h1 className="text-2xl md:text-3xl font-semibold text-base-content mb-4 leading-snug">
                        {title}
                    </h1>
                )}

                {/* 메타 정보: 날짜 & 기분 */}
                <div className="flex items-center gap-4 text-sm text-base-content/50">
                    <time>{formatFullDate(journal.created_at)}</time>
                    <span className="text-base-content/20">·</span>
                    <div className="flex items-center gap-1.5">
                        <Image
                            src={getMoodImage(journal.mood)}
                            alt={journal.mood}
                            width={18}
                            height={18}
                        />
                        <span>{getMoodLabel(journal.mood)}</span>
                    </div>
                </div>
            </header>

            {/* 본문 */}
            <section className="prose prose-lg max-w-none">
                <p className="text-base-content/80 leading-relaxed whitespace-pre-wrap text-[17px]">
                    {bodyContent || content}
                </p>
            </section>

            {/* AI 피드백 */}
            {journal.ai_comments && journal.ai_comments.length > 0 && (
                <aside className="mt-16 pt-8 border-t border-base-200">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-base-content/40">🤖</span>
                        <span className="text-xs uppercase tracking-wide text-base-content/40 font-medium">
                            마음챙김봇의 생각
                        </span>
                    </div>
                    {journal.ai_comments.map((comment) => (
                        <p
                            key={comment.id}
                            className="text-base-content/60 leading-relaxed whitespace-pre-wrap text-[15px]"
                        >
                            {comment.decryptedComment}
                        </p>
                    ))}
                </aside>
            )}
        </article>
    );
}
