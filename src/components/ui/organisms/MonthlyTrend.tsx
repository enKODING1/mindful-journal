'use client';

import TrendBar from '../molecules/TrendBar';
import Container from '../atom/Container';

export interface MonthlyData {
    month: string;
    count: number;
    percentage: number;
}

export interface MonthlyTrendProps {
    data: MonthlyData[];
    title?: string;
    className?: string;
}

export default function MonthlyTrend({
    data,
    title = '월별 추이',
    className = '',
}: MonthlyTrendProps) {
    if (data.length === 0) {
        return (
            <Container
                variant="base-100"
                padding="xl"
                gap="md"
                rounded="2xl"
                className={className}
                centered={false}
            >
                <h3 className="text-xl font-bold">월별 추이</h3>
                <p className="text-base-content/70">아직 보관된 일기가 없습니다.</p>
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
            <h3 className="text-xl font-bold mb-2">{title}</h3>

            <div className="flex flex-col gap-4">
                {data.map((item) => (
                    <TrendBar
                        key={item.month}
                        label={item.month}
                        count={item.count}
                        value={item.percentage}
                        variant="success"
                    />
                ))}
            </div>
        </Container>
    );
}
