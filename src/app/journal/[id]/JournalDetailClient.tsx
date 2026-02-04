'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import JournalDetailView from '@/components/ui/organisms/JournalDetailView';
import Container from '@/components/ui/atom/Container';
import type { Content } from '@/domain/models';
import { decryptText } from '@/lib/crypto';
import { getMasterKey } from '@/lib/useMasterKey';

interface JournalDetailClientProps {
    journal: Content | null;
    error?: string;
}

export default function JournalDetailClient({ journal, error }: JournalDetailClientProps) {
    const router = useRouter();
    const [decryptedJournal, setDecryptedJournal] = useState<Content | null>(null);
    const [decryptError, setDecryptError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

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

                setDecryptedJournal({
                    ...journal,
                    decryptedContent,
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

    return (
        <div className="mt-10">
            <JournalDetailView journal={decryptedJournal} onBack={handleBack} />
        </div>
    );
}
