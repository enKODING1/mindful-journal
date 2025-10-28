export abstract class AppError extends Error {
    readonly statusCode: number;
    readonly code: string;
    readonly isOperational: boolean;

    constructor(message: string, code: string, statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
