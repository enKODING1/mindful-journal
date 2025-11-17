import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TrendBar from '@/components/ui/molecules/TrendBar';
import '@/app/globals.css';

const meta = {
    title: 'UI/Molecules/TrendBar',
    component: TrendBar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TrendBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TrendBarStory: Story = {
    args: {
        date: '10월',
        count: 2,
        value: 40,
    },
};
