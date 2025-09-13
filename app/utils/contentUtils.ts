import {
    Mood,
    ContentsByMood,
    Content,
    SimplifiedContent,
    SimplifiedContentsByMood,
} from '../dashboard/[tab]/types';

// utils/contentUtils.ts
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
