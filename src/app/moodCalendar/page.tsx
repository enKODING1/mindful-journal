import createServerClient from '@/db/supabase/server';
import * as journalService from '@/services/journalService';
import MoodCalendarClient from './MoodCalendarClient';
import { formatJournalDate } from '@/lib/utils';

export default async function MoodCalendar() {
    const supabase = await createServerClient();
    const today = new Date();
    const todayYmd = formatJournalDate(today);
    const initialJournals = await journalService.getJournalByDate(supabase, todayYmd);

    return <MoodCalendarClient initialJournals={initialJournals} initialDate={todayYmd} />;
}
