import JournalForm from '@/components/ui/organisms/JournalForm';
import journalFormProps from '@/components/ui/organisms/JournalForm';
import Container from '@/components/ui/atom/Container';

export default function Home() {
    return (
        <Container className="mt-10" variant="base-300" padding="xl" gap="md" rounded="2xl">
            <h2 className="text-2xl font-bold">오늘의 일기</h2>
            <p>하루중 기억하고 싶은 순간은 무엇인가요?</p>
            <JournalForm {...journalFormProps} />
        </Container>
    );
}
