import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Calendar from '@/components/ui/atom/Calendar';
import '@/app/globals.css';

const meta = {
    title: 'UI/Atom/Calendar',
    component: Calendar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

