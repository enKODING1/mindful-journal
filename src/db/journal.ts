import { SupabaseClient } from '@supabase/supabase-js';
import { Mood, Content, Question } from '@/domain/models';

// 사용자별 전체 목록
export async function listJournalsByUser(
    supabase: SupabaseClient,
    limit?: number,
    offset?: number,
): Promise<Content[]> {
    let query = supabase
        .from('contents')
        .select(
            `
            *,
            questions(id, question)
        `,
        )
        .order('created_at', { ascending: false });

    if (limit !== undefined) {
        const end = offset !== undefined ? offset + limit - 1 : limit - 1;
        query = query.range(offset || 0, end);
    }

    const { data, error } = await query;
    if (error) throw error;

    // questions를 question으로 매핑
    return (data ?? []).map((item: Record<string, unknown>) => ({
        ...item,
        question: item.questions,
    })) as Content[];
}

// 특정 날짜의 일기들
export async function getJournalByDate(supabase: SupabaseClient, ymd: string): Promise<Content[]> {
    const { data, error } = await supabase
        .from('contents')
        .select(
            `
            *,
            questions(id, question),
            ai_comments(
                id,
                comment,
                created_at
            )
        `,
        )
        .gte('created_at', `${ymd}T00:00:00`)
        .lt('created_at', `${ymd}T23:59:59`)
        .order('created_at', { ascending: false });

    if (error) throw error;

    // questions를 question으로 매핑
    return (data ?? []).map((item: Record<string, unknown>) => ({
        ...item,
        question: item.questions,
    })) as Content[];
}

// 특정 ID의 일기 가져오기
export async function getJournalById(
    supabase: SupabaseClient,
    id: string,
): Promise<Content | null> {
    const { data, error } = await supabase
        .from('contents')
        .select(
            `
            *,
            questions(id, question),
            ai_comments(
                id,
                comment,
                created_at
            )
        `,
        )
        .eq('id', id)
        .single();

    if (error) throw error;
    if (!data) return null;

    // questions를 question으로 매핑
    return {
        ...data,
        question: data.questions,
    } as Content;
}

// 오늘 작성했는지 여부
export async function hasWrittenToday(
    supabase: SupabaseClient,
    userId: string,
    today: string,
): Promise<boolean> {
    const { count, error } = await supabase
        .from('contents')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', `${today}T00:00:00`)
        .lt('created_at', `${today}T23:59:59`);

    if (error) throw error;

    return (count ?? 0) > 0;
}

// 일기 생성
export async function createJournal(
    supabase: SupabaseClient,
    input: { userId: string; content: string; mood: Mood; questionId?: number; date?: string },
): Promise<Pick<Content, 'id' | 'created_at'>> {
    const { data, error } = await supabase
        .from('contents')
        .insert({
            user_id: input.userId,
            content: input.content,
            mood: input.mood,
            question_id: input.questionId,
            date: input.date,
        })
        .select('id, created_at')
        .single();

    if (error) throw error;
    return data!;
}

// 댓글 추가
export async function addComment(
    supabase: SupabaseClient,
    input: { contentId: string; body: string; userId: string; type?: 'AI' | 'USER' },
): Promise<void> {
    const { error } = await supabase.from('ai_comments').insert({
        content_id: input.contentId,
        comment: input.body,
        user_id: input.userId,
        comment_type: input.type ?? 'USER',
    });

    if (error) throw error;
}

// 사용자별 일기 전체 개수
export async function countJournalsByUser(supabase: SupabaseClient): Promise<number> {
    const { count, error } = await supabase
        .from('contents')
        .select('id', { count: 'exact', head: true });

    if (error) throw error;

    return count ?? 0;
}

// 다음 질문 가져오기
export async function getNextQuestion(supabase: SupabaseClient): Promise<Question | null> {
    const { data, error } = await supabase.rpc('get_next_question');
    if (error) throw error;

    // RPC가 배열을 반환하는 경우 첫 번째 요소 추출
    if (Array.isArray(data) && data.length > 0) {
        return data[0];
    }

    return data;
}
