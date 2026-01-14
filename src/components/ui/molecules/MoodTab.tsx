'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Button from '@/components/ui/atom/Button';
import { Mood, moodOptions } from '@/domain/models/Mood';

export type MoodTabProps = {
    defaultValue?: Mood;
    onChange?: (value: Mood) => void;
};

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
            {moodOptions.map((option) => (
                <Button
                    key={option.value}
                    className="m-1"
                    soft={!(selectedMood === option.value)}
                    onClick={() => handleSelect(option.value as Mood)}
                >
                    <div className="flex items-center gap-2">
                        <Image
                            src={option.image}
                            alt={option.label}
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                        {option.label}
                    </div>
                </Button>
            ))}
        </div>
    );
}
