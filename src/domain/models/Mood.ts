export type Mood = 'happy' | 'sad' | 'angry' | 'tired' | 'relaxed';

export interface MoodOption {
    value: string;
    emoji: string;
    label: string;
}

export const moodOptions: MoodOption[] = [
    { value: 'happy', emoji: '😊', label: '기쁨' },
    { value: 'sad', emoji: '😢', label: '슬픔' },
    { value: 'angry', emoji: '😠', label: '화남' },
    { value: 'tired', emoji: '😴', label: '피곤' },
    { value: 'relaxed', emoji: '😌', label: '편안' },
];

export const getMoodEmoji = (mood: Mood): string => {
    return moodOptions.find((option) => option.value === mood)?.emoji || '😐';
};

export const getMoodLabel = (mood: Mood): string => {
    return moodOptions.find((option) => option.value === mood)?.label || '알 수 없음';
};
