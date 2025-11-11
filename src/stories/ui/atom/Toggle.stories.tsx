import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Toggle from '@/components/ui/atom/Toggle';
import React, { useRef, useEffect } from 'react';
import '@/app/globals.css';

const meta = {
    title: 'UI/Atom/Toggle',
    component: Toggle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        color: 'primary',
        size: 'md',
        defaultChecked: true,
    },
};

export const Neutral: Story = {
    args: {
        color: 'neutral',
        size: 'md',
        defaultChecked: true,
    },
};

export const Secondary: Story = {
    args: {
        color: 'secondary',
        size: 'md',
        defaultChecked: true,
    },
};

export const Accent: Story = {
    args: {
        color: 'accent',
        size: 'md',
        defaultChecked: true,
    },
};

export const Success: Story = {
    args: {
        color: 'success',
        size: 'md',
        defaultChecked: true,
    },
};

export const Warning: Story = {
    args: {
        color: 'warning',
        size: 'md',
        defaultChecked: true,
    },
};

export const Info: Story = {
    args: {
        color: 'info',
        size: 'md',
        defaultChecked: true,
    },
};

export const Error: Story = {
    args: {
        color: 'error',
        size: 'md',
        defaultChecked: true,
    },
};

export const Disabled: Story = {
    args: {
        color: 'primary',
        size: 'md',
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        color: 'primary',
        size: 'md',
        disabled: true,
        defaultChecked: true,
    },
};

export const Indeterminate: Story = {
    args: {
        color: 'primary',
        size: 'md',
        id: 'my-toggle',
    },
    render: (args) => {
        const toggleRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (toggleRef.current) {
                toggleRef.current.indeterminate = true;
            }
        }, []);

        return <Toggle {...args} ref={toggleRef} />;
    },
};

export const Sizes: Story = {
    args: {
        color: 'primary',
    },
    render: (args) => (
        <div className="flex items-center gap-4">
            <Toggle {...args} size="xs" defaultChecked />
            <Toggle {...args} size="sm" />
            <Toggle {...args} size="md" />
            <Toggle {...args} size="lg" />
            <Toggle {...args} size="xl" />
        </div>
    ),
};

export const AllColors: Story = {
    args: {
        size: 'md',
    },
    render: (args) => (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <Toggle {...args} color="neutral" defaultChecked />
                <label>Neutral</label>
            </div>
            <div className="flex items-center gap-2">
                <Toggle {...args} color="primary" defaultChecked />
                <label>Primary</label>
            </div>
            <div className="flex items-center gap-2">
                <Toggle {...args} color="secondary" defaultChecked />
                <label>Secondary</label>
            </div>
            <div className="flex items-center gap-2">
                <Toggle {...args} color="accent" defaultChecked />
                <label>Accent</label>
            </div>
            <div className="flex items-center gap-2">
                <Toggle {...args} color="success" defaultChecked />
                <label>Success</label>
            </div>
            <div className="flex items-center gap-2">
                <Toggle {...args} color="warning" defaultChecked />
                <label>Warning</label>
            </div>
            <div className="flex items-center gap-2">
                <Toggle {...args} color="info" defaultChecked />
                <label>Info</label>
            </div>
            <div className="flex items-center gap-2">
                <Toggle {...args} color="error" defaultChecked />
                <label>Error</label>
            </div>
        </div>
    ),
};

export const States: Story = {
    args: {
        color: 'primary',
        size: 'md',
    },
    render: (args) => (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <Toggle {...args} />
                <label>Unchecked</label>
            </div>
            <div className="flex items-center gap-2">
                <Toggle {...args} defaultChecked />
                <label>Checked</label>
            </div>
            <div className="flex items-center gap-2">
                <Toggle {...args} disabled />
                <label>Disabled</label>
            </div>
            <div className="flex items-center gap-2">
                <Toggle {...args} disabled defaultChecked />
                <label>Disabled Checked</label>
            </div>
        </div>
    ),
};
