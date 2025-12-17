'use client';

import { useEffect, useState } from 'react';
import JournalForm from '@/components/ui/organisms/JournalForm';
import Container from '@/components/ui/atom/Container';
import Alert from '@/components/ui/atom/Alert';
import JournalCalendar from '@/components/ui/organisms/JournalCalendar';
import { useJournals } from '@/hooks';
import { Mood } from '@/domain/models';

export default function Write() {
    const { createJournal, loading, error, hasWrittenTodayCheck, fetchJournals } = useJournals();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // 페이지 로드 시 일기 목록 가져오기 (오늘 작성 여부 체크용)
    useEffect(() => {
        fetchJournals();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (content: string, mood: Mood) => {
        const success = await createJournal(content, mood);
        if (success) {
            setSuccessMessage('오늘의 이야기를 보관했어요!');
            setTimeout(() => setSuccessMessage(null), 2000);
        }
    };

    if (hasWrittenTodayCheck) {
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
            <p>하루중 기억하고 싶은 순간은 무엇인가요?</p>

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
