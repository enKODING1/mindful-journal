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
    const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');
    const currentStat = initialJournals[period];

    return (
        <Container padding="xl" className="flex flex-col gap-8" variant="base-100">
            <PeriodTab value={period} onChange={setPeriod} />
            <JournalStats stats={currentStat} />
            <MoodDistribution stats={toMoodStats(currentStat.moods, currentStat.count)} />
            {/* <MonthlyTrend data={monthlyData} /> */}
        </Container>
    );
}
