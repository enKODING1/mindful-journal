'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import createClient from '@/db/supabase/client';
import * as journalService from '@/services/journalService';
import { Content, Mood } from '@/domain/models';
import { formatJournalDate } from '@/lib/utils';

export function useJournals() {
    const [journals, setJournals] = useState<Content[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    // supabase 클라이언트 메모이제이션
    const supabase = useMemo(() => createClient(), []);

    // 일기 목록 가져오기
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

    return {
        journals,
        loading,
        error,
        fetchJournals,
        createJournal,
        fetchJournalsByDate,
    };
}
