import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StatCard from '@/components/ui/molecules/StatCard';
import Avatar from '@/components/ui/atom/Avatar';
import { PencilLine } from 'lucide-react';
import '@/app/globals.css';

const meta = {
    title: 'UI/Molecules/StatCard',
    component: StatCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof StatCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StatCardExample: Story = {
    args: {
        title: '42',
        text: `총 일기 수`,
        size: 'xs',
        className: 'bg-success/12 shadow-xs',
    },
};
