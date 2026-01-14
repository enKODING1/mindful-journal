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
    value?: string; // Controlled value
    defaultValue?: string;
    onChange?: (value: string) => void;
};

export default function TabGroup({ items, value, defaultValue, onChange }: TabGroupProps) {
    const [selectedValue, setSelectedValue] = useState<string>(
        value || defaultValue || items[0]?.value,
    );

    // Update internal state when external value changes (controlled)
    useEffect(() => {
        if (value !== undefined) {
            setSelectedValue(value);
        }
    }, [value]);

    // Update internal state when defaultValue changes (uncontrolled)
    useEffect(() => {
        if (value === undefined && defaultValue) {
            setSelectedValue(defaultValue);
        }
    }, [defaultValue, value]);

    const handleSelect = (newValue: string) => {
        if (newValue === selectedValue) return;

        // If controlled, only call onChange
        if (value !== undefined) {
            onChange?.(newValue);
        } else {
            // If uncontrolled, update internal state and call onChange
            setSelectedValue(newValue);
            onChange?.(newValue);
        }
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
