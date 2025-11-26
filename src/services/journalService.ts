import * as JournalRepo from '@/repositories/journalRepository';
import * as DomainUtil from '@/domain/utils/';
import { Content, Mood } from '@/domain/models';
import { SupabaseClient } from '@supabase/supabase-js';

export async function listJournalsByUser(supabase: SupabaseClient): Promise<Content[]> {
    return JournalRepo.listJournalsByUser(supabase);
}

export async function getJournalByDate(supabase: SupabaseClient, ymd: string): Promise<Content[]> {
    return JournalRepo.getJournalByDate(supabase, ymd);
}

export async function getJournalById(
    supabase: SupabaseClient,
    id: number,
): Promise<Content | null> {
    return JournalRepo.getJournalById(supabase, id);
}

export async function createJournal(
    supabase: SupabaseClient,
    input: { content: string; mood: Mood },
): Promise<Pick<Content, 'id' | 'created_at'>> {
    // Get current user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('로그인이 필요합니다');
    }

    if (!input.content.trim()) {
        throw new Error('일기 내용을 입력해주세요');
    }

    return JournalRepo.createJournal(supabase, {
        userId: user.id,
        content: input.content,
        mood: input.mood,
    });
}

export function hasWrittenToday(contents: Content[]): boolean {
    return DomainUtil.hasWrittenToday(contents);
}
