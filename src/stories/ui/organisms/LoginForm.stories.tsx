import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import LoginForm from '@/components/ui/organisms/LoginForm';
import '@/app/globals.css';

const meta = {
    title: 'UI/Organisms/LoginForm',
    component: LoginForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onSubmit: { action: 'submitted' },
    },
} satisfies Meta<typeof LoginForm>;

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
