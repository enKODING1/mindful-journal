export type Mood = 'happy' | 'sad' | 'angry' | 'tired' | 'relaxed';

export interface MoodOption {
    value: string;
    emoji: string;
    label: string;
    image: string;
}

export const moodOptions: MoodOption[] = [
    { value: 'happy', emoji: '😊', label: '기쁨', image: '/images/moods/joy.png' },
    { value: 'sad', emoji: '😢', label: '슬픔', image: '/images/moods/sadness.png' },
    { value: 'angry', emoji: '😠', label: '화남', image: '/images/moods/anger.png' },
    { value: 'tired', emoji: '😴', label: '피곤', image: '/images/moods/tired.png' },
    { value: 'relaxed', emoji: '😌', label: '편안', image: '/images/moods/relaxed.png' },
];

export const getMoodEmoji = (mood: Mood): string => {
    return moodOptions.find((option) => option.value === mood)?.emoji || '😐';
};

export const getMoodLabel = (mood: Mood): string => {
    return moodOptions.find((option) => option.value === mood)?.label || '알 수 없음';
};

export const getMoodImage = (mood: Mood): string => {
    return moodOptions.find((option) => option.value === mood)?.image || '';
};

export interface MoodStat {
    mood: Mood;
    count: number;
    percentage: number;
}
