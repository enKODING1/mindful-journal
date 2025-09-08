'use client';

import { ChangeEvent, useState } from 'react';
import createClient from '@/app/utils/supabase/client';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

export default function LoginPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async () => {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Error logging in:', error);
    } else {
      console.log(data);
      router.push('/dashboard/home');
    }
  }

  // const handleSignUp = async () => {
  //   const {data, error} = await supabase.auth.signUp({
  //     email,
  //     password,
  //   });
  //   if (error) {
  //     console.error('Error signing up:', error);
  //   } else {
  //     router.push('/dashboard/home');
  //   }
  // }

  const onChangeEmail = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
      setEmail(e.target.value);
  }

  const onChangePassword = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">로그인</h2>
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2 text-gray-600">로그인</h3>
      </div>
      <form>
        <div className="form-control">
          <label className="label">
            <span className="label-text">이메일</span>
          </label>
          <textarea onChange={onChangeEmail}></textarea>
        </div>
      </form>
      <form>
        <div className="form-control">
          <label className="label">
            <span className="label-text">비밀번호</span>
          <textarea onChange={onChangePassword}></textarea>
          </label>
        </div>
      </form>
      <button className="btn btn-primary mt-4" onClick={handleLogin}>로그인</button>
      <Link href="/auth/register">회원가입</Link>
      {/* <button className="btn btn-primary mt-4" onClick={handleLogout}>로그아웃</button> */}
    </div>
  )
}