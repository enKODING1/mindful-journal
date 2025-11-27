'use client';

import { useEffect, useMemo, useState } from 'react';
import PeriodTab from '@/components/ui/molecules/PeriodTab';
import Container from '@/components/ui/atom/Container';
import JournalStats, { JournalStatsData } from '@/components/ui/organisms/JournalStats';
import MoodDistribution from '@/components/ui/organisms/MoodDistribution';
import MonthlyTrend from '@/components/ui/organisms/MonthlyTrend';
import { useJournals } from '@/hooks';
import {
    calculateCurrentStreak,
    calculateLongestStreak,
    calculateAvgWordCount,
    filterByPeriod,
    calculateMoodDistribution,
    calculateMonthlyTrend,
} from '@/domain/utils';

export default function StatPage() {
    const { journals, fetchJournals } = useJournals();
    const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');

    useEffect(() => {
        fetchJournals();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 기간별 필터링
    const filteredJournals = useMemo(() => filterByPeriod(journals, period), [journals, period]);

    // 통계 계산 (필터링된 데이터로)
    const stats: JournalStatsData = useMemo(
        () => ({
            totalCount: filteredJournals.length,
            currentStreak: calculateCurrentStreak(filteredJournals),
            longestStreak: calculateLongestStreak(filteredJournals),
            avgWordCount: calculateAvgWordCount(filteredJournals),
        }),
        [filteredJournals],
    );

    // 감정 분포 계산 (필터링된 데이터로)
    const moodStats = useMemo(
        () => calculateMoodDistribution(filteredJournals),
        [filteredJournals],
    );

    // 월별 추이 계산 (필터링된 데이터로)
    const monthlyData = useMemo(() => calculateMonthlyTrend(filteredJournals), [filteredJournals]);

    return (
        <Container padding="xl" className="flex flex-col gap-4">
            <PeriodTab value={period} onChange={setPeriod} />
            <JournalStats stats={stats} />
            <MoodDistribution stats={moodStats} />
            <MonthlyTrend data={monthlyData} />
        </Container>
    );
}
