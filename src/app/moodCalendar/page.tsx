'use client';

import { useState, useEffect } from 'react';
import { useJournals } from '@/hooks/useJournals';
import JournalCalendar from '@/components/ui/organisms/JournalCalendar';
import Container from '@/components/ui/atom/Container';
import JournalCard from '@/components/ui/molecules/JournalCard';
import { formatJournalDate } from '@/lib/utils';

export default function MoodCalendar() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const { journals, fetchJournalsByDate } = useJournals();

    useEffect(() => {
        if (selectedDate) {
            fetchJournalsByDate(selectedDate);
        }
    }, [selectedDate, fetchJournalsByDate]);

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
