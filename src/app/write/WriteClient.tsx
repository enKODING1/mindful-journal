'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import JournalForm from '@/components/ui/organisms/JournalForm';
import Alert from '@/components/ui/atom/Alert';
import { Content, Mood } from '@/domain/models';
import Input from '@/components/ui/atom/Input';
import { hasWrittenToday as checkHasWrittenToday } from '@/domain/utils';
import { encryptText } from '@/lib/crypto';
import { getMasterKey } from '@/lib/useMasterKey';
import { getToday } from '@/lib/utils';

interface WriteClientProps {
    journals: Content[];
}

function defaultTitle() {
    const date = getToday().split('-');
    return `${date[0]}년 ${date[1]}월 ${date[2]}일의 이야기`;
}

export default function WriteClient({ journals }: WriteClientProps) {
    const hasWrittenToday = checkHasWrittenToday(journals);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [title, setTitle] = useState(defaultTitle);
    const router = useRouter();

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = useCallback(
        async (content: string, mood: Mood) => {
            setLoading(true);
            setError(null);
            try {
                const masterKey = getMasterKey();
                if (!masterKey) {
                    throw new Error('암호화 키가 없습니다. 다시 로그인해주세요.');
                }

                const encryptedContent = await encryptText(content, masterKey);
                const encryptedTitle = await encryptText(title, masterKey);

                const result = await fetch('/api/write', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: encryptedContent,
                        mood,
                        title: encryptedTitle,
                    }),
                });

                if (!result.ok) {
                    throw new Error('일기 저장에 실패했습니다');
                }
                const resultJson = await result.json().then((res) => res.data);

                setSuccessMessage('오늘의 이야기를 보관했어요!');
                router.push(`/journal/${resultJson.id}`);
            } catch (err) {
                const message = err instanceof Error ? err.message : '일기 작성에 실패했습니다';
                setError(message);
            } finally {
                setLoading(false);
            }
        },
        [router, title],
    );

    if (hasWrittenToday) {
        return (
            <div className="mt-16 max-w-2xl mx-auto px-4">
                <div className="text-center py-12">
                    <p className="text-xl text-base-content/70">오늘의 이야기를 이미 보관했어요!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-16 max-w-2xl mx-auto px-4">
            <Input
                inputSize="md"
                value={title}
                className={'w-full mb-2'}
                onChange={handleTitle}
            ></Input>

            {/* 알림 메시지 */}
            {successMessage && (
                <Alert color="success" className="mb-4">
                    <span>{successMessage}</span>
                </Alert>
            )}
            {error && (
                <Alert color="error" className="mb-4">
                    <span>{error}</span>
                </Alert>
            )}

            {/* 폼 */}
            <JournalForm
                onSubmit={handleSubmit}
                submitButtonText={loading ? '저장 중...' : '저장'}
                variant="base-200"
            />
        </div>
    );
}
