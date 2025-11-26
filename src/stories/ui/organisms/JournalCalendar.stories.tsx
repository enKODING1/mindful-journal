import type { Meta, StoryObj } from '@storybook/react';
import JournalCalendar from '@/components/ui/organisms/JournalCalendar';

const meta = {
    title: 'UI/Organisms/JournalCalendar',
    component: JournalCalendar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof JournalCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
