// app/auth/register/page.tsx
'use client';
import { useState } from 'react';
import createClient from '@/app/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const supabase = createClient();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alias, setAlias] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!(email && password)) return;
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    alias,
                    birth,
                    gender,
                },
            },
        });
        setLoading(false);
        if (error) {
            console.error('회원가입 실패:', { error });
            return;
        }

        router.push('/auth/login');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold text-gray-600 mb-4">회원가입</h1>
                <p className="text-lg text-gray-600 mb-8">계정을 만들어 저널을 시작하세요</p>

                <div className="border-1 border-gray-100 rounded-lg p-4 w-100">
                    <form onSubmit={onSubmit} className="flex flex-col">
                        <div className="flex flex-col items-start">
                            <label>이메일</label>
                            <input
                                className="border-1 border-gray-200 rounded-lg p-2 w-full mt-0.5"
                                name="email"
                                placeholder="이메일을 입력해주세요"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col items-start mt-4">
                            <label>비밀번호</label>
                            <input
                                className="border-1 border-gray-200 rounded-lg p-2 w-full mt-0.5"
                                name="password"
                                type="password"
                                placeholder="비밀번호(6자 이상)"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col items-start mt-4">
                            <label>별명</label>
                            <input
                                className="border-1 border-gray-200 rounded-lg p-2 w-full mt-0.5"
                                name="alias"
                                placeholder="별명"
                                onChange={(e) => setAlias(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col items-start mt-4">
                            <label>성별</label>
                            <select
                                name="gender"
                                id="gender"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="other">기타</option>
                                <option value="male">남자</option>
                                <option value="female">여자</option>
                                <option value="non-binary">알리고 싶지 않음</option>
                            </select>
                        </div>
                        <div className="flex flex-col items-start mt-4">
                            <label>생일</label>
                            <input
                                className="border-1 border-gray-200 rounded-lg p-2 w-full mt-0.5"
                                name="birthday"
                                placeholder="생일"
                                type="date"
                                onChange={(e) => setBirth(e.target.value)}
                            />
                        </div>

                        <button className="btn mt-4 btn-primary w-full" disabled={loading}>
                            {loading ? '처리 중...' : '가입'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
