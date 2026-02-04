import { NextResponse } from 'next/server';
import createClient from '@/db/supabase/server';
import * as journalService from '@/services/journalService';
import { getToday } from '@/lib/utils';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { content, mood, questionId } = body;
        if (!content || !mood) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
        }
        const supabase = await createClient();
        const result = await journalService.createJournal(supabase, {
            content,
            mood,
            questionId,
            date: getToday(),
        });

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
