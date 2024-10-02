import { APIErrorTypes } from "../utils";

export class APIError extends Error {
    public code: number;
    public type: string;

    constructor(message: string, code: number, type: APIErrorTypes = "APIError") {
        super(message);
        this.code = code;
        this.type = type;

        return this;
    }

    static fromError(error: Error): APIError {
        return new APIError(error.message, 500, "APIError");
    }

    isValidationError(): this is ValidationError {
        return this.type === "ValidationError";
    }

    isNotFoundError(): this is NotFoundError {
        return this.type === "NotFoundError";
    }

    isBadRequestError(): this is BadRequestError {
        return this.type === "BadRequestError";
    }

    isInternalServerError(): this is InternalServerError {
        return this.type === "InternalServerError";
    }

    isAPIError(): this is APIError {
        return this.type === "APIError";
    }
}

export class NotFoundError extends APIError {
    constructor(message: string) {
        super(message, 404, "NotFoundError");
    }
}

export class BadRequestError extends APIError {
    constructor(message: string) {
        super(message, 400, "BadRequestError");
    }
}

export class ValidationError extends APIError {
    public errors: any;

    constructor(errors: any) {
        super("Validation Failed", 422, "ValidationError");
        this.errors = errors;
    }
}

export class InternalServerError extends APIError {
    constructor(message: string) {
        super(message, 500, "InternalServerError");
    }
}