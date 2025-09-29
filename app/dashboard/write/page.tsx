import { redirect } from 'next/navigation';
import createClient from '../../utils/supabase/server';

// 오늘 이미 작성했는지 체크하는 함수
async function checkTodayContent() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
        .from('contents')
        .select('id')
        .eq('user_id', user.id)
        .gte('created_at', `${today}T00:00:00`)
        .lt('created_at', `${today}T23:59:59`)
        .limit(1);

    if (data && data.length > 0) {
        redirect('/dashboard/home?message=already_written');
    }

    return true;
}

async function generateComment(content: string, mood: string) {
    const prompt = `일기내용: ${content}, 오늘의 기분: ${mood}`;
    const response = await fetch(`${process.env.SITE_URL}/api/gemini`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        console.error('API 요청 실패:', response.status);
        return 'AI 댓글 생성에 실패했습니다.';
    }

    const data = await response.json();

    if (data.error) {
        console.error('API 오류:', data.error);
        return 'AI 댓글 생성에 실패했습니다.';
    }

    console.log(data.text);
    return data.text;
}

export default async function WritePage() {
    // 페이지 로드 시 오늘 이미 작성했는지 체크
    await checkTodayContent();

    async function addContent(formData: FormData) {
        'use server';
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const content = formData.get('content') as string;
        const mood = formData.get('mood') as string;
        const user_id = user?.id;

        if (user) {
            // 한 번 더 체크 (동시 작성 방지)
            const today = new Date().toISOString().split('T')[0];
            const { data: existingContent } = await supabase
                .from('contents')
                .select('id')
                .eq('user_id', user_id)
                .gte('created_at', `${today}T00:00:00`)
                .lt('created_at', `${today}T23:59:59`)
                .limit(1);

            if (existingContent && existingContent.length > 0) {
                redirect('/dashboard/home?error=already_written');
                return;
            }
            const { data, error } = await supabase
                .from('contents')
                .insert({ content, mood, user_id })
                .select('id, created_at')
                .single();

            const insertData = data;

            if (error) {
                console.error('Error inserting content:', error);
                return;
            } else {
                const text = await generateComment(content, mood);
                const { error } = await supabase.from('comments').insert({
                    content_id: insertData?.id,
                    comment_type: 'AI',
                    comment_body: text,
                    user_id: user_id,
                });

                if (error) {
                    console.error('Error:', error);
                }
            }
            console.log('good');
            const date = new Date(insertData?.created_at).toISOString().split('T')[0];
            console.log(`date: ${data}`);
            redirect(`/dashboard/journal/${date}`);
        }
    }

    return (
        <div className="p-6 w-[60%] m-auto">
            <h2 className="text-2xl font-bold mb-4">작성하기</h2>

            <form action={addContent} className="space-y-6">
                {/* 일기 내용 섹션 */}
                <div className="bg-base-200 text-base-content p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">오늘의 이야기</h3>
                    <div className="form-control">
                        <textarea
                            className="textarea textarea-bordered h-32 resize-none w-full"
                            name="content"
                            placeholder="오늘 하루는 어땠나요? 특별한 일이나 생각이 있었다면 자유롭게 적어보세요..."
                            required
                        />
                    </div>
                </div>

                {/* 기분 선택 섹션 */}
                <div className="bg-base-200 text-base-content p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">오늘의 기분은 어떠신가요?</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {[
                            { value: 'happy', emoji: '😊', label: '기쁨' },
                            { value: 'sad', emoji: '😢', label: '슬픔' },
                            { value: 'angry', emoji: '😠', label: '화남' },
                            { value: 'tired', emoji: '😴', label: '피곤' },
                            { value: 'relaxed', emoji: '😌', label: '편안' },
                        ].map((mood) => (
                            <label key={mood.value} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="mood"
                                    value={mood.value}
                                    className="sr-only peer"
                                    required
                                />
                                <div className="card bg-base-100 border-2 border-base-300 peer-checked:border-primary peer-checked:bg-primary/10 hover:bg-base-100/80 transition-colors">
                                    <div className="card-body p-3 text-center">
                                        <div className="text-2xl mb-1">{mood.emoji}</div>
                                        <div className="text-xs font-medium">{mood.label}</div>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 제출 버튼 */}
                <div className="flex justify-center">
                    <button type="submit" className="btn btn-primary">
                        기록하기
                    </button>
                </div>
            </form>

            {/* 도움말 카드 */}
            <div className="bg-base-300 text-base-content p-4 rounded-lg mt-6">
                <h3 className="font-semibold mb-2">💭 작은 팁</h3>
                <p className="text-sm">
                    매일 일기를 쓰는 것은 마음의 건강에 도움이 됩니다. 좋은 일이든 힘든 일이든
                    솔직하게 기록해보세요. 시간이 지나면 소중한 추억과 성장의 기록이 될 거예요.
                </p>
            </div>
        </div>
    );
}
