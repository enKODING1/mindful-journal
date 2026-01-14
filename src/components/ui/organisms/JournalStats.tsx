'use client';

import StatCard from '../molecules/StatCard';

export interface JournalStatsData {
    totalCount: number;
    currentStreak: number;
    longestStreak: number;
    avgWordCount: number;
}

export interface JournalStatsProps {
    stats: JournalStatsData;
    className?: string;
}

export default function JournalStats({ stats, className = '' }: JournalStatsProps) {
    return (
        <div className={`grid grid-cols-4 gap-4 ${className} `}>
            <StatCard
                title={stats.totalCount.toString()}
                text="총 일기 수"
                color="primary"
                size="xs"
                className="bg-primary/10"
            />
            <StatCard
                title={stats.currentStreak.toString()}
                text="연속 작성일"
                color="success"
                size="xs"
                className="bg-success/10"
            />
            <StatCard
                title={stats.longestStreak.toString()}
                text="최장 연속일"
                color="secondary"
                size="xs"
                className="bg-secondary/10"
            />
            <StatCard
                title={stats.avgWordCount.toString()}
                text="평균 글자 수"
                color="warning"
                size="xs"
                className="bg-warning/10"
            />
        </div>
    );
}
