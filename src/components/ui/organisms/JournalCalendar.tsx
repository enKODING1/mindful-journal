'use client';

import { useEffect, useState } from 'react';
import Calendar from '../atom/Calendar';
import { useJournals } from '@/hooks';
import { ko } from 'date-fns/locale';

export default function JournalCalendar() {
    const { journals, fetchJournals } = useJournals();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    useEffect(() => {
        fetchJournals();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 일기가 작성된 날짜들을 Set으로 변환 (빠른 검색을 위해)
    const journalDateStrings = new Set(
        journals.map((journal) => {
            const date = new Date(journal.created_at);
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        }),
    );

    // 특정 날짜에 일기가 있는지 확인
    const hasJournal = (date: Date) => {
        const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        return journalDateStrings.has(dateString);
    };

    return (
        <div className="flex justify-center p-4 bg-base-200 rounded-2xl">
            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={ko}
                modifiers={{
                    hasJournal: (date) => hasJournal(date),
                }}
                modifiersClassNames={{
                    hasJournal:
                        'relative after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full',
                }}
            />
        </div>
    );
}
