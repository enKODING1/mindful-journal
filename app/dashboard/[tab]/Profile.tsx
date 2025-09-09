'use client';
import { useState, useEffect } from 'react';
import { Content } from './types';
import createClient from '@/app/utils/supabase/client';

export default function Profile({ contents }: { contents: Content[] }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const contentLength = contents.length;

    useEffect(() => {
        const fetchProfile = async () => {
            const supabase = createClient();

            // 현재 로그인한 사용자 정보 가져오기
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                console.error('User not authenticated:', userError);
                setLoading(false);
                return;
            }

            // 사용자 ID로 프로필 조회
            console.log(user.id);
            const { data, error } = await supabase.from('profiles').select('*').single();
            // console.log('fetched:', data);

            if (error) {
                console.error('Profile fetch error:', error);
                if (error.code === 'PGRST116') {
                    const { data, error } = await supabase.from('profiles').insert({
                        user_id: user.id,
                        email: user.email,
                        alias: 'anonymous',
                    });

                    if (error) {
                        console.error('Error insert:', error);
                    } else {
                        console.log('temp info generator success!', data);
                    }

                    const res = await supabase.from('profiles').select('*').single();
                    if (error) {
                        console.error('Error', res.error);
                    } else {
                        console.log('Success:', res.data);
                        setProfile(res.data);
                    }
                }
            } else {
                setProfile(data);
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">프로필</h2>
            <div className="space-y-4">
                <div className="bg-base-200 text-base-content p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">사용자 정보</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-200">
                        <p>이름: {profile?.alias || '설정되지 않음'}</p>
                        <p>
                            가입일:{' '}
                            {profile?.created_at
                                ? new Date(profile.created_at).toLocaleDateString()
                                : '알 수 없음'}
                        </p>
                        <p>총 저널 수: {contentLength}개</p>
                    </div>
                </div>
                <div className="bg-base-200 text-base-content p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">설정</h3>
                    <div className="space-y-2">
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                            알림 설정
                        </button>
                        <br />
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                            데이터 내보내기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
