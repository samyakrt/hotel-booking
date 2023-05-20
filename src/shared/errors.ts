import type { ExtractedErrorsType } from '@/types/validation';
import HttpStatusCode from 'http-status-codes';

export abstract class CustomError extends Error {
    public readonly httpStatus = HttpStatusCode.BAD_REQUEST;

    constructor(message: string, httpStatus:  number) {
        super(message);
        this.httpStatus = httpStatus;
    }
}

export class UnexpectedError extends CustomError {
    public static readonly httpStatus = HttpStatusCode.INTERNAL_SERVER_ERROR;
    public static readonly message = 'Server Error';

    constructor(message =UnexpectedError.message ) {
        super(message,UnexpectedError.httpStatus);
    }
}

export class BadRequestError extends CustomError {
    public static readonly httpStatus = HttpStatusCode.BAD_REQUEST;
    public static readonly message = 'Bad Request';

    constructor(message = BadRequestError.message) {
        super(message,UnexpectedError.httpStatus);
    }
}

export class UnauthorizedError extends CustomError {
    public static readonly httpStatus = HttpStatusCode.UNAUTHORIZED;
    public static readonly message = 'Unauthorized';

    constructor(message = UnauthorizedError.message) {
        super(message,UnauthorizedError.httpStatus);
    }
}

export class ForbiddenError extends CustomError {
    public static readonly httpStatus = HttpStatusCode.FORBIDDEN;
    public static readonly message = 'Bad Request';

    constructor(message = ForbiddenError.message ) {
        super(message,ForbiddenError.httpStatus);
    }
}

export class NotFoundError extends CustomError {
    public static readonly httpStatus = HttpStatusCode.NOT_FOUND;
    public static readonly message = 'Not Found';

    constructor(message = ForbiddenError.message ) {
        super(message,ForbiddenError.httpStatus);
    }
}

export class ValidationFailedError extends CustomError {
    public static readonly httpStatus = HttpStatusCode.UNPROCESSABLE_ENTITY;
    public static readonly message = 'Validation failed';

    constructor(message = ValidationFailedError.message,public errors : ExtractedErrorsType) {
        super(message,ValidationFailedError.httpStatus);
    }
}
