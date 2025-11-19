import type { FeatureCardProps } from '../molecules/FeatureCard';
import FeatureCard from '../molecules/FeatureCard';
import Avatar from '../atom/Avatar';
import Container from '../atom/Container';
import { CalendarClock, PenLine, ChartNoAxesColumn, BookOpen } from 'lucide-react';

const featureCards: FeatureCardProps[] = [
    {
        title: '자유로운 기록',
        text: '하루의 감정과 생각을 자유롭게 표현해보세요.',
        size: 'xs',
        className: 'bg-success/10 shadow-xs',
        avatar: <Avatar size="md" icon={<PenLine />} />,
    },
    {
        title: 'AI 성찰 도우미',
        text: 'AI가 제안하는 성찰 질문으로 더 깊이 생각해보세요',
        size: 'xs',
        className: 'bg-primary/10 shadow-xs',
        avatar: <Avatar size="md" icon={<CalendarClock />} />,
    },
    {
        title: '성장 추적',
        text: '시간이 지나며 변화하는 마음을 확인해보요',
        size: 'xs',
        className: 'bg-warning/10 shadow-xs',
        avatar: <Avatar size="md" icon={<ChartNoAxesColumn />} />,
    },
];

export default function JournalEmptyState() {
    return (
        <Container variant="base-300" padding="xl" gap="md" rounded="2xl" centered={false}>
            <div className="flex flex-col w-full items-center gap-3">
                <Avatar size="lg" icon={<BookOpen />} />
                <div className="flex flex-col items-center">
                    <h3 className="text-xl bold font-bold">첫 번째 일기를 작성해보세요</h3>
                    <p>
                        마음챙김 일기와 함께 하루하루의 소중한 순간들을 기록하고, 내면의 성장을
                        경험해보세요.
                    </p>
                </div>
            </div>
            <div className="flex w-full gap-3">
                {featureCards.map((card) => (
                    <FeatureCard key={card.title} {...card} />
                ))}
            </div>
        </Container>
    );
}
