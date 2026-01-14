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
                await journalService.createJournal(supabase, {
                    content,
                    mood,
                    questionId: question?.id,
                });
                setSuccessMessage('오늘의 이야기를 보관했어요!');
                setTimeout(() => setSuccessMessage(null), 2000);
                router.refresh();
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
