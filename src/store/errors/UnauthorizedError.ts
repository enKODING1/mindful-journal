import { AppError } from './AppError';

export class UnauthorizedError extends AppError {
    constructor() {
        super('인증이 필요합니다.', 'UNAUTHORIZED', 401);
    }
}
