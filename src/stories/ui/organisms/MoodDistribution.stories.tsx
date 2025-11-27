import type { Meta, StoryObj } from '@storybook/react';
import MoodDistribution from '@/components/ui/organisms/MoodDistribution';
import type { MoodStat } from '@/domain/models';

const meta = {
    title: 'UI/Organisms/MoodDistribution',
    component: MoodDistribution,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof MoodDistribution>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data matching the uploaded image
const mockStats: MoodStat[] = [
    { mood: 'happy', count: 8, percentage: 33 },
    { mood: 'relaxed', count: 6, percentage: 25 },
    { mood: 'angry', count: 5, percentage: 21 },
    { mood: 'tired', count: 3, percentage: 13 },
    { mood: 'sad', count: 2, percentage: 8 },
];

export const Default: Story = {
    args: {
        stats: mockStats,
    },
};

export const Empty: Story = {
    args: {
        stats: [],
    },
};

export const SingleMood: Story = {
    args: {
        stats: [{ mood: 'happy', count: 10, percentage: 100 }],
    },
};

export const EqualDistribution: Story = {
    args: {
        stats: [
            { mood: 'happy', count: 4, percentage: 20 },
            { mood: 'sad', count: 4, percentage: 20 },
            { mood: 'angry', count: 4, percentage: 20 },
            { mood: 'tired', count: 4, percentage: 20 },
            { mood: 'relaxed', count: 4, percentage: 20 },
        ],
    },
};
