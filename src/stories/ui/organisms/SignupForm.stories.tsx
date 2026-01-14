import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SignupForm from '@/components/ui/organisms/SignupForm';
import '@/app/globals.css';

const meta = {
    title: 'UI/Organisms/SignupForm',
    component: SignupForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onSubmit: { action: 'submitted' },
    },
} satisfies Meta<typeof SignupForm>;

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
        error: '이미 사용 중인 이메일입니다',
    },
};
