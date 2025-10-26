export type Mood = 'happy' | 'sad' | 'angry' | 'tired' | 'relaxed';
export type ContentsByMood = Record<Mood, Content[]>;
export type SimplifiedContent = Pick<Content, 'created_at' | 'content'>;
export type SimplifiedContentsByMood = Record<Mood, SimplifiedContent[]>;

export interface Content {
    id: number;
    created_at: string;
    content: string;
    mood: Mood;
    comments?: Comment[];
}

export interface Comment {
    id: number;
    content_id: number;
    comment_body: string;
    created_at: string;
}

export interface Profile {
    id: number;
    user_id: string;
    alias: string;
    email: string;
    gender: string;
    created_at: string;
}

export interface ProfileFormData {
    alias: string;
    email: string;
    bio?: string;
}

export interface ProfileUpdatePayload {
    alias?: string;
    email?: string;
    updated_at?: string;
}
