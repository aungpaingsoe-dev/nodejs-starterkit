export const exceptionMessages = {
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

export const statusCodes = {
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

export class Exception extends Error {
  public statusCode: number;
  public error: string;

  constructor(statusCode: number, message: string, error: string) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}

export class NotFoundException extends Error {
  public statusCode: number;
  public error: string;

  constructor(message = exceptionMessages.notFound) {
    super(message);
    this.statusCode = statusCodes.NOT_FOUND;
    this.error = exceptionMessages.notFound;
  }
}

export class UnauthorizedException extends Error {
  public statusCode: number;
  public error: string;

  constructor(message = exceptionMessages.unauthorized) {
    super(message);
    this.statusCode = statusCodes.UNAUTHORIZED;
    this.error = exceptionMessages.unauthorized;
  }
}

export class BadRequestException extends Error {
  public statusCode: number;
  public error: string;

  constructor(message = exceptionMessages.badRequest) {
    super(message);
    this.statusCode = statusCodes.BAD_REQUEST;
    this.error = exceptionMessages.badRequest;
  }
}

export class ValidationException extends Error {
  public statusCode: number;
  public error: string;
  public details: any;

  constructor(message = exceptionMessages.validationError, details: any) {
    super(message);
    this.statusCode = statusCodes.BAD_REQUEST;
    this.error = exceptionMessages.validationError;
    this.details = details;
  }
}
