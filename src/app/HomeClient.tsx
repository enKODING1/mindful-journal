'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import JournalList from '@/components/ui/organisms/JournalList';
import Container from '@/components/ui/atom/Container';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { Content } from '@/domain/models';
import Loading from '@/components/ui/atom/Loading';
import createClient from '@/db/supabase/client';
import * as journalService from '@/services/journalService';

const PAGE_SIZE = 7;

interface HomeClientProps {
    initialJournals: Content[];
    initialHasMore: boolean;
}

export default function HomeClient({ initialJournals, initialHasMore }: HomeClientProps) {
    const [journals, setJournals] = useState<Content[]>(initialJournals);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [page, setPage] = useState(0);
    const router = useRouter();
    const supabase = createClient();

    // 더 불러오기 (클라이언트에서만 실행)
    const loadMore = useCallback(async () => {
        if (!hasMore || loading) return;

        setLoading(true);
        try {
            const nextPage = page + 1;
            const offset = nextPage * PAGE_SIZE;
            const data = await journalService.listJournalsByUser(supabase, PAGE_SIZE, offset);

            setJournals((prev) => [...prev, ...data]);
            setPage(nextPage);
            setHasMore(data.length === PAGE_SIZE);
        } catch (err) {
            console.error('Failed to load more journals:', err);
        } finally {
            setLoading(false);
        }
    }, [hasMore, loading, page, supabase]);

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
            {journals.length === 0 && (
                <p className="text-center text-base-content/50 py-12">
                    아직 작성한 일기가 없습니다
                </p>
            )}
        </Container>
    );
}
