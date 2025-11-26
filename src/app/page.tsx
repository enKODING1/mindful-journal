'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import JournalList from '@/components/ui/organisms/JournalList';
import Container from '@/components/ui/atom/Container';
import { useJournals } from '@/hooks';
import type { Content } from '@/domain/models';

export default function Home() {
    const { journals, loading, error, fetchJournals } = useJournals();
    const router = useRouter();

    useEffect(() => {
        fetchJournals();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleJournalClick = (journal: Content) => {
        router.push(`/journal/${journal.id}`);
    };

    return (
        <Container className="mt-10" variant="base-300" padding="xl" gap="lg" rounded="2xl">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">내 일기</h1>
            </div>

            {loading && (
                <div className="text-center py-12">
                    <p className="text-base-content/70">일기를 불러오는 중...</p>
                </div>
            )}

            {error && (
                <div className="text-center py-12">
                    <p className="text-error">{error}</p>
                </div>
            )}

            {!loading && !error && (
                <JournalList journals={journals} onJournalClick={handleJournalClick} />
            )}
        </Container>
    );
}
