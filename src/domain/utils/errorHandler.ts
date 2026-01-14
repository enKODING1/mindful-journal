import { AppError, InternalServerError } from '../errors';

export function handleError(error: unknown): AppError {
    if (error instanceof AppError) {
        return error;
    }

    if (error instanceof Error) {
        return new InternalServerError(error.message);
    }

    return new InternalServerError('알 수 없는 오류가 발생했습니다.');
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof AppError) {
        return error.message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return '알 수 없는 오류가 발생했습니다.';
}
