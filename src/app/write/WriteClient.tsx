'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import JournalForm from '@/components/ui/organisms/JournalForm';
import Alert from '@/components/ui/atom/Alert';
import { Mood, Question } from '@/domain/models';
import createClient from '@/db/supabase/client';
import * as journalService from '@/services/journalService';
import { encrypt } from '@/lib/crypto';

interface WriteClientProps {
    hasWrittenToday: boolean;
    question: Question | null;
}

export default function WriteClient({ hasWrittenToday, question }: WriteClientProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);

    const handleSubmit = useCallback(
        async (content: string, mood: Mood) => {
            setLoading(true);
            setError(null);
            try {
                // 1. 일기 저장
                const result = await fetch('/api/write', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content, mood, questionId: question?.id }),
                });
                if (!result.ok) {
                    throw new Error('일기 저장에 실패했습니다');
                }
                const resultJson = await result.json().then((res) => res.data);

                // 2. Gemini API 호출
                try {
                    const res = await fetch('/api/gemini', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ prompt: content }),
                    });
                    const { text } = await res.json();

                    // 3. AI 댓글 저장
                    if (text) {
                        await journalService.addComment(supabase, {
                            contentId: resultJson.id,
                            body: text,
                            type: 'AI',
                        });
                    }
                } catch {
                    // Gemini 호출 실패해도 일기는 이미 저장됨
                    console.error('Gemini API 호출 실패');
                }

                setSuccessMessage('오늘의 이야기를 보관했어요!');
                // 상세 페이지로 이동
                router.push(`/journal/${resultJson.id}`);
            } catch (err) {
                const message = err instanceof Error ? err.message : '일기 작성에 실패했습니다';
                setError(message);
            } finally {
                setLoading(false);
            }
        },
        [supabase, router, question],
    );

    if (hasWrittenToday) {
        return (
            <div className="mt-16 max-w-2xl mx-auto px-4">
                <div className="text-center py-12">
                    <p className="text-xl text-base-content/70">
                        오늘의 이야기를 이미 보관했어요 ✨
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-16 max-w-2xl mx-auto px-4">
            {/* 질문 */}
            <p className="text-lg text-base-content/80 mb-8 text-center">
                {question?.question ?? '하루 중 기억하고 싶은 순간은 무엇인가요?'}
            </p>

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
