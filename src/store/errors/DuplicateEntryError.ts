import { AppError } from './AppError';

export class DuplicateEntryError extends AppError {
    constructor(message: string = '오늘은 이미 일기를 작성하셨습니다.') {
        super(message, 'DUPLICATE_ENTRY', 409);
    }
}
