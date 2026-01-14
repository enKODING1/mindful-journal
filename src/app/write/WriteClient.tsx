'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import JournalForm from '@/components/ui/organisms/JournalForm';
import Container from '@/components/ui/atom/Container';
import Alert from '@/components/ui/atom/Alert';
import JournalCalendar from '@/components/ui/organisms/JournalCalendar';
import { Mood, Question } from '@/domain/models';
import createClient from '@/db/supabase/client';
import * as journalService from '@/services/journalService';

interface WriteClientProps {
    hasWrittenToday: boolean;
    question: Question | null;
}

export default function WriteClient({ hasWrittenToday, question }: WriteClientProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);

    const handleSubmit = useCallback(
        async (content: string, mood: Mood) => {
            setLoading(true);
            setError(null);
            try {
                // 1. 일기 저장
                const result = await journalService.createJournal(supabase, {
                    content,
                    mood,
                    questionId: question?.id,
                });

                // 2. Gemini API 호출
                try {
                    const res = await fetch('/api/gemini', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ prompt: content }),
                    });
                    const { text } = await res.json();

                    // 3. AI 댓글 저장
                    if (text) {
                        await journalService.addComment(supabase, {
                            contentId: result.id,
                            body: text,
                            type: 'AI',
                        });
                    }
                } catch {
                    // Gemini 호출 실패해도 일기는 이미 저장됨
                    console.error('Gemini API 호출 실패');
                }

                setSuccessMessage('오늘의 이야기를 보관했어요!');
                // 상세 페이지로 이동
                router.push(`/journal/${result.id}`);
            } catch (err) {
                const message = err instanceof Error ? err.message : '일기 작성에 실패했습니다';
                setError(message);
            } finally {
                setLoading(false);
            }
        },
        [supabase, router, question],
    );

    if (hasWrittenToday) {
        return (
            <Container className="mt-10" variant="base-100" padding="xl" gap="md" rounded="2xl">
                <h2 className="text-2xl font-bold">오늘의 일기</h2>
                <p>오늘의 이야기를 이미 보관했어요!</p>
            </Container>
        );
    }

    return (
        <Container className="mt-10" variant="base-100" padding="xl" gap="md" rounded="2xl">
            <h2 className="text-2xl font-bold">오늘의 일기</h2>
            <p>{question?.question ?? '하루중 기억하고 싶은 순간은 무엇인가요?'}</p>

            {successMessage && (
                <Alert color="success">
                    <span>{successMessage}</span>
                </Alert>
            )}

            {error && (
                <Alert color="error">
                    <span>{error}</span>
                </Alert>
            )}

            <JournalForm
                onSubmit={handleSubmit}
                submitButtonText={loading ? '저장 중...' : '저장'}
            />

            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">일기 작성 캘린더</h3>
                <JournalCalendar />
            </div>
        </Container>
    );
}
