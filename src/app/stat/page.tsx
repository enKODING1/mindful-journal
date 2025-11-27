'use client';

import { useEffect, useMemo } from 'react';
import PeriodTab from '@/components/ui/molecules/PeriodTab';
import Container from '@/components/ui/atom/Container';
import JournalStats, { JournalStatsData } from '@/components/ui/organisms/JournalStats';
import MoodDistribution from '@/components/ui/organisms/MoodDistribution';
import { MoodStat } from '@/domain/models';
import MonthlyTrend, { MonthlyData } from '@/components/ui/organisms/MonthlyTrend';
import { useJournals } from '@/hooks';
import {
    calculateCurrentStreak,
    calculateLongestStreak,
    calculateAvgWordCount,
} from '@/domain/utils';

export default function StatPage() {
    const { journals, totalCount, fetchJournals, countJournalsByUser } = useJournals();

    useEffect(() => {
        fetchJournals();
        countJournalsByUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 통계 계산
    const stats: JournalStatsData = useMemo(
        () => ({
            totalCount,
            currentStreak: calculateCurrentStreak(journals),
            longestStreak: calculateLongestStreak(journals),
            avgWordCount: calculateAvgWordCount(journals),
        }),
        [journals, totalCount],
    );

    const moodStats: MoodStat[] = [
        {
            mood: 'happy',
            count: 10,
            percentage: 100,
        },
        {
            mood: 'sad',
            count: 0,
            percentage: 0,
        },
        {
            mood: 'angry',
            count: 0,
            percentage: 0,
        },
        {
            mood: 'tired',
            count: 0,
            percentage: 0,
        },
        {
            mood: 'relaxed',
            count: 0,
            percentage: 0,
        },
    ];

    const monthlyData: MonthlyData[] = [
        {
            month: '2025-11',
            count: 44,
            percentage: 49,
        },
    ];

    return (
        <Container padding="xl" className="flex flex-col gap-4">
            <PeriodTab />
            <JournalStats stats={stats} />
            <MoodDistribution stats={moodStats} />
            <MonthlyTrend data={monthlyData} />
        </Container>
    );
}
