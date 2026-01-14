'use client';

import { useEffect, useState } from 'react';
import Calendar from '../atom/Calendar';
import { useJournals } from '@/hooks';
import { ko } from 'date-fns/locale';
import { Mood } from '@/domain/models';

interface JournalCalendarProps {
    onSelectDate?: (date: Date | undefined) => void;
}

export default function JournalCalendar({ onSelectDate }: JournalCalendarProps) {
    const { journals, fetchJournals } = useJournals();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    const handleSelectDate = (date: Date | undefined) => {
        setSelectedDate(date);
        onSelectDate?.(date);
    };

    useEffect(() => {
        fetchJournals();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 날짜별 무드 매핑 (날짜 문자열 -> 무드)
    const moodByDate = new Map<string, Mood>();
    journals.forEach((journal) => {
        const date = new Date(journal.created_at);
        const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        // 같은 날짜에 여러 일기가 있을 경우 최신 일기의 무드 사용
        if (!moodByDate.has(dateString)) {
            moodByDate.set(dateString, journal.mood);
        }
    });

    // 특정 날짜가 특정 무드인지 확인
    const hasMood = (mood: Mood) => (date: Date) => {
        const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        return moodByDate.get(dateString) === mood;
    };

    const moodColors: Record<Mood, string> = {
        happy: 'bg-yellow-400',
        sad: 'bg-blue-400',
        angry: 'bg-red-400',
        tired: 'bg-gray-400',
        relaxed: 'bg-green-400',
    };

    return (
        <div className="flex flex-col items-center p-4 bg-base-200 rounded-2xl">
            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleSelectDate}
                locale={ko}
                modifiers={{
                    happy: hasMood('happy'),
                    sad: hasMood('sad'),
                    angry: hasMood('angry'),
                    tired: hasMood('tired'),
                    relaxed: hasMood('relaxed'),
                }}
                modifiersClassNames={{
                    happy: 'relative after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-yellow-400 after:rounded-full',
                    sad: 'relative after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-blue-400 after:rounded-full',
                    angry: 'relative after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-red-400 after:rounded-full',
                    tired: 'relative after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-gray-400 after:rounded-full',
                    relaxed:
                        'relative after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-green-400 after:rounded-full',
                }}
            />
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
                {Object.entries(moodColors).map(([mood, color]) => {
                    const label =
                        mood === 'happy'
                            ? '기쁨'
                            : mood === 'sad'
                              ? '슬픔'
                              : mood === 'angry'
                                ? '화남'
                                : mood === 'tired'
                                  ? '피곤'
                                  : '편안';
                    return (
                        <div key={mood} className="flex items-center gap-1.5">
                            <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                            <span className="text-xs text-gray-500">{label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
