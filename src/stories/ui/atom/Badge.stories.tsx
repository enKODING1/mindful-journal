import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Badge from '@/components/ui/atom/Badge';
import '@/app/globals.css';

const meta = {
    title: 'UI/Atom/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        color: 'primary',
        children: 'Primary',
    },
};

export const Soft: Story = {
    args: {
        variant: 'soft',
        color: 'primary',
        children: 'Primary',
    },
    render: (args) => (
        <div className="flex flex-wrap gap-2">
            <Badge {...args} color="primary">
                Primary
            </Badge>
            <Badge {...args} color="secondary">
                Secondary
            </Badge>
            <Badge {...args} color="accent">
                Accent
            </Badge>
            <Badge {...args} color="info">
                Info
            </Badge>
            <Badge {...args} color="success">
                Success
            </Badge>
            <Badge {...args} color="warning">
                Warning
            </Badge>
            <Badge {...args} color="error">
                Error
            </Badge>
        </div>
    ),
};

export const Dash: Story = {
    args: {
        variant: 'dash',
        color: 'primary',
        children: 'Primary',
    },
    render: (args) => (
        <div className="flex flex-wrap gap-2">
            <Badge {...args} color="primary">
                Primary
            </Badge>
            <Badge {...args} color="secondary">
                Secondary
            </Badge>
            <Badge {...args} color="accent">
                Accent
            </Badge>
            <Badge {...args} color="info">
                Info
            </Badge>
            <Badge {...args} color="success">
                Success
            </Badge>
            <Badge {...args} color="warning">
                Warning
            </Badge>
            <Badge {...args} color="error">
                Error
            </Badge>
        </div>
    ),
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        color: 'primary',
        children: 'Primary',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        color: 'primary',
        children: 'Primary',
    },
};

export const Sizes: Story = {
    args: {
        color: 'primary',
        children: 'Badge',
    },
    render: (args) => (
        <div className="flex items-center gap-2">
            <Badge {...args} size="xs">
                XS
            </Badge>
            <Badge {...args} size="sm">
                SM
            </Badge>
            <Badge {...args} size="md">
                MD
            </Badge>
            <Badge {...args} size="lg">
                LG
            </Badge>
            <Badge {...args} size="xl">
                XL
            </Badge>
        </div>
    ),
};

export const AllColors: Story = {
    args: {
        children: 'Badge',
    },
    render: (args) => (
        <div className="flex flex-wrap gap-2">
            <Badge {...args} color="neutral">
                Neutral
            </Badge>
            <Badge {...args} color="primary">
                Primary
            </Badge>
            <Badge {...args} color="secondary">
                Secondary
            </Badge>
            <Badge {...args} color="accent">
                Accent
            </Badge>
            <Badge {...args} color="info">
                Info
            </Badge>
            <Badge {...args} color="success">
                Success
            </Badge>
            <Badge {...args} color="warning">
                Warning
            </Badge>
            <Badge {...args} color="error">
                Error
            </Badge>
        </div>
    ),
};
