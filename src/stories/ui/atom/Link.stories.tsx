import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Link from '@/components/ui/atom/Link';
import '@/app/globals.css';

const meta = {
    title: 'UI/Atom/Link',
    component: Link,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        href: '#',
        color: 'primary',
        underline: true,
        children: 'Primary Link',
    },
};
export const External: Story = {
    args: {
        href: 'https://example.com',
        color: 'primary',
        underline: true,
        children: 'External Link',
    },
};

export const AllColors: Story = {
    args: { href: '#' },
    render: () => (
        <div className="flex flex-col gap-4">
            <Link href="#" color="neutral" underline={true}>
                Neutral Link
            </Link>
            <Link href="#" color="primary" underline={true}>
                Primary Link
            </Link>
            <Link href="#" color="secondary" underline={true}>
                Secondary Link
            </Link>
            <Link href="#" color="accent" underline={true}>
                Accent Link
            </Link>
            <Link href="#" color="success" underline={true}>
                Success Link
            </Link>
            <Link href="#" color="info" underline={true}>
                Info Link
            </Link>
            <Link href="#" color="warning" underline={true}>
                Warning Link
            </Link>
            <Link href="#" color="error" underline={true}>
                Error Link
            </Link>
        </div>
    ),
};

export const UnderlineVariants: Story = {
    args: { href: '#' },
    render: () => (
        <div className="flex flex-col gap-4">
            <Link href="#" color="primary" underline={true}>
                Always Underlined
            </Link>
            <Link href="#" color="primary" underline={false}>
                Hover to Underline
            </Link>
        </div>
    ),
};
