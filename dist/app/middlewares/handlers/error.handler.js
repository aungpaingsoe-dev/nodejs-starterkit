"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = require("../../helpers/response");
const errorHandler = (err, req, res, next) => {
    return (0, response_1.errorResponse)(res, err.message, err.error, err.statusCode, err.details);
};
exports.errorHandler = errorHandler;
