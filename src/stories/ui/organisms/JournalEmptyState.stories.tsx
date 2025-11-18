import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import JournalEmptyState from '@/components/ui/organisms/JournalEmptyState';
import '@/app/globals.css';

const meta = {
    title: 'UI/Organisms/JournalEmptyState',
    component: JournalEmptyState,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof JournalEmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
