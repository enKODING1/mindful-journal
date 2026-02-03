'use client';

import Link from 'next/link';
import { Home, SquarePen, Search } from 'lucide-react';
import Container from '@/components/ui/atom/Container';

export default function NotFound() {
    return (
        <Container className="mt-10" variant="base-300" padding="xl" gap="lg" rounded="2xl">
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-8xl mb-6">🍃</div>

                <h1 className="text-4xl font-bold mb-4">길을 잃으셨나요?</h1>

                <p className="text-base-content/70 text-lg mb-2">
                    찾으시는 페이지가 존재하지 않아요.
                </p>
                <p className="text-base-content/50 mb-8">잠시 멈추고, 깊은 숨을 쉬어보세요.</p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/" className="btn btn-primary gap-2">
                        <Home size={18} />
                        일기 목록으로
                    </Link>
                    <Link href="/write" className="btn btn-outline gap-2">
                        <SquarePen size={18} />새 일기 쓰기
                    </Link>
                </div>
            </div>
        </Container>
    );
}
