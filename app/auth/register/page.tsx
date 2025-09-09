// app/auth/register/page.tsx
import createClient from '@/app/utils/supabase/server';

export default function RegisterPage() {
    const signUpNewUser = async (formdata: FormData) => {
        'use server';
        const email = formdata.get('email')?.toString();
        const password = formdata.get('password')?.toString();
        const supabase = await createClient();
        if (!(email && password)) return;

        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            console.error('회원가입 실패:', error.message);
            return;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold text-gray-600 mb-4">회원가입</h1>
                <p className="text-lg text-gray-600 mb-8">계정을 만들어 저널을 시작하세요</p>

                <div className="border-1 border-gray-100 rounded-lg p-4 w-100">
                    <form action={signUpNewUser} className="flex flex-col">
                        <div className="flex flex-col items-start">
                            <label>이메일</label>
                            <input
                                className="border-1 border-gray-200 rounded-lg p-2 w-full mt-0.5"
                                name="email"
                                placeholder="이메일을 입력해주세요"
                            />
                        </div>

                        <div className="flex flex-col items-start mt-4">
                            <label>비밀번호</label>
                            <input
                                className="border-1 border-gray-200 rounded-lg p-2 w-full mt-0.5"
                                name="password"
                                type="password"
                                placeholder="비밀번호(6자 이상)"
                            />
                        </div>

                        <button className="btn mt-4 btn-primary w-full">가입</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
