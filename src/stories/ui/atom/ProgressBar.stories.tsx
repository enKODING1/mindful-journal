import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProgressBar from '@/components/ui/atom/ProgressBar';
import '@/app/globals.css';

const meta = {
    title: 'UI/Atom/ProgressBar',
    component: ProgressBar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        value: 50,
        className: 'w-56',
    },
};

export const AllVariants: Story = {
    args: {
        value: 50,
    },
    render: (args) => (
        <div className="flex flex-col gap-4 w-96">
            <ProgressBar {...args} variant="primary" value={50} />
            <ProgressBar {...args} variant="secondary" value={50} />
            <ProgressBar {...args} variant="accent" value={50} />
            <ProgressBar {...args} variant="success" value={75} />
            <ProgressBar {...args} variant="warning" value={60} />
            <ProgressBar {...args} variant="error" value={40} />
            <ProgressBar {...args} variant="info" value={30} />
            <ProgressBar {...args} variant="neutral" value={50} />
        </div>
    ),
};
