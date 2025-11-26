import type { Meta, StoryObj } from '@storybook/react';
import JournalCard from '@/components/ui/molecules/JournalCard';
import type { Mood } from '@/domain/models';

const meta = {
    title: 'UI/Molecules/JournalCard',
    component: JournalCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        mood: {
            control: 'select',
            options: ['happy', 'sad', 'angry', 'tired', 'relaxed'] as Mood[],
        },
    },
} satisfies Meta<typeof JournalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Happy: Story = {
    args: {
        date: '26',
        dayOfWeek: '화',
        title: '오늘은 정말 특별한 하루였다',
        content: '친구의 일이나서 집밥을 보니 맛있어 잘 먹었다. 오랜만에 산책을 나갔는데...',
        mood: 'happy',
    },
};

export const Sad: Story = {
    args: {
        date: '25',
        dayOfWeek: '월',
        title: '힘든 하루',
        content: '오늘은 여러 가지 일이 겹쳐서 마음이 무거웠다. 하지만 내일은 나아질 거라 믿는다.',
        mood: 'sad',
    },
};

export const Relaxed: Story = {
    args: {
        date: '24',
        dayOfWeek: '일',
        title: '평온한 일요일',
        content: '집에서 조용히 책을 읽으며 시간을 보냈다. 가끔은 이런 시간이 필요하다.',
        mood: 'relaxed',
    },
};

export const WithoutDayOfWeek: Story = {
    args: {
        date: '23',
        title: '요일 없이',
        content: '요일 표시가 없어도 깔끔하게 보입니다.',
        mood: 'happy',
    },
};

export const LongContent: Story = {
    args: {
        date: '22',
        dayOfWeek: '금',
        title: '긴 제목을 가진 일기 - 오늘은 정말 정말 많은 일이 있었던 최고의 하루',
        content:
            '오늘은 아침부터 저녁까지 정말 많은 일들이 있었습니다. 새로운 프로젝트를 시작했고, 팀원들과 회의도 했으며, 점심에는 맛있는 음식도 먹었습니다. 저녁에는 운동도 하고 친구들과 시간도 보냈습니다. 정말 알찬 하루였습니다. 이 텍스트는 line-clamp-2에 의해 2줄로 제한됩니다.',
        mood: 'happy',
    },
};
