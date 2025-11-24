import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import EmailField from '@/components/ui/molecules/EmailField';
import '@/app/globals.css';

const meta = {
    title: 'UI/Molecules/EmailField',
    component: EmailField,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onChange: { action: 'changed' },
    },
} satisfies Meta<typeof EmailField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: '이메일',
    },
};

export const WithValue: Story = {
    args: {
        label: '이메일',
        value: 'user@example.com',
    },
};

export const WithError: Story = {
    args: {
        label: '이메일',
        value: 'invalid-email',
        error: '올바른 이메일 형식이 아닙니다',
    },
};

export const WithoutLabel: Story = {
    args: {
        label: '',
        placeholder: '이메일을 입력하세요',
    },
};

export const Large: Story = {
    args: {
        label: '이메일',
        inputSize: 'lg',
    },
};

export const Small: Story = {
    args: {
        label: '이메일',
        inputSize: 'sm',
    },
};
