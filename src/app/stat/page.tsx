import createServerClient from '@/db/supabase/server';
import * as journalService from '@/services/journalService';
import StatClient from './StatClient';

export default async function StatPage() {
    const supabase = await createServerClient();
    const journalStat = await journalService.getJournalStat(supabase, '2026-01-27');
    return <StatClient initialJournals={journalStat} />;
}
