'use client';

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';

export default function Calendar() {
    const [date, setDate] = useState<Date | undefined>();
    return (
        <>
            <DayPicker
                className="react-day-picker"
                mode="single"
                selected={date}
                onSelect={setDate}
            />
        </>
    );
}
