import createServerClient from '@/db/supabase/server';
import * as JournalService from '@/services/journalService';
import JournalDetailClient from './JournalDetailClient';

interface JournalDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function JournalDetailPage({ params }: JournalDetailPageProps) {
    const { id } = await params;
    const journalId = parseInt(id, 10);

    if (isNaN(journalId)) {
        return <JournalDetailClient journal={null} error="잘못된 일기 ID입니다" />;
    }

    try {
        const supabase = await createServerClient();
        const journal = await JournalService.getJournalById(supabase, journalId);

        if (!journal) {
            return <JournalDetailClient journal={null} error="일기를 찾을 수 없습니다" />;
        }

        return <JournalDetailClient journal={journal} />;
    } catch {
        return <JournalDetailClient journal={null} error="일기를 불러오는데 실패했습니다" />;
    }
}
