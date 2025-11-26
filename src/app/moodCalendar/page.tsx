'use client';

import JournalCalendar from '@/components/ui/organisms/JournalCalendar';
import Container from '@/components/ui/atom/Container';

export default function MoodCalendar() {
    return (
        <Container className="mt-10" variant="base-100" padding="xl" gap="lg" rounded="2xl">
            <h2 className="text-2xl font-bold">기분 캘린더</h2>
            <p className="text-base-content/70">일기를 작성한 날짜를 확인할 수 있습니다.</p>

            <JournalCalendar />
        </Container>
    );
}
