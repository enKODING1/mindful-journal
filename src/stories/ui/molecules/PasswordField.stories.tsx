import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PasswordField from '@/components/ui/molecules/PasswordField';
import '@/app/globals.css';

const meta = {
    title: 'UI/Molecules/PasswordField',
    component: PasswordField,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onChange: { action: 'changed' },
    },
} satisfies Meta<typeof PasswordField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: '비밀번호',
    },
};

export const WithValue: Story = {
    args: {
        label: '비밀번호',
        value: 'mypassword123',
    },
};

export const WithError: Story = {
    args: {
        label: '비밀번호',
        value: '123',
        error: '비밀번호는 6자 이상이어야 합니다',
    },
};

export const WithoutToggle: Story = {
    args: {
        label: '비밀번호',
        showToggle: false,
    },
};

export const WithoutLabel: Story = {
    args: {
        label: '',
        placeholder: '비밀번호를 입력하세요',
    },
};

export const Large: Story = {
    args: {
        label: '비밀번호',
        inputSize: 'lg',
    },
};

export const Small: Story = {
    args: {
        label: '비밀번호',
        inputSize: 'sm',
    },
};

export const ConfirmPassword: Story = {
    args: {
        label: '비밀번호 확인',
        placeholder: '비밀번호를 다시 입력하세요',
    },
};
