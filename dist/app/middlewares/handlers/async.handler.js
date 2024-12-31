"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (callback) => {
    return async (req, res, next) => {
        try {
            await callback(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.asyncHandler = asyncHandler;
