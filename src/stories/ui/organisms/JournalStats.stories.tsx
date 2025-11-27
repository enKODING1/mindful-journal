import type { Meta, StoryObj } from '@storybook/react';
import JournalStats from '@/components/ui/organisms/JournalStats';
import type { JournalStatsData } from '@/components/ui/organisms/JournalStats';

const meta = {
    title: 'UI/Organisms/JournalStats',
    component: JournalStats,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof JournalStats>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data matching the uploaded image
const mockStats: JournalStatsData = {
    totalCount: 24,
    currentStreak: 7,
    longestStreak: 15,
    avgWordCount: 156,
};

export const Default: Story = {
    args: {
        stats: mockStats,
    },
};

export const NoData: Story = {
    args: {
        stats: {
            totalCount: 0,
            currentStreak: 0,
            longestStreak: 0,
            avgWordCount: 0,
        },
    },
};

export const HighNumbers: Story = {
    args: {
        stats: {
            totalCount: 1234,
            currentStreak: 365,
            longestStreak: 500,
            avgWordCount: 2500,
        },
    },
};
