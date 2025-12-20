'use client';

import Image from 'next/image';
import { getMoodImage, getMoodLabel, MoodStat } from '@/domain/models';
import ProgressBar from '../atom/ProgressBar';
import Container from '../atom/Container';

export interface MoodDistributionProps {
    stats: MoodStat[];
    className?: string;
}

export default function MoodDistribution({ stats, className = '' }: MoodDistributionProps) {
    if (stats.length === 0) {
        return (
            <Container
                variant="base-100"
                padding="xl"
                gap="md"
                rounded="2xl"
                className={className}
                centered={false}
            >
                <h3 className="text-xl font-bold">감정 분포</h3>
                <p className="text-base-content/70">아직 기록된 감정이 없습니다.</p>
            </Container>
        );
    }

    return (
        <Container
            variant="base-100"
            padding="xl"
            gap="md"
            rounded="2xl"
            className={className}
            centered={false}
        >
            <h3 className="text-xl font-bold">감정 분포</h3>

            <div className="flex flex-col gap-4">
                {stats.map(({ mood, count, percentage }) => (
                    <div key={mood} className="flex items-center gap-3">
                        {/* Emoji */}
                        <span className="flex-shrink-0">
                            <Image
                                src={getMoodImage(mood)}
                                alt={mood}
                                width={30}
                                height={30}
                                className="w-[30px] h-[30px]"
                            />
                        </span>

                        {/* Label */}
                        <span className="text-base font-medium w-12 flex-shrink-0">
                            {getMoodLabel(mood)}
                        </span>

                        {/* Progress Bar Container */}
                        <div className="flex-1 flex items-center gap-3">
                            <ProgressBar variant="success" value={percentage} className="flex-1" />
                        </div>

                        {/* Count and Percentage */}
                        <span className="text-sm text-base-content/70 flex-shrink-0 w-20 text-right">
                            {count}회 ({percentage}%)
                        </span>
                    </div>
                ))}
            </div>
        </Container>
    );
}
