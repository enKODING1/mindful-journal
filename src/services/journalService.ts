import * as JournalRepo from '@/repositories/journalRepository';
import * as DomainUtil from '@/store/utils/';
import { Content } from '@/store/models';
import { SupabaseClient } from '@supabase/supabase-js';

export async function listJournalsByUser(supabase: SupabaseClient): Promise<Content[]> {
    return JournalRepo.listJournalsByUser(supabase);
}

export async function getJournalByDate(supabase: SupabaseClient, ymd: string): Promise<Content[]> {
    return JournalRepo.getJournalByDate(supabase, ymd);
}

export function hasWrittenToday(contents: Content[]): boolean {
    return DomainUtil.hasWrittenToday(contents);
}
