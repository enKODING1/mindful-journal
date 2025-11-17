'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/ui/atom/Button';

type Period = 'week' | 'month' | 'year';

export type PeriodTabProps = {
    defaultValue?: Period;
    onChange?: (value: Period) => void;
};

const periodTabs: { label: string; value: Period }[] = [
    { label: '이번 주', value: 'week' },
    { label: '이번 달', value: 'month' },
    { label: '올해', value: 'year' },
];

export default function PeriodTab({ defaultValue = 'week', onChange }: PeriodTabProps) {
    const [selectedPeriod, setSelectedPeriod] = useState<Period>(defaultValue);

    useEffect(() => {
        setSelectedPeriod(defaultValue);
    }, [defaultValue]);

    const handleSelect = (value: Period) => {
        if (value === selectedPeriod) return;
        setSelectedPeriod(value);
        onChange?.(value);
    };
    return (
        <div className="bg-white w-full border-2 rounded-xl">
            {periodTabs.map((tab) => (
                <Button
                    key={tab.value}
                    className="m-1"
                    soft={!(selectedPeriod === tab.value)}
                    onClick={() => handleSelect(tab.value)}
                >
                    {tab.label}
                </Button>
            ))}
        </div>
    );
}
