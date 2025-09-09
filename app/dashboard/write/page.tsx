import { redirect } from 'next/navigation';
import createClient from '../../utils/supabase/server';

// interface Content {
//   content: string;
//   mood: string;
// }

export default function WritePage() {
    async function addContent(formData: FormData) {
        'use server';
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const content = formData.get('content') as string;
        const mood = formData.get('mood') as string;
        const user_id = user?.id;

        console.log(user);
        console.log(content, mood);

        if (user) {
            // const {data, error} = await supabase.from('contents').insert({content, mood});
            const { data: error } = await supabase
                .from('contents')
                .insert({ content, mood, user_id });
            if (error) {
                console.error('Error inserting content:', error);
                return;
            } else {
                console.log('good');
                redirect('/dashboard/home');
            }
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-600">작성하기</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-600">작성하기</h3>
                <p className="text-sm text-gray-600">작성하기</p>
            </div>

            <form action={addContent}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">내용</span>
                    </label>
                </div>
                <div className="form-control">
                    <textarea className="textarea textarea-bordered" name="content" />
                </div>
                <div className="form-control">
                    <label className="label">오늘의 기분은 어떠신가요 ?</label>
                </div>
                <select className="select select-bordered" name="mood">
                    <option value="happy">기쁨</option>
                    <option value="sad">슬픔</option>
                    <option value="angry">화남</option>
                    <option value="tired">피곤</option>
                    <option value="relaxed">편안</option>
                </select>
                <br></br>
                <button className="btn btn-primary mt-4">기록하기</button>
            </form>
        </div>
    );
}
