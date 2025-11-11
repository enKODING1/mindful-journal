import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Loading from '@/components/ui/atom/Loading';
import '@/app/globals.css';

const meta = {
    title: 'UI/Atom/Loading',
    component: Loading,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ring: Story = {
    args: {
        size: 'md',
    },
};

export const Sizes: Story = {
    args: {
        size: 'md',
    },
    render: (args) => (
        <div className="flex items-center gap-4">
            <Loading {...args} size="xs" />
            <Loading {...args} size="sm" />
            <Loading {...args} size="md" />
            <Loading {...args} size="lg" />
            <Loading {...args} size="xl" />
        </div>
    ),
};
