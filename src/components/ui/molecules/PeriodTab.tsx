'use client';

import TabGroup from './TabGroup';

type Period = 'week' | 'month' | 'year' | 'all';

export type PeriodTabProps = {
    value?: Period;
    defaultValue?: Period;
    onChange?: (value: Period) => void;
};

const periodTabs: { label: string; value: Period }[] = [
    { label: '주', value: 'week' },
    { label: '달', value: 'month' },
    { label: '년', value: 'year' },
    { label: '전체', value: 'all' },
];

export default function PeriodTab({ value, defaultValue = 'week', onChange }: PeriodTabProps) {
    return (
        <TabGroup
            items={periodTabs}
            value={value}
            defaultValue={defaultValue}
            onChange={(value) => onChange?.(value as Period)}
        />
    );
}
