import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import AuthForm from '@/components/ui/organisms/AuthForm';
import '@/app/globals.css';

const meta = {
    title: 'UI/Organisms/AuthForm',
    component: AuthForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onLogin: { action: 'login submitted' },
        onSignup: { action: 'signup submitted' },
    },
} satisfies Meta<typeof AuthForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const Loading: Story = {
    args: {
        loading: true,
    },
};

export const WithError: Story = {
    args: {
        error: '이메일 또는 비밀번호가 올바르지 않습니다',
    },
};
