import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Card from '@/components/ui/atom/Card';
import Button from '@/components/ui/atom/Button';
import '@/app/globals.css';

const meta = {
    title: 'UI/Atom/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        className: 'w-96 shadow-sm',
        children: (
            <>
                <div className="card-body">
                    <h2 className="card-title">hello</h2>
                    <p>
                        a card component has a figure, a body part, and inside body there are title
                        and actions parts
                    </p>
                </div>
            </>
        ),
    },
};
