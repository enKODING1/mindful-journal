'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import createClient from '@/repositories/supabase/client';
import * as journalService from '@/services/journalService';
import { Content, Mood } from '@/domain/models';

export function useJournals() {
    const [journals, setJournals] = useState<Content[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    // 일기 목록 가져오기
    const fetchJournals = async () => {
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
    };

    // 일기 생성
    const createJournal = async (content: string, mood: Mood) => {
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
    };

    return {
        journals,
        loading,
        error,
        fetchJournals,
        createJournal,
    };
}
