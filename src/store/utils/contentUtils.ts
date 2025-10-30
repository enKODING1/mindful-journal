import { Content, SimplifiedContent, SimplifiedContentsByMood } from '@/store/models';
import { Mood } from '../models/Mood';

// 일기를 기분별로 그룹화
export const groupContentsByMood = (contents: Content[]): SimplifiedContentsByMood => {
    return contents.reduce((acc, content) => {
        const mood = content.mood as Mood;
        if (!acc[mood]) {
            acc[mood] = [];
        }
        acc[mood].push({
            created_at: content.created_at,
            content: content.content,
        });
        return acc;
    }, {} as SimplifiedContentsByMood);
};
