import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import JournalForm from '@/components/ui/organisms/JournalForm';
import '@/app/globals.css';

const meta = {
    title: 'UI/Organisms/JournalForm',
    component: JournalForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onSubmit: { action: 'submitted' },
    },
} satisfies Meta<typeof JournalForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomPlaceholder: Story = {
    args: {
        placeholder: '오늘 하루는 어떠셨나요?',
    },
};

export const WithCustomButton: Story = {
    args: {
        submitButtonText: '제출하기',
    },
};

export const DifferentVariant: Story = {
    args: {
        variant: 'base-200',
    },
};
