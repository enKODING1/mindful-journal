export type EncryptedComment = { iv: string; data: string };

export interface AIComment {
    id: number;
    content_id: string;
    user_id: string;
    comment: EncryptedComment;
    decryptedComment?: string;
    created_at: string;
    model_version?: string;
}
