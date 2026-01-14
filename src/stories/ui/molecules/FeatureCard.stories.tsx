import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FeatureCard from '@/components/ui/molecules/FeatureCard';
import Avatar from '@/components/ui/atom/Avatar';
import { PencilLine } from 'lucide-react';
import '@/app/globals.css';

const meta = {
    title: 'UI/Molecules/FeatureCard',
    component: FeatureCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof FeatureCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FeatureCardPrimary: Story = {
    args: {
        avatar: <Avatar size="md" icon={<PencilLine />} variant="accent" />,
        title: '자유로운 기록',
        text: `하루의 감정과 생각을 자유롭게 표현해보세요.`,
        size: 'xs',
        className: 'bg-success/12 shadow-xs',
    },
};
