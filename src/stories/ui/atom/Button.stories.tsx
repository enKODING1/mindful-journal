import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import Button from '@/components/ui/atom/Button';
import '@/app/globals.css';

const meta = {
    title: 'UI/Atom/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        soft: false,
        variant: 'primary',
        size: 'sm',
        children: 'Button',
    },
};

export const Secondary: Story = {
    args: {
        soft: false,
        variant: 'secondary',
        size: 'sm',
        children: 'Button',
    },
};

export const Ghost: Story = {
    args: {
        soft: false,
        variant: 'ghost',
        size: 'sm',
        children: 'Button',
    },
};
