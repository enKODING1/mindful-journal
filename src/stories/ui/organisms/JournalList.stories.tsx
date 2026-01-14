import type { Meta, StoryObj } from '@storybook/react';
import JournalList from '@/components/ui/organisms/JournalList';
import type { Content } from '@/domain/models';

const meta = {
    title: 'UI/Organisms/JournalList',
    component: JournalList,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof JournalList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockJournals: Content[] = [
    {
        id: 1,
        created_at: '2024-11-26T10:00:00',
        content:
            '오늘은 정말 특별한 하루였다\n아침에 일어나서 창밖을 보니 맑았어 잘 먹었다. 오랜만에 산책을 나갔는데...',
        mood: 'happy',
    },
    {
        id: 2,
        created_at: '2024-11-25T10:00:00',
        content:
            '새로운 프로젝트 시작\n드디어 새로운 프로젝트를 시작했다. 설레는 마음 빡, 걱정되는 마음 반이다...',
        mood: 'happy',
    },
    {
        id: 3,
        created_at: '2024-11-24T10:00:00',
        content:
            '독서로 채운 여유로운 일요일\n오늘은 하루 종일 집에서 책을 읽었다. 최근에 산 소설이 너무 재미있어서...',
        mood: 'relaxed',
    },
    {
        id: 4,
        created_at: '2024-10-31T10:00:00',
        content:
            '할로윈 파티에 다녀왔다\n친구들과 함께한 할로윈 파티. 재미있는 코스튬들과 맛있는 음식들...',
        mood: 'happy',
    },
    {
        id: 5,
        created_at: '2024-10-28T10:00:00',
        content:
            '고요한 밤의 생각들\n밤에 조용히 혼자만의 생각에 잠겼다. 요요요요요.. 자기계발을...',
        mood: 'tired',
    },
];

export const Default: Story = {
    args: {
        journals: mockJournals,
        onJournalClick: (journal) => {
            console.log('Clicked journal:', journal);
        },
    },
};

export const Empty: Story = {
    args: {
        journals: [],
    },
};

export const SingleMonth: Story = {
    args: {
        journals: mockJournals.slice(0, 3),
    },
};
