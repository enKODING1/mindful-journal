'use client';

import { useEffect, useMemo, useState } from 'react';
import PeriodTab from '@/components/ui/molecules/PeriodTab';
import Container from '@/components/ui/atom/Container';
import JournalStats, { JournalStatsData } from '@/components/ui/organisms/JournalStats';
import MoodDistribution from '@/components/ui/organisms/MoodDistribution';
import MonthlyTrend from '@/components/ui/organisms/MonthlyTrend';
import { Content } from '@/domain/models';
import { decryptText } from '@/lib/crypto';
import { getMasterKey } from '@/lib/useMasterKey';
import {
    calculateCurrentStreak,
    calculateLongestStreak,
    calculateAvgWordCount,
    filterByPeriod,
    calculateMoodDistribution,
    calculateMonthlyTrend,
} from '@/domain/utils';

interface StatClientProps {
    initialJournals: Content[];
}

export default function StatClient({ initialJournals }: StatClientProps) {
    const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');
    const [decryptedJournals, setDecryptedJournals] = useState<Content[]>([]);

    useEffect(() => {
        const decryptAll = async () => {
            const masterKey = getMasterKey();
            if (!masterKey) {
                setDecryptedJournals(initialJournals);
                return;
            }

            const cryptoKey = await crypto.subtle.importKey(
                'raw',
                masterKey as BufferSource,
                { name: 'AES-GCM' },
                false,
                ['decrypt'],
            );

            const decrypted = await Promise.all(
                initialJournals.map(async (journal) => {
                    try {
                        if (journal.content?.iv && journal.content?.data) {
                            const decryptedContent = await decryptText(journal.content, cryptoKey);
                            return { ...journal, decryptedContent };
                        }
                        return { ...journal, decryptedContent: '' };
                    } catch {
                        return { ...journal, decryptedContent: '' };
                    }
                }),
            );
            setDecryptedJournals(decrypted);
        };
        decryptAll();
    }, [initialJournals]);

    const filteredJournals = useMemo(
        () => filterByPeriod(decryptedJournals, period),
        [decryptedJournals, period],
    );

    const stats: JournalStatsData = useMemo(
        () => ({
            totalCount: filteredJournals.length,
            currentStreak: calculateCurrentStreak(filteredJournals),
            longestStreak: calculateLongestStreak(filteredJournals),
            avgWordCount: calculateAvgWordCount(filteredJournals),
        }),
        [filteredJournals],
    );

    const moodStats = useMemo(
        () => calculateMoodDistribution(filteredJournals),
        [filteredJournals],
    );

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
