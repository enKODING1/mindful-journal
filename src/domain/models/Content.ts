import { Mood } from './Mood';
import { Comment } from './Comment';

export interface Content {
    id: number;
    created_at: string;
    content: string;
    mood: Mood;
    comments?: Comment[];
}

export type ContentsByMood = Record<Mood, Content[]>;
export type SimplifiedContent = Pick<Content, 'created_at' | 'content'>;
export type SimplifiedContentsByMood = Record<Mood, SimplifiedContent[]>;
