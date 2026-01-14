'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import JournalCalendar from '@/components/ui/organisms/JournalCalendar';
import Container from '@/components/ui/atom/Container';
import JournalCard from '@/components/ui/molecules/JournalCard';
import { formatJournalDate } from '@/lib/utils';
import { Content } from '@/domain/models';
import createClient from '@/db/supabase/client';
import * as journalService from '@/services/journalService';

interface MoodCalendarClientProps {
    initialJournals: Content[];
    initialDate: string; // ISO date string
}

export default function MoodCalendarClient({
    initialJournals,
    initialDate,
}: MoodCalendarClientProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(initialDate));
    const [journals, setJournals] = useState<Content[]>(initialJournals);
    const supabase = useMemo(() => createClient(), []);

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
        ? journals.find(
              (journal) =>
                  formatJournalDate(journal.created_at) === formatJournalDate(selectedDate),
          )
        : undefined;

    return (
        <Container className="mt-10" variant="base-100" padding="xl" gap="lg" rounded="2xl">
            <h2 className="text-2xl font-bold">기분 캘린더</h2>
            <p className="text-base-content/70">일기를 작성한 날짜를 확인할 수 있습니다.</p>

            <JournalCalendar onSelectDate={setSelectedDate} />

            {selectedDate && selectedJournal && (
                <div className="mt-4 p-4 bg-base-200 rounded-lg">
                    <p className="font-medium mb-4">
                        선택된 날짜: {selectedDate.toLocaleDateString('ko-KR')}
                    </p>
                    <JournalCard
                        date={selectedDate.getDate().toString()}
                        dayOfWeek={selectedDate.toLocaleDateString('ko-KR', {
                            weekday: 'short',
                        })}
                        title={selectedJournal.content}
                        content={selectedJournal.content}
                        mood={selectedJournal.mood}
                    />
                </div>
            )}
        </Container>
    );
}
