'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Content } from '../../[tab]/types';
import createClient from '@/app/utils/supabase/client';

async function getContents(date: string): Promise<Content[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('contents')
        .select(
            `
            *,
            comments!inner(
            id,
            comment_body,
            created_at
            ) 
            `,
        )
        .gte('created_at', `${date}T00:00:00`)
        .lt('created_at', `${date}T23:59:59`);
    if (error) {
        console.error('Error:', error);
    }
    return data || [];
}

// 기분별 한글 이름
const getMoodName = (mood: string) => {
    const moodMap = {
        happy: '기쁨',
        sad: '슬픔',
        angry: '화남',
        tired: '피곤',
        relaxed: '편안',
    };
    return moodMap[mood as keyof typeof moodMap] || '알 수 없음';
};

export default function JournalPage() {
    const params = useParams();
    const [contents, setContents] = useState<Content>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            const data = await getContents(params.journal as string);
            setIsLoading(false);
            setContents(data[0]);
        };
        fetchContent();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <div className="p-6 bg-base-100 text-base-content">
                <p>일기 불러오는중...</p>
            </div>
        );
    }

    if (!contents) {
        return (
            <div className="p-6 bg-base-100 text-base-content">
                <p>이 날에는 기록이 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 text-base-content p-8">
            <div className="max-w-2xl mx-auto">
                {/* 날짜 */}
                <div className="mb-8">
                    <h1 className="text-lg text-base-content/70 font-normal">
                        {formatDate(contents.created_at)}
                    </h1>
                </div>

                {/* 기분 */}
                <div className="mb-8">
                    <p className="text-lg text-base-content">기분: {getMoodName(contents.mood)}</p>
                </div>

                {/* 일기 내용 */}
                <div className="text-base-content leading-relaxed text-lg">
                    <p className="whitespace-pre-wrap">{contents.content}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg mt-4">
                    <h3 className="font-semibold mb-2 text-gray-500 ">마음챙김 봇 답변</h3>
                    <p className="text-sm text-gray-600">{contents.comments[0].comment_body}</p>
                </div>
            </div>
        </div>
    );
}
