
export class CustomError extends Error {

    private constructor(
        public readonly error: boolean,
        public readonly statusCode: number,
        public readonly message: string,
    ) {
        super(message);
    }

    static badRequest(message: string): CustomError {
        return new CustomError(true, 400, message);
    }

    static unauthorized(message: string): CustomError {
        return new CustomError(true, 401, message);
    }

    static forbidden(message: string): CustomError {
        return new CustomError(true, 403, message);
    }

    static notFound(message: string): CustomError {
        return new CustomError(true, 404, message);
    }

    static internalError(message: string): CustomError {
        return new CustomError(true, 500, message);
    }
    
}
