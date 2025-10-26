'use client';

import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import createClient from '../../utils/supabase/client';
import { useRouter } from 'next/navigation';
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default function Home() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const supabase = createClient();

        if (!(email && password)) {
            console.error('form is blank');
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error('Error: ', error);
        }
        if (data) {
            console.log('data: ', data);
            router.push('/dashboard/home');
        }
    };

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    };

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold text-gray-600 mb-4">마음챙김 저널</h1>
                <p className="text-lg text-gray-600 mb-8">
                    매일의 생각과 감정을 기록하며 마음의 평화를 찾아보세요
                </p>
                <div className="border-1 border-gray-100 rounded-lg p-4">
                    <div className="flex flex-col">
                        <div className="flex flex-col items-start ">
                            <label>이메일</label>
                            <input
                                className="border-1 border-gray-200 rounded-lg p-2 w-full mt-0.5"
                                name="email"
                                placeholder="이메일을 입력해주세요"
                                onChange={onChangeEmail}
                            ></input>
                        </div>
                        <div className="flex flex-col items-start mt-4">
                            <label>비밀번호</label>
                            <input
                                className="border-1 border-gray-200 rounded-lg p-2 w-full mt-0.5"
                                name="password"
                                placeholder="비밀번호"
                                type="password"
                                onChange={onChangePassword}
                            ></input>
                        </div>
                        <div>
                            <button className="btn mt-4 btn-primary w-full" onClick={handleLogin}>
                                로그인
                            </button>
                            <GoogleLoginButton />
                        </div>
                        <div className="flex items-center mt-12 justify-center gap-1">
                            <p className="text-sm text-gray-600">아직 회원이 아니신가요?</p>
                            <Link className="text-sm text-blue-500" href="/auth/register">
                                가입
                            </Link>
                        </div>
                    </div>
                </div>
                {/* <Link
                    href="/dashboard/home"
                    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                    저널 시작하기
                </Link> */}
            </div>
        </div>
    );
}
