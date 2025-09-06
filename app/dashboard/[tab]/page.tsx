'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import createClient from '@/app/utils/supabase/client';

const tabs = [
  { id: 'home', name: '홈', href: '/dashboard/home' },
  { id: 'info', name: '정보', href: '/dashboard/info' },
  { id: 'profile', name: '프로필', href: '/dashboard/profile' },
];

interface Content{
  id: number;
  created_at: string;
  content: string;
  mood: string;
}

async function getContents(): Promise<Content[]>
{
  const supabase = createClient();
  const {data, error} = await supabase.from('contents').select('*');
  console.log(data);
  if(error){
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
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-600">홈</h2>
            <p className="text-gray-600 mb-4">마음챙김 저널에 오신 것을 환영합니다.</p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-600">최근 기록</h3>
              <p className="text-sm text-gray-600">아직 기록이 없습니다. 새로운 저널을 시작해보세요!</p>
            </div>
            <Link href="/write" className="btn btn-primary mt-4 ">작성하기</Link>
          </div>
        );
      case 'info':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">정보</h2>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">마음챙김이란?</h3>
                <p className="text-sm text-gray-600">
                  현재 순간에 주의를 기울이고, 판단하지 않으며, 의도적으로 인식하는 것입니다.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">저널 작성 팁</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 매일 일정한 시간에 작성하기</li>
                  <li>• 솔직하고 진실된 마음으로 쓰기</li>
                  <li>• 작은 변화도 기록하기</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
            {
              contents.map((content) => (
                <div key={content.id} className="card w-96 bg-base-100 card-xs shadow-sm">
                <div className="card-body">
                  <h2 className="card-title">{content.created_at}</h2>
                  <p>{content.content}</p>
                <p>{content.mood}</p>
              </div>
              </div>
                ))
            }
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">프로필</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">사용자 정보</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>이름: 사용자</p>
                  <p>가입일: 2024년 1월</p>
                  <p>총 저널 수: 0개</p>
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
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
      <div className="max-w-4xl mx-auto">
        {renderTabContent()}
      </div>
    </div>
  );
}