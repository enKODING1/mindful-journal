'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import createClient from '@/db/supabase/client';
import * as journalService from '@/services/journalService';
import { Content, Mood } from '@/domain/models';
import { formatJournalDate } from '@/lib/utils';

const PAGE_SIZE = 7;

export function useJournals() {
    const [journals, setJournals] = useState<Content[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const router = useRouter();
    // supabase 클라이언트 메모이제이션
    const supabase = useMemo(() => createClient(), []);

    // 일기 목록 가져오기 (전체 - 통계용)
    const fetchJournals = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await journalService.listJournalsByUser(supabase);
            setJournals(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : '일기를 불러오는데 실패했습니다';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    // 일기 목록 가져오기 (페이지네이션 - 홈페이지용)
    const fetchJournalsPaginated = useCallback(
        async (pageNum: number = 0) => {
            setLoading(true);
            setError(null);
            try {
                const offset = pageNum * PAGE_SIZE;
                const data = await journalService.listJournalsByUser(supabase, PAGE_SIZE, offset);

                if (pageNum === 0) {
                    setJournals(data);
                } else {
                    setJournals((prev) => [...prev, ...data]);
                }

                setPage(pageNum);
                setHasMore(data.length === PAGE_SIZE);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : '일기를 불러오는데 실패했습니다';
                setError(message);
            } finally {
                setLoading(false);
            }
        },
        [supabase],
    );

    // 더 불러오기
    const loadMore = useCallback(async () => {
        if (!hasMore || loading) return;
        await fetchJournalsPaginated(page + 1);
    }, [hasMore, loading, page, fetchJournalsPaginated]);

    // 일기 생성
    const createJournal = useCallback(
        async (content: string, mood: Mood) => {
            setLoading(true);
            setError(null);
            try {
                await journalService.createJournal(supabase, { content, mood });
                // 성공 후 새로고침 또는 리다이렉트
                router.refresh();
                return true;
            } catch (err) {
                const message = err instanceof Error ? err.message : '일기 작성에 실패했습니다';
                setError(message);
                return false;
            } finally {
                setLoading(false);
            }
        },
        [supabase, router],
    );

    // 특정 날짜 일기
    const fetchJournalsByDate = useCallback(
        async (date: Date) => {
            setLoading(true);
            setError(null);
            try {
                const ymd = formatJournalDate(date);
                const data = await journalService.getJournalByDate(supabase, ymd);
                setJournals(data);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : '일기를 불러오는데 실패했습니다';
                setError(message);
            } finally {
                setLoading(false);
            }
        },
        [supabase],
    );

    // 사용자별 일기 전체 개수
    const countJournalsByUser = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await journalService.countJournalsByUser(supabase);
            setTotalCount(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : '일기를 불러오는데 실패했습니다';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    return {
        journals,
        loading,
        error,
        totalCount,
        hasMore,
        fetchJournals,
        fetchJournalsPaginated,
        loadMore,
        createJournal,
        fetchJournalsByDate,
        countJournalsByUser,
    };
}
