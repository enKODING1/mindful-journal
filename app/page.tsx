'use client';

import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold text-gray-600 mb-4">마음챙김 저널</h1>
                <p className="text-lg text-gray-600 mb-8">
                    매일의 생각과 감정을 기록하며 마음의 평화를 찾아보세요
                </p>
            </div>
            <div className="rounded-lg p-4 w-100">
                <Link href="/dashboard/home" className="btn btn-primary w-full">
                    시작하기
                </Link>
            </div>
        </div>
    );
}
