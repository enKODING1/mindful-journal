'use client';

import { useRouter } from 'next/navigation';
import JournalDetailView from '@/components/ui/organisms/JournalDetailView';
import Container from '@/components/ui/atom/Container';
import type { Content } from '@/domain/models';

interface JournalDetailClientProps {
    journal: Content | null;
    error?: string;
}

export default function JournalDetailClient({ journal, error }: JournalDetailClientProps) {
    const router = useRouter();

    const handleBack = () => {
        router.push('/');
    };

    if (error || !journal) {
        return (
            <Container className="mt-10" variant="base-300" padding="xl" gap="lg" rounded="2xl">
                <div className="text-center py-12">
                    <p className="text-error mb-4">{error || '일기를 찾을 수 없습니다'}</p>
                    <button onClick={handleBack} className="btn btn-primary">
                        목록으로 돌아가기
                    </button>
                </div>
            </Container>
        );
    }

    return (
        <div className="mt-10">
            <JournalDetailView journal={journal} onBack={handleBack} />
        </div>
    );
}
