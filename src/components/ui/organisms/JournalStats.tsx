'use client';

import StatCard from '../molecules/StatCard';
import { JournalStat } from '@/domain/models';

export interface JournalStatsData {
    totalCount: number;
    currentStreak: number;
    longestStreak: number;
    avgWordCount: number;
}

export interface JournalStatsProps {
    stats: JournalStat;
    className?: string;
}

export default function JournalStats({ stats, className = '' }: JournalStatsProps) {
    return (
        <div className={`grid grid-cols-2 sm:grid-cols-2 gap-2 ${className} `}>
            <StatCard
                title={stats.count.toString()}
                text="총 일기 수"
                color="secondary"
                size="xs"
                className="bg-base-200"
            />
            <StatCard
                title={stats.totalWordCount.toString()}
                text="총 단어 수"
                color="secondary"
                size="xs"
                className="bg-base-200"
            />
            {/* <StatCard
                title={stats.longestStreak.toString()}
                text="최장 연속일"
                color="secondary"
                size="xs"
                className="bg-base-200"
            />
            <StatCard
                title={stats.avgWordCount.toString()}
                text="평균 글자 수"
                color="secondary"
                size="xs"
                className="bg-base-200"
            /> */}
        </div>
    );
}
