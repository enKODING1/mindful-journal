export interface Profile {
    id: number;
    user_id: string;
    alias: string | null;
    email: string | null;
    avatar_url: string | null;
    created_at: string;
}

export interface ProfileFormData {
    alias: string;
    email: string;
}

export interface ProfileUpdatePayload {
    alias?: string;
    email?: string;
    avatar_url?: string;
}
