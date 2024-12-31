"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = exports.BadRequestException = exports.UnauthorizedException = exports.NotFoundException = exports.Exception = exports.statusCodes = exports.exceptionMessages = void 0;
exports.exceptionMessages = {
    notFound: "Not Found",
    unauthorized: "Unauthorized",
    forbidden: "Forbidden",
    badRequest: "Bad Request",
    internalServerError: "Internal Server Error",
    conflict: "Conflict",
    tooManyRequests: "Too Many Requests",
    serviceUnavailable: "Service Unavailable",
    validationError: "Validation Error",
};
exports.statusCodes = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};
class Exception extends Error {
    statusCode;
    error;
    constructor(statusCode, message, error) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
    }
}
exports.Exception = Exception;
class NotFoundException extends Error {
    statusCode;
    error;
    constructor(message = exports.exceptionMessages.notFound) {
        super(message);
        this.statusCode = exports.statusCodes.NOT_FOUND;
        this.error = exports.exceptionMessages.notFound;
    }
}
exports.NotFoundException = NotFoundException;
class UnauthorizedException extends Error {
    statusCode;
    error;
    constructor(message = exports.exceptionMessages.unauthorized) {
        super(message);
        this.statusCode = exports.statusCodes.UNAUTHORIZED;
        this.error = exports.exceptionMessages.unauthorized;
    }
}
exports.UnauthorizedException = UnauthorizedException;
class BadRequestException extends Error {
    statusCode;
    error;
    constructor(message = exports.exceptionMessages.badRequest) {
        super(message);
        this.statusCode = exports.statusCodes.BAD_REQUEST;
        this.error = exports.exceptionMessages.badRequest;
    }
}
exports.BadRequestException = BadRequestException;
class ValidationException extends Error {
    statusCode;
    error;
    details;
    constructor(message = exports.exceptionMessages.validationError, details) {
        super(message);
        this.statusCode = exports.statusCodes.BAD_REQUEST;
        this.error = exports.exceptionMessages.validationError;
        this.details = details;
    }
}
exports.ValidationException = ValidationException;
