import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MoodStat from '@/components/ui/molecules/MoodStat';
import '@/app/globals.css';

const meta = {
    title: 'UI/Molecules/MoodStat',
    component: MoodStat,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof MoodStat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FeatureCardPrimary: Story = {
    args: {
        mood: 'angry',
        value: 40,
    },
};
export const FeatureCardAll: Story = {
    args: {
        mood: 'happy',
        value: 50,
    },
    render: (args) => (
        <div className="flex flex-col gap-4 w-96">
            <MoodStat mood={'happy'} value={40} />
            <MoodStat mood={'angry'} value={40} />
            <MoodStat mood={'sad'} value={40} />
            <MoodStat mood={'tired'} value={40} />
            <MoodStat mood={'relaxed'} value={40} />
        </div>
    ),
};
