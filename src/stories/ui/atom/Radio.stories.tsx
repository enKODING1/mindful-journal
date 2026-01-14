import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Radio from '@/components/ui/atom/Radio';
import '@/app/globals.css';

const meta = {
    title: 'UI/Atom/Radio',
    component: Radio,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        color: 'primary',
        size: 'md',
        name: 'radio-1',
        defaultChecked: true,
    },
};

export const Neutral: Story = {
    args: {
        color: 'neutral',
        size: 'md',
        name: 'radio-2',
        defaultChecked: true,
    },
};

export const Secondary: Story = {
    args: {
        color: 'secondary',
        size: 'md',
        name: 'radio-3',
        defaultChecked: true,
    },
};

export const Accent: Story = {
    args: {
        color: 'accent',
        size: 'md',
        name: 'radio-4',
        defaultChecked: true,
    },
};

export const Success: Story = {
    args: {
        color: 'success',
        size: 'md',
        name: 'radio-5',
        defaultChecked: true,
    },
};

export const Warning: Story = {
    args: {
        color: 'warning',
        size: 'md',
        name: 'radio-6',
        defaultChecked: true,
    },
};

export const Info: Story = {
    args: {
        color: 'info',
        size: 'md',
        name: 'radio-7',
        defaultChecked: true,
    },
};

export const Error: Story = {
    args: {
        color: 'error',
        size: 'md',
        name: 'radio-8',
        defaultChecked: true,
    },
};

export const Disabled: Story = {
    args: {
        color: 'primary',
        size: 'md',
        name: 'radio-9',
        disabled: true,
    },
};

export const Sizes: Story = {
    args: {
        color: 'primary',
        name: 'radio-sizes',
    },
    render: (args) => (
        <div className="flex items-center gap-4">
            <Radio {...args} size="xs" defaultChecked />
            <Radio {...args} size="sm" />
            <Radio {...args} size="md" />
            <Radio {...args} size="lg" />
            <Radio {...args} size="xl" />
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
                <Radio {...args} color="neutral" name="radio-colors" defaultChecked />
                <label>Neutral</label>
            </div>
            <div className="flex items-center gap-2">
                <Radio {...args} color="primary" name="radio-colors" />
                <label>Primary</label>
            </div>
            <div className="flex items-center gap-2">
                <Radio {...args} color="secondary" name="radio-colors" />
                <label>Secondary</label>
            </div>
            <div className="flex items-center gap-2">
                <Radio {...args} color="accent" name="radio-colors" />
                <label>Accent</label>
            </div>
            <div className="flex items-center gap-2">
                <Radio {...args} color="success" name="radio-colors" />
                <label>Success</label>
            </div>
            <div className="flex items-center gap-2">
                <Radio {...args} color="warning" name="radio-colors" />
                <label>Warning</label>
            </div>
            <div className="flex items-center gap-2">
                <Radio {...args} color="info" name="radio-colors" />
                <label>Info</label>
            </div>
            <div className="flex items-center gap-2">
                <Radio {...args} color="error" name="radio-colors" />
                <label>Error</label>
            </div>
        </div>
    ),
};
