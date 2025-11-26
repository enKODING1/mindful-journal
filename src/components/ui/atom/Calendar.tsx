'use client';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export default function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={className}
            classNames={{
                ...classNames,
            }}
            {...props}
        />
    );
}
