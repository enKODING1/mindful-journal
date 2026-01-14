import type { Meta, StoryObj } from '@storybook/react';
import MonthlyTrend from '@/components/ui/organisms/MonthlyTrend';
import type { MonthlyData } from '@/components/ui/organisms/MonthlyTrend';

const meta = {
    title: 'UI/Organisms/MonthlyTrend',
    component: MonthlyTrend,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof MonthlyTrend>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data matching the uploaded image
const mockData: MonthlyData[] = [
    { month: '10월', count: 18, percentage: 50 },
    { month: '11월', count: 22, percentage: 65 },
    { month: '12월', count: 26, percentage: 80 },
    { month: '1월', count: 24, percentage: 70 },
];

export const Default: Story = {
    args: {
        data: mockData,
    },
};

export const SingleMonth: Story = {
    args: {
        data: [{ month: '12월', count: 26, percentage: 100 }],
    },
};

export const LongPeriod: Story = {
    args: {
        data: [
            { month: '1월', count: 15, percentage: 40 },
            { month: '2월', count: 20, percentage: 55 },
            { month: '3월', count: 18, percentage: 50 },
            { month: '4월', count: 22, percentage: 60 },
            { month: '5월', count: 25, percentage: 70 },
            { month: '6월', count: 30, percentage: 85 },
            { month: '7월', count: 28, percentage: 80 },
            { month: '8월', count: 24, percentage: 65 },
            { month: '9월', count: 26, percentage: 75 },
            { month: '10월', count: 32, percentage: 90 },
            { month: '11월', count: 29, percentage: 82 },
            { month: '12월', count: 35, percentage: 100 },
        ],
    },
};

export const CustomTitle: Story = {
    args: {
        data: mockData,
        title: '최근 4개월 활동',
    },
};
