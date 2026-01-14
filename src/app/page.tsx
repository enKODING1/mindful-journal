'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import JournalList from '@/components/ui/organisms/JournalList';
import Container from '@/components/ui/atom/Container';
import { useJournals } from '@/hooks';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { Content } from '@/domain/models';
import Loading from '@/components/ui/atom/Loading';

export default function Home() {
    const { journals, loading, hasMore, fetchJournalsPaginated, loadMore } = useJournals();
    const router = useRouter();

    // 초기 로드
    useEffect(() => {
        fetchJournalsPaginated(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 무한 스크롤 콜백
    const handleIntersect = useCallback(() => {
        if (!loading && hasMore) {
            loadMore();
        }
    }, [loading, hasMore, loadMore]);

    // Intersection Observer
    const { targetRef } = useIntersectionObserver(handleIntersect, {
        threshold: 0.1,
        rootMargin: '50px',
    });

    const handleJournalClick = (journal: Content) => {
        router.push(`/journal/${journal.id}`);
    };

    return (
        <Container className="mt-10" variant="base-300" padding="xl" gap="lg" rounded="2xl">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">내 일기</h1>
            </div>

            <JournalList journals={journals} onJournalClick={handleJournalClick} />

            {/* Intersection Observer 센티넬 */}
            {hasMore && (
                <div ref={targetRef} className="flex justify-center py-4">
                    {loading && (
                        <div className="flex flex-col items-center gap-2">
                            <Loading />
                            <p className="text-base-content/70">일기를 불러오는 중...</p>
                        </div>
                    )}
                </div>
            )}

            {/* 더 이상 불러올 일기가 없을 때 */}
            {!hasMore && journals.length > 0 && (
                <p className="text-center text-base-content/50 py-4">모든 일기를 불러왔습니다</p>
            )}

            {/* 일기가 하나도 없을 때 */}
            {!loading && journals.length === 0 && (
                <p className="text-center text-base-content/50 py-12">
                    아직 작성한 일기가 없습니다
                </p>
            )}
        </Container>
    );
}
