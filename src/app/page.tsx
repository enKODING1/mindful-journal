import createServerClient from '@/db/supabase/server';
import * as journalService from '@/services/journalService';
import HomeClient from './HomeClient';

const PAGE_SIZE = 7;

export default async function Home() {
    const supabase = await createServerClient();
    const initialJournals = await journalService.listJournalsByUser(supabase, PAGE_SIZE, 0);
    const initialHasMore = initialJournals.length === PAGE_SIZE;

    return <HomeClient initialJournals={initialJournals} initialHasMore={initialHasMore} />;
}
