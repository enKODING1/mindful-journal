'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Content } from '@/store/models';

export default function Home({ contents }: { contents: Content[] }) {
    const searchParams = useSearchParams();
    const [showMessage, setShowMessage] = useState(false);
    const [messageType, setMessageType] = useState<'success' | 'warning'>('success');
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        const message = searchParams.get('message');
        const error = searchParams.get('error');

        if (message === 'already_written') {
            setMessageType('success');
            setMessageText('오늘은 이미 일기를 작성하셨습니다! 내일 다시 만나요 😊');
            setShowMessage(true);
        } else if (error === 'already_written') {
            setMessageType('warning');
            setMessageText('이미 오늘의 일기를 작성하셨어요. 홈에서 확인해보세요!');
            setShowMessage(true);
        }

        // 3초 후 메시지 숨기기
        if (message || error) {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [searchParams]);

    // 오늘 작성한 일기가 있는지 체크
    const today = new Date().toISOString().split('T')[0];
    const hasWrittenToday = contents.some((content) => content.created_at.startsWith(today));

    return (
        <div className="p-6">
            {/* 메시지 표시 */}
            {showMessage && (
                <div
                    className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-warning'} mb-4`}
                >
                    <span>{messageText}</span>
                </div>
            )}

            <h2 className="text-2xl font-bold mb-4">홈</h2>
            <p className="mb-4">마음챙김 저널에 오신 것을 환영합니다.</p>

            <div className="bg-base-300 text-base-content p-4 rounded-lg">
                <h3 className="font-semibold mb-2">최근 기록</h3>
                <p className="text-sm">
                    {contents.length === 0
                        ? '아직 기록이 없습니다. 새로운 저널을 시작해보세요!'
                        : `총 ${contents.length}개의 기록이 있습니다.`}
                </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
                {contents.map((content) => (
                    <div
                        key={content.id}
                        className="card w-96 bg-base-200 card-xs border border-base-300"
                    >
                        <Link
                            href={`/dashboard/journal/${new Date(content.created_at).toISOString().split('T')[0]}`}
                            className="card-body"
                        >
                            <h2 className="card-title">
                                {new Date(content.created_at).toLocaleString('ko-KR', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </h2>
                            <p>{content.content}</p>
                            <p>{content.mood}</p>
                        </Link>
                    </div>
                ))}
            </div>

            {/* 작성하기 버튼 - 오늘 이미 작성했으면 비활성화 */}
            {hasWrittenToday ? (
                <div className="mt-4">
                    <button className="btn btn-disabled" disabled>
                        오늘 일기 작성 완료 ✅
                    </button>
                    <p className="text-sm text-base-content/70 mt-2">내일 다시 작성해보세요!</p>
                </div>
            ) : (
                <Link href="/dashboard/write" className="btn btn-primary mt-4">
                    작성하기
                </Link>
            )}
        </div>
    );
}
