'use client';

import TabGroup from './TabGroup';

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
    return (
        <TabGroup
            items={periodTabs}
            defaultValue={defaultValue}
            onChange={(value) => onChange?.(value as Period)}
        />
    );
}
