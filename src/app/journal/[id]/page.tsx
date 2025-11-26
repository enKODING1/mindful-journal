'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import JournalDetailView from '@/components/ui/organisms/JournalDetailView';
import Container from '@/components/ui/atom/Container';
import createClient from '@/repositories/supabase/client';
import * as journalService from '@/services/journalService';
import type { Content } from '@/domain/models';

export default function JournalDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [journal, setJournal] = useState<Content | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const fetchJournal = async () => {
            setLoading(true);
            setError(null);
            try {
                const journalId = parseInt(id, 10);
                if (isNaN(journalId)) {
                    throw new Error('잘못된 일기 ID입니다');
                }
                const data = await journalService.getJournalById(supabase, journalId);
                if (!data) {
                    throw new Error('일기를 찾을 수 없습니다');
                }
                setJournal(data);
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : '일기를 불러오는데 실패했습니다';
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchJournal();
    }, [id, supabase]);

    const handleBack = () => {
        router.push('/');
    };

    if (loading) {
        return (
            <Container className="mt-10" variant="base-300" padding="xl" gap="lg" rounded="2xl">
                <div className="text-center py-12">
                    <p className="text-base-content/70">일기를 불러오는 중...</p>
                </div>
            </Container>
        );
    }

    if (error || !journal) {
        return (
            <Container className="mt-10" variant="base-300" padding="xl" gap="lg" rounded="2xl">
                <div className="text-center py-12">
                    <p className="text-error mb-4">{error || '일기를 찾을 수 없습니다'}</p>
                    <button onClick={handleBack} className="btn btn-primary">
                        목록으로 돌아가기
                    </button>
                </div>
            </Container>
        );
    }

    return (
        <div className="mt-10">
            <JournalDetailView journal={journal} onBack={handleBack} />
        </div>
    );
}
