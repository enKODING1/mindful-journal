import createServerClient from '@/db/supabase/server';
import * as journalService from '@/services/journalService';
import WriteClient from './WriteClient';

export default async function Write() {
    const supabase = await createServerClient();
    const journals = await journalService.listJournalsByUser(supabase);
    const question = await journalService.getNextQuestion(supabase);

    return <WriteClient journals={journals} question={question} />;
}
