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
