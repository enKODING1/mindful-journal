'use client';

import JournalCard from '../molecules/JournalCard';
import type { Content } from '@/domain/models';

export interface JournalListProps {
    journals: Content[];
    onJournalClick?: (journal: Content) => void;
}

interface GroupedJournals {
    yearMonth: string;
    journals: Content[];
}

// 날짜를 "YYYY년 MM월" 형식으로 변환
const formatYearMonth = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
};

// 날짜를 "DD" 형식으로 변환
const formatDay = (dateString: string): string => {
    const date = new Date(dateString);
    return date.getDate().toString();
};

// 요일을 한글로 변환
const formatDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    return daysOfWeek[date.getDay()];
};

// 일기를 월별로 그룹화
const groupJournalsByMonth = (journals: Content[]): GroupedJournals[] => {
    const grouped = journals.reduce(
        (acc, journal) => {
            const yearMonth = formatYearMonth(journal.created_at);
            if (!acc[yearMonth]) {
                acc[yearMonth] = [];
            }
            acc[yearMonth].push(journal);
            return acc;
        },
        {} as Record<string, Content[]>,
    );

    // 최신 월부터 정렬
    return Object.entries(grouped)
        .map(([yearMonth, journals]) => ({
            yearMonth,
            journals: journals.sort(
                (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
            ),
        }))
        .sort((a, b) => {
            const dateA = new Date(a.journals[0].created_at).getTime();
            const dateB = new Date(b.journals[0].created_at).getTime();
            return dateB - dateA;
        });
};

export default function JournalList({ journals, onJournalClick }: JournalListProps) {
    const groupedJournals = groupJournalsByMonth(journals);

    return (
        <div className="flex flex-col gap-6">
            {groupedJournals.map((group) => (
                <div key={group.yearMonth} className="flex flex-col gap-4">
                    {/* 월별 헤더 */}
                    <h2 className="text-2xl font-bold text-base-content">{group.yearMonth}</h2>

                    {/* 해당 월의 일기 목록 */}
                    <div className="flex flex-col gap-3">
                        {group.journals.map((journal) => (
                            <JournalCard
                                key={journal.id}
                                date={formatDay(journal.created_at)}
                                dayOfWeek={formatDayOfWeek(journal.created_at)}
                                title={journal.content.split('\n')[0] || '제목 없음'}
                                content={journal.content}
                                mood={journal.mood}
                                onClick={() => onJournalClick?.(journal)}
                            />
                        ))}
                    </div>
                </div>
            ))}

            {/* 빈 상태 */}
            {journals.length === 0 && (
                <div className="text-center py-12 text-base-content/50">
                    <p className="text-lg">아직 작성된 일기가 없습니다.</p>
                    <p className="text-sm mt-2">첫 일기를 작성해보세요!</p>
                </div>
            )}
        </div>
    );
}
