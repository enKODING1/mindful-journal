'use client';

import { useState } from 'react';
import PeriodTab from '@/components/ui/molecules/PeriodTab';
import Container from '@/components/ui/atom/Container';
import JournalStats from '@/components/ui/organisms/JournalStats';
import MoodDistribution from '@/components/ui/organisms/MoodDistribution';
import { toMoodStats } from '@/domain/utils/journalUtils';
import type { JournalStats as JournalStatsModel } from '@/domain/models';
// import MonthlyTrend from '@/components/ui/organisms/MonthlyTrend';

interface StatClientProps {
    initialJournals: JournalStatsModel;
}

export default function StatClient({ initialJournals }: StatClientProps) {
    const [period, setPeriod] = useState<'week' | 'month' | 'year' | 'all'>('all');
    const currentStat = initialJournals[period];
    const currentStreak = initialJournals.currentStreak;
    const longestStreak = initialJournals.longestStreak;

    return (
        <Container padding="xl" className="flex flex-col gap-8" variant="base-100">
            <PeriodTab value={period} onChange={setPeriod} />
            {currentStreak > 0 ? (
                <p className="text-xl">
                    🔥 {currentStreak}일 연속 작성 중이에요! (최장 기록 {longestStreak}일)
                </p>
            ) : longestStreak > 0 ? (
                <p className="text-xl">
                    오늘 일기로 다시 시작해보세요. 최장 기록은 {longestStreak}일이에요!
                </p>
            ) : (
                <p className="text-xl">첫 일기를 시작해보세요!</p>
            )}
            <JournalStats stats={currentStat} />
            <MoodDistribution stats={toMoodStats(currentStat.moods, currentStat.count)} />
            {/* <MonthlyTrend data={monthlyData} /> */}
        </Container>
    );
}
