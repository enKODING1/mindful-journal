'use client';

import { useState } from 'react';
import Container from '../atom/Container';
import TextArea from '../atom/TextArea';
import Button from '../atom/Button';
import MoodTab from '../molecules/MoodTab';
import { Mood } from '@/domain/models/Mood';

export interface JournalFormProps {
    onSubmit?: (content: string, mood: Mood) => void;
    placeholder?: string;
    submitButtonText?: string;
    variant?: 'base-100' | 'base-200' | 'base-300' | 'primary' | 'secondary' | 'accent' | 'neutral';
}

export default function JournalForm({
    onSubmit,
    placeholder = '오늘의 일기를 작성해보세요...',
    submitButtonText = '저장',
    variant = 'base-100',
}: JournalFormProps) {
    const [content, setContent] = useState('');
    const [mood, setMood] = useState<Mood>('happy');

    const handleSubmit = () => {
        if (content.trim() && onSubmit) {
            onSubmit(content, mood);
            setContent('');
            setMood('happy');
        }
    };

    return (
        <Container variant={variant} padding="md" gap="md" rounded="2xl" centered={false}>
            <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                className="w-full min-h-[200px] resize-none bg-base-300"
                variant="neutral"
                inputSize="lg"
            />
            <div className="flex flex-col">
                <p>오늘의 기분은 어떠셨나요?</p>
                <MoodTab defaultValue={mood} onChange={(value) => setMood(value)} />
            </div>
            <div className="flex w-full">
                <Button
                    variant="primary"
                    size="md"
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                    className="w-full"
                >
                    {submitButtonText}
                </Button>
            </div>
        </Container>
    );
}
