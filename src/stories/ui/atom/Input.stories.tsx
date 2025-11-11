import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import Input from '@/components/ui/atom/Input';
import '@/app/globals.css';

const meta = {
    title: 'UI/Atom/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InputComponent: Story = {
    args: {
        variant: 'neutral',
        inputSize: 'md',
        placeholder: '입력하세요',
    },
};
