import type { Meta, StoryObj } from '@storybook/react';
import JournalDetailView from '@/components/ui/organisms/JournalDetailView';
import type { Content } from '@/domain/models';

const meta = {
    title: 'UI/Organisms/JournalDetailView',
    component: JournalDetailView,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof JournalDetailView>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockJournal: Content = {
    id: '550e8400-e29b-41d4-a716-446655440001',
    created_at: '2024-11-26T10:30:00',
    content:
        '오늘은 정말 특별한 하루였다.\n\n아침에 일어나서 창밖을 보니 날씨가 너무 좋았다. 오랜만에 산책을 나가기로 결심하고 근처 공원으로 향했다.\n\n공원에는 사람들이 생각보다 많았지만, 나무 그늘 아래 벤치에 앉아 책을 읽으며 시간을 보냈다. 바람이 시원하게 불어와서 정말 기분이 좋았다.\n\n점심은 평소 가고 싶었던 새로운 카페에서 먹었다. 파스타가 정말 맛있었고, 분위기도 좋아서 다음에 또 방문하고 싶다.\n\n오후에는 친구와 만나서 오랜만에 수다를 떨었다. 그동안 못 만났던 시간을 보상받는 느낌이었다.\n\n저녁에는 집에 돌아와서 조용히 일기를 쓰며 하루를 마무리했다. 오늘처럼 평범하지만 소중한 하루가 더 많았으면 좋겠다.',
    mood: 'happy',
};

const mockSadJournal: Content = {
    id: '550e8400-e29b-41d4-a716-446655440002',
    created_at: '2024-11-25T22:15:00',
    content:
        '오늘은 힘든 하루였다.\n\n아침부터 여러 가지 일이 겹쳐서 정신이 없었다. 업무도 잘 풀리지 않고, 사람들과의 관계에서도 작은 마찰이 있었다.\n\n점심시간에는 혼자 조용히 시간을 보내며 마음을 가라앉히려 노력했다.\n\n내일은 더 나은 하루가 되기를 바란다.',
    mood: 'sad',
};

const mockRelaxedJournal: Content = {
    id: '550e8400-e29b-41d4-a716-446655440003',
    created_at: '2024-11-24T15:00:00',
    content:
        '일요일 오후의 평화\n\n오늘은 아무 계획 없이 집에서 쉬는 날이다. 좋아하는 음악을 틀어놓고 커피를 마시며 책을 읽었다.\n\n가끔은 이렇게 아무것도 하지 않는 시간이 필요하다는 것을 느꼈다.',
    mood: 'relaxed',
};

export const Happy: Story = {
    args: {
        journal: mockJournal,
        onBack: () => {
            console.log('Back button clicked');
        },
    },
};

export const Sad: Story = {
    args: {
        journal: mockSadJournal,
        onBack: () => {
            console.log('Back button clicked');
        },
    },
};

export const Relaxed: Story = {
    args: {
        journal: mockRelaxedJournal,
        onBack: () => {
            console.log('Back button clicked');
        },
    },
};

export const WithoutBackButton: Story = {
    args: {
        journal: mockJournal,
        // onBack를 제공하지 않으면 돌아가기 버튼이 표시되지 않음
    },
};

export const ShortContent: Story = {
    args: {
        journal: {
            id: '550e8400-e29b-41d4-a716-446655440004',
            created_at: '2024-11-23T12:00:00',
            content: '짧은 일기 테스트',
            mood: 'happy',
        },
        onBack: () => {
            console.log('Back button clicked');
        },
    },
};
