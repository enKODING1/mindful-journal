import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import MoodTab from '@/components/ui/molecules/MoodTab';
import '@/app/globals.css';

const meta = {
    title: 'UI/Molecules/MoodTab',
    component: MoodTab,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onChange: { action: 'mood changed' },
    },
} satisfies Meta<typeof MoodTab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        defaultValue: 'happy',
    },
};

export const Sad: Story = {
    args: {
        defaultValue: 'sad',
    },
};

export const Angry: Story = {
    args: {
        defaultValue: 'angry',
    },
};

export const Tired: Story = {
    args: {
        defaultValue: 'tired',
    },
};

export const Relaxed: Story = {
    args: {
        defaultValue: 'relaxed',
    },
};
