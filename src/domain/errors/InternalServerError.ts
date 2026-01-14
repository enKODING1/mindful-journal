import { AppError } from './AppError';

export class InternalServerError extends AppError {
    constructor(message: string = '서버 내부 오류가 발생했습니다.') {
        super(message, 'INTERNAL_ERROR', 500);
    }
}
