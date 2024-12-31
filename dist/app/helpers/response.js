"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, message, data, code) => {
    const responseObj = {
        status: true,
        message,
        ...(data && { data }),
    };
    return res.status(code || 200).json(responseObj);
};
exports.successResponse = successResponse;
const errorResponse = (res, message, error, code, details) => {
    const responseObj = {
        status: false,
        message,
        ...(details && { details }),
        error,
    };
    return res.status(code || 400).json(responseObj);
};
exports.errorResponse = errorResponse;
