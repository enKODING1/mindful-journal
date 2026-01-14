import createServerClient from '@/db/supabase/server';
import * as journalService from '@/services/journalService';
import StatClient from './StatClient';

export default async function StatPage() {
    const supabase = await createServerClient();
    const journals = await journalService.listJournalsByUser(supabase);

    return <StatClient initialJournals={journals} />;
}
