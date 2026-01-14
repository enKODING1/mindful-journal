import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PeriodTab from '@/components/ui/molecules/PeriodTab';
import '@/app/globals.css';

const meta = {
    title: 'UI/Molecules/PeriodTab',
    component: PeriodTab,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        onChange: {
            action: 'changed',
            description: '기간 선택이 바뀔 때 호출됩니다.',
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PeriodTab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        defaultValue: 'week',
    },
};
