import * as JournalRepo from '@/db/journal';
import * as DomainUtil from '@/domain/utils/';
import { Content, Mood, Question } from '@/domain/models';
import { SupabaseClient } from '@supabase/supabase-js';

export async function listJournalsByUser(
    supabase: SupabaseClient,
    limit?: number,
    offset?: number,
): Promise<Content[]> {
    return JournalRepo.listJournalsByUser(supabase, limit, offset);
}

export async function getJournalByDate(supabase: SupabaseClient, ymd: string): Promise<Content[]> {
    return JournalRepo.getJournalByDate(supabase, ymd);
}

export async function getJournalById(
    supabase: SupabaseClient,
    id: string,
): Promise<Content | null> {
    return JournalRepo.getJournalById(supabase, id);
}

export async function createJournal(
    supabase: SupabaseClient,
    input: {
        content: { iv: string; data: string };
        mood: Mood;
        questionId?: number;
        date?: string;
    },
): Promise<Pick<Content, 'id' | 'created_at'>> {
    // Get current user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('로그인이 필요합니다');
    }

    if (!input.content) {
        throw new Error('일기 내용을 입력해주세요');
    }

    return JournalRepo.createJournal(supabase, {
        userId: user.id,
        content: input.content,
        mood: input.mood,
        questionId: input.questionId,
        date: input.date,
    });
}

export function hasWrittenToday(contents: Content[]): boolean {
    return DomainUtil.hasWrittenToday(contents);
}

export async function countJournalsByUser(supabase: SupabaseClient): Promise<number> {
    return JournalRepo.countJournalsByUser(supabase);
}

export async function getNextQuestion(supabase: SupabaseClient): Promise<Question | null> {
    return JournalRepo.getNextQuestion(supabase);
}

export async function addComment(
    supabase: SupabaseClient,
    input: { contentId: string; body: string; type?: 'AI' | 'USER' },
): Promise<void> {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('로그인이 필요합니다');
    }

    return JournalRepo.addComment(supabase, {
        contentId: input.contentId,
        body: input.body,
        userId: user.id,
        type: input.type,
    });
}
