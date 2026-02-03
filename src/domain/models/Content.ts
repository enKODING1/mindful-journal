import { Mood } from './Mood';
import { Comment } from './Comment';
import { Question } from './Question';

export interface Content {
    id: string;
    created_at: string;
    content: string;
    mood: Mood;
    question_id?: number;
    question?: Question;
    comments?: Comment[];
}

export type ContentsByMood = Record<Mood, Content[]>;
export type SimplifiedContent = Pick<Content, 'created_at' | 'content'>;
export type SimplifiedContentsByMood = Record<Mood, SimplifiedContent[]>;
