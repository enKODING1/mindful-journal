import { AppError } from './AppError';

export class NotFoundError extends AppError {
    constructor(resource: string = '리소스를') {
        super(`${resource} 찾을 수 없습니다.`, 'NOT_FOUND', 404);
    }
}
