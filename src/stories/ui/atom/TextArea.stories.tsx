import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import TextArea from '@/components/ui/atom/TextArea';
import '@/app/globals.css';

const meta = {
    title: 'UI/Atom/TextArea',
    component: TextArea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextAreaComponent: Story = {
    args: {
        variant: 'neutral',
        inputSize: 'md',
        placeholder: '입력하세요',
    },
};
