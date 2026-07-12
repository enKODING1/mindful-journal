import { Mood } from './Mood';
import { AIComment } from './Comment';
import { Question } from './Question';

export type EncryptedContent = { iv: string; data: string };
export type EncryptedTitle = { iv: string; data: string };

export interface Content {
    id: string;
    created_at: string;
    content: EncryptedContent;
    decryptedContent?: string;
    mood: Mood;
    question_id?: number;
    question?: Question;
    title: EncryptedTitle;
    decryptedTitle?: string;
    ai_comments?: AIComment[];
}

export type ContentsByMood = Record<Mood, Content[]>;
export type SimplifiedContent = Pick<Content, 'created_at' | 'content'>;
export type SimplifiedContentsByMood = Record<Mood, SimplifiedContent[]>;

export type MoodCounts = Record<Mood, number>;

export type JournalStat = {
    count: number;
    totalWordCount: number;
    moods: MoodCounts;
};

export type JournalStats = {
    currentStreak: number;
    longestStreak: number;
    week: JournalStat;
    month: JournalStat;
    year: JournalStat;
    all: JournalStat;
};
