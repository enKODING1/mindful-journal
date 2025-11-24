import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TabGroup from '@/components/ui/molecules/TabGroup';
import '@/app/globals.css';

const meta = {
    title: 'UI/Molecules/TabGroup',
    component: TabGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onChange: { action: 'tab changed' },
    },
} satisfies Meta<typeof TabGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [
            { label: '로그인', value: 'login' },
            { label: '회원가입', value: 'signup' },
        ],
        defaultValue: 'login',
    },
};

export const ThreeTabs: Story = {
    args: {
        items: [
            { label: '홈', value: 'home' },
            { label: '프로필', value: 'profile' },
            { label: '설정', value: 'settings' },
        ],
        defaultValue: 'home',
    },
};

export const ManyTabs: Story = {
    args: {
        items: [
            { label: '전체', value: 'all' },
            { label: '기쁨', value: 'happy' },
            { label: '슬픔', value: 'sad' },
            { label: '화남', value: 'angry' },
            { label: '평온', value: 'calm' },
        ],
        defaultValue: 'all',
    },
};
