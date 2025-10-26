'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import createClient from '@/app/utils/supabase/client';
// import { Content } from './types';
import { Content } from '@/store/models';
import Home from './Home';
import Info from './Info';
import Profile from './Profile';
import MoodCalendar from './MoodCalendar';

async function getContents(): Promise<Content[]> {
    const supabase = createClient();
    const { data, error } = await supabase.from('contents').select('*');
    console.log(data);
    if (error) {
        console.error('Error fetching contentss:', error);
        return [];
    }

    return data || [];
}

export default function DashboardPage() {
    const params = useParams();
    const [contents, setContents] = useState<Content[]>([]);
    const currentTab = params.tab as string;

    useEffect(() => {
        const fetchContents = async () => {
            const data = await getContents();
            setContents(data);
        };
        fetchContents();
    }, []);

    const renderTabContent = () => {
        switch (currentTab) {
            case 'home':
                return <Home contents={contents} />;
            case 'info':
                return <Info />;

            case 'profile':
                return <Profile contents={contents} />;
            case 'moodCalendar':
                return <MoodCalendar></MoodCalendar>;
            default:
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">페이지를 찾을 수 없습니다</h2>
                        <p className="text-gray-600">올바른 탭을 선택해주세요.</p>
                    </div>
                );
        }
    };

    return (
        <div>
            <div className="max-w-4xl mx-auto">{renderTabContent()}</div>
        </div>
    );
}
