'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/ui/atom/Button';
import { Mood } from '@/domain/models/Mood';

export type MoodTabProps = {
    defaultValue?: Mood;
    onChange?: (value: Mood) => void;
};

const moodTabs: { label: string; value: Mood }[] = [
    { label: '행복', value: 'happy' },
    { label: '슬픔', value: 'sad' },
    { label: '화남', value: 'angry' },
    { label: '피곤', value: 'tired' },
    { label: '편안', value: 'relaxed' },
];

export default function MoodTab({ defaultValue = 'happy', onChange }: MoodTabProps) {
    const [selectedMood, setSelectedMood] = useState<Mood>(defaultValue);

    useEffect(() => {
        setSelectedMood(defaultValue);
    }, [defaultValue]);

    const handleSelect = (value: Mood) => {
        if (value === selectedMood) return;
        setSelectedMood(value);
        onChange?.(value);
    };
    return (
        <div className="w-full  rounded-xl">
            {moodTabs.map((tab) => (
                <Button
                    key={tab.value}
                    className="m-1"
                    soft={!(selectedMood === tab.value)}
                    onClick={() => handleSelect(tab.value)}
                >
                    {tab.label}
                </Button>
            ))}
        </div>
    );
}
