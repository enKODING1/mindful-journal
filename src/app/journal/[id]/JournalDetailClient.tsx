'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import JournalDetailView from '@/components/ui/organisms/JournalDetailView';
import Container from '@/components/ui/atom/Container';
import type { Content, AIComment } from '@/domain/models';
import { decryptText, encryptText } from '@/lib/crypto';
import { getMasterKey } from '@/lib/useMasterKey';
import createClient from '@/db/supabase/client';
import * as journalService from '@/services/journalService';
import Loading from '@/components/ui/atom/Loading';

interface JournalDetailClientProps {
    journal: Content | null;
    error?: string;
}

export default function JournalDetailClient({ journal, error }: JournalDetailClientProps) {
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);
    const [decryptedJournal, setDecryptedJournal] = useState<Content | null>(null);
    const [decryptError, setDecryptError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [responseError, setResponseError] = useState<boolean>(false);
    const [responseErrorMessage, setResponseErrorMessage] = useState<string>('');

    const [aiLoading, setAiLoading] = useState(false);

    const handleGetAiResponse = async () => {
        if (!decryptedJournal) return;
        setAiLoading(true);
        try {
            // 1. 마스터키로 CryptoKey 생성 (암호화용)
            const masterKey = getMasterKey();
            if (!masterKey) {
                throw new Error('암호화 키가 없습니다.');
            }
            const cryptoKey = await crypto.subtle.importKey(
                'raw',
                masterKey as BufferSource,
                { name: 'AES-GCM' },
                false,
                ['encrypt', 'decrypt'],
            );

            // 2. Gemini API 호출 (복호화된 일기 내용만 전송)
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: decryptedJournal.decryptedContent,
                    mood: decryptedJournal.mood,
                }),
            });
            const data = await response.json();
            const aiResponseText = data.text;
            if (data.error) {
                setResponseError(true);
                setResponseErrorMessage(data.error);
                return;
            }
            // 3. AI 응답 암호화
            const encryptedComment = await encryptText(aiResponseText, cryptoKey);

            // 4. DB에 저장
            const savedComment = await journalService.addAIComment(supabase, {
                contentId: decryptedJournal.id,
                comment: encryptedComment,
                modelVersion: 'gemini-2.0-flash',
            });

            // 5. 상태 업데이트 (복호화된 코멘트 포함)
            const newAIComment: AIComment = {
                id: savedComment.id,
                content_id: decryptedJournal.id,
                user_id: '',
                comment: encryptedComment,
                decryptedComment: aiResponseText,
                created_at: savedComment.created_at,
                model_version: 'gemini-2.0-flash',
            };

            setDecryptedJournal((prev) => ({
                ...prev!,
                ai_comments: [...(prev?.ai_comments || []), newAIComment],
            }));
        } catch (error) {
            console.error('AI 코멘트 생성 실패:', error);
        } finally {
            setAiLoading(false);
        }
    };

    useEffect(() => {
        const decryptContent = async () => {
            if (!journal) {
                setLoading(false);
                return;
            }

            try {
                const masterKey = getMasterKey();
                if (!masterKey) {
                    setDecryptError('암호화 키가 없습니다. 다시 로그인해주세요.');
                    setLoading(false);
                    return;
                }

                const cryptoKey = await crypto.subtle.importKey(
                    'raw',
                    masterKey as BufferSource,
                    { name: 'AES-GCM' },
                    false,
                    ['decrypt'],
                );

                let decryptedContent: string;

                try {
                    // content가 이미 EncryptedContent 객체
                    if (journal.content.iv && journal.content.data) {
                        decryptedContent = await decryptText(journal.content, cryptoKey);
                    } else {
                        decryptedContent = '[복호화 실패]';
                    }
                } catch {
                    decryptedContent = '[복호화 실패]';
                }

                // ai_comments 복호화
                let decryptedAIComments: AIComment[] = [];
                if (journal.ai_comments && journal.ai_comments.length > 0) {
                    decryptedAIComments = await Promise.all(
                        journal.ai_comments.map(async (comment) => {
                            try {
                                const decryptedComment = await decryptText(
                                    comment.comment,
                                    cryptoKey,
                                );
                                return { ...comment, decryptedComment };
                            } catch {
                                return { ...comment, decryptedComment: '[복호화 실패]' };
                            }
                        }),
                    );
                }

                setDecryptedJournal({
                    ...journal,
                    decryptedContent,
                    ai_comments: decryptedAIComments,
                });
            } catch (err) {
                console.error('Decryption failed:', err);
                setDecryptError('일기 복호화에 실패했습니다');
            } finally {
                setLoading(false);
            }
        };

        decryptContent();
    }, [journal]);

    const handleBack = () => {
        router.push('/');
    };

    if (loading) {
        return (
            <Container className="mt-10" variant="base-300" padding="xl" gap="lg" rounded="2xl">
                <div className="flex flex-col items-center justify-center py-12">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-base-content/70 mt-4">일기를 복호화하는 중...</p>
                </div>
            </Container>
        );
    }

    if (error || decryptError || !decryptedJournal) {
        return (
            <Container className="mt-10" variant="base-300" padding="xl" gap="lg" rounded="2xl">
                <div className="text-center py-12">
                    <p className="text-error mb-4">
                        {error || decryptError || '일기를 찾을 수 없습니다'}
                    </p>
                    <button onClick={handleBack} className="btn btn-primary">
                        목록으로 돌아가기
                    </button>
                </div>
            </Container>
        );
    }
    console.log(responseErrorMessage);
    return (
        <div className="mt-10">
            <JournalDetailView journal={decryptedJournal} onBack={handleBack} />
            {(!decryptedJournal.ai_comments || decryptedJournal.ai_comments.length === 0) && (
                <div className="max-w-2xl mx-auto px-4 mt-8">
                    <button
                        className="btn btn-primary"
                        onClick={handleGetAiResponse}
                        disabled={aiLoading}
                        // style={{ marginBottom: '16rem' }}
                    >
                        {aiLoading ? (
                            <div>
                                한마디 적고 있어요...
                                <Loading size="sm" />
                            </div>
                        ) : (
                            '이야기 나누기'
                        )}
                    </button>
                    {responseError && <p className="text-error mt-4">{responseErrorMessage}</p>}
                </div>
            )}
            <div className="mb-20"></div>
        </div>
    );
}
