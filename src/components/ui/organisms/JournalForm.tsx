'use client';
import { useState } from 'react';
import Container from '../atom/Container';
import TextArea from '../atom/TextArea';
import Button from '../atom/Button';

export interface JournalFormProps {
    onSubmit?: (content: string) => void;
    placeholder?: string;
    submitButtonText?: string;
    variant?: 'base-100' | 'base-200' | 'base-300' | 'primary' | 'secondary' | 'accent' | 'neutral';
}

export default function JournalForm({
    onSubmit,
    placeholder = '오늘의 일기를 작성해보세요...',
    submitButtonText = '저장',
    variant = 'base-300',
}: JournalFormProps) {
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        if (content.trim() && onSubmit) {
            onSubmit(content);
            setContent('');
        }
    };

    return (
        <Container variant={variant} padding="xl" gap="md" rounded="2xl" centered={false}>
            <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                className="w-full min-h-[200px] resize-none"
                variant="neutral"
                inputSize="lg"
            />
            <div className="flex justify-end">
                <Button
                    variant="primary"
                    size="md"
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                >
                    {submitButtonText}
                </Button>
            </div>
        </Container>
    );
}
