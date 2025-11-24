'use client';

import { useState, useEffect } from 'react';
import Container from '../atom/Container';
import Button from '../atom/Button';

export type TabItem = {
    label: string;
    value: string;
};

export type TabGroupProps = {
    items: TabItem[];
    defaultValue?: string;
    onChange?: (value: string) => void;
};

export default function TabGroup({ items, defaultValue, onChange }: TabGroupProps) {
    const [selectedValue, setSelectedValue] = useState<string>(defaultValue || items[0]?.value);

    useEffect(() => {
        if (defaultValue) {
            setSelectedValue(defaultValue);
        }
    }, [defaultValue]);

    const handleSelect = (value: string) => {
        if (value === selectedValue) return;
        setSelectedValue(value);
        onChange?.(value);
    };

    return (
        <Container
            variant="base-300"
            padding="xs"
            gap="xs"
            rounded="xl"
            className="flex-row"
            centered={false}
        >
            {items.map((item) => (
                <Button
                    key={item.value}
                    variant={selectedValue === item.value ? 'primary' : 'ghost'}
                    soft={selectedValue !== item.value}
                    onClick={() => handleSelect(item.value)}
                    className="flex-1"
                >
                    {item.label}
                </Button>
            ))}
        </Container>
    );
}
