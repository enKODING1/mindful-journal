'use client';

import { useState } from 'react';
import JournalForm from '@/components/ui/organisms/JournalForm';
import Container from '@/components/ui/atom/Container';
import Alert from '@/components/ui/atom/Alert';
import { useJournals } from '@/hooks';
import { Mood } from '@/domain/models';

export default function Write() {
    const { createJournal, loading, error } = useJournals();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (content: string, mood: Mood) => {
        const success = await createJournal(content, mood);
        if (success) {
            setSuccessMessage('오늘의 이야기를 보관했어요!');
            setTimeout(() => setSuccessMessage(null), 2000);
        }
    };

    return (
        <Container className="mt-10" variant="base-300" padding="xl" gap="md" rounded="2xl">
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
        </Container>
    );
}
