import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import Avatar from '@/components/ui/atom/Avatar';
import { PencilLine } from 'lucide-react';
// import '@/app/globals.css';

const meta = {
    title: 'UI/Atom/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onClick: fn() },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const srcAvatar: Story = {
    args: {
        src: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
    },
};

export const iconAvatar: Story = {
    args: {
        icon: <PencilLine />,
    },
};

export const emptyAvatar: Story = {
    args: {},
};
