'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import JournalCalendar from '@/components/ui/organisms/JournalCalendar';
import Container from '@/components/ui/atom/Container';
import JournalCard from '@/components/ui/molecules/JournalCard';
import { formatJournalDate } from '@/lib/utils';
import { Content } from '@/domain/models';
import createClient from '@/db/supabase/client';
import * as journalService from '@/services/journalService';
import { decryptText } from '@/lib/crypto';
import { getMasterKey } from '@/lib/useMasterKey';

interface MoodCalendarClientProps {
    initialJournals: Content[];
    initialDate: string; // ISO date string
}

/**
 * 일기 내용 복호화
 */
async function decryptJournalContent(
    encryptedContent: string,
    cryptoKey: CryptoKey,
): Promise<string> {
    try {
        const parsed = JSON.parse(encryptedContent);
        if (parsed.iv && parsed.data) {
            return await decryptText(parsed, cryptoKey);
        }
        return encryptedContent;
    } catch {
        return encryptedContent;
    }
}

export default function MoodCalendarClient({
    initialJournals,
    initialDate,
}: MoodCalendarClientProps) {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(initialDate));
    const [journals, setJournals] = useState<Content[]>(initialJournals);
    const [decryptedJournals, setDecryptedJournals] = useState<Content[]>([]);
    const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);
    const supabase = useMemo(() => createClient(), []);

    // 마스터키 → CryptoKey 변환
    useEffect(() => {
        const initCryptoKey = async () => {
            const masterKey = getMasterKey();
            if (masterKey) {
                const key = await crypto.subtle.importKey(
                    'raw',
                    masterKey as BufferSource,
                    { name: 'AES-GCM' },
                    false,
                    ['decrypt'],
                );
                setCryptoKey(key);
            }
        };
        initCryptoKey();
    }, []);

    // journals 변경 시 복호화
    useEffect(() => {
        const decryptJournals = async () => {
            // cryptoKey가 없으면 복호화 대기 (빈 배열 유지)
            if (!cryptoKey) {
                return;
            }

            if (journals.length === 0) {
                setDecryptedJournals([]);
                return;
            }

            const decrypted = await Promise.all(
                journals.map(async (journal) => ({
                    ...journal,
                    content: await decryptJournalContent(journal.content, cryptoKey),
                })),
            );
            setDecryptedJournals(decrypted);
        };
        decryptJournals();
    }, [journals, cryptoKey]);

    // 날짜가 변경되면 해당 날짜의 일기를 fetch
    const fetchJournalsByDate = useCallback(
        async (date: Date) => {
            try {
                const ymd = formatJournalDate(date);
                const data = await journalService.getJournalByDate(supabase, ymd);
                setJournals(data);
            } catch (err) {
                console.error('Failed to fetch journals by date:', err);
            }
        },
        [supabase],
    );

    useEffect(() => {
        if (selectedDate) {
            // 초기 날짜가 아닌 경우에만 fetch
            const currentYmd = formatJournalDate(selectedDate);
            if (currentYmd !== initialDate) {
                fetchJournalsByDate(selectedDate);
            }
        }
    }, [selectedDate, fetchJournalsByDate, initialDate]);

    const selectedJournal = selectedDate
        ? decryptedJournals.find(
              (journal) =>
                  formatJournalDate(journal.created_at) === formatJournalDate(selectedDate),
          )
        : undefined;

    const handleJournalClick = (journal: Content) => {
        router.push(`/journal/${journal.id}`);
    };

    // 제목과 미리보기 추출
    const getTitle = (journal: Content) => {
        return journal.question?.question || journal.content.split('\n')[0] || '제목 없음';
    };

    const getContentPreview = (journal: Content) => {
        return journal.content.split('\n').slice(0, 2).join(' ').trim();
    };

    return (
        <Container className="mt-10" variant="base-100" padding="xl" gap="lg" rounded="2xl">
            <h2 className="text-2xl font-bold">기분 캘린더</h2>
            <p className="text-base-content/70">일기를 작성한 날짜를 확인할 수 있습니다.</p>

            <JournalCalendar onSelectDate={setSelectedDate} />

            {selectedDate && selectedJournal && (
                <div className="mt-4">
                    <p className="text-sm text-base-content/50 mb-3">
                        선택된 날짜: {selectedDate.toLocaleDateString('ko-KR')}
                    </p>
                    <JournalCard
                        date={selectedDate.getDate().toString()}
                        dayOfWeek={selectedDate.toLocaleDateString('ko-KR', {
                            weekday: 'short',
                        })}
                        title={getTitle(selectedJournal)}
                        content={getContentPreview(selectedJournal)}
                        mood={selectedJournal.mood}
                        onClick={() => handleJournalClick(selectedJournal)}
                    />
                </div>
            )}
        </Container>
    );
}
