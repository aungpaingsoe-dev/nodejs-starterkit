import { ErrorRequestHandler } from "express";
import { errorResponse } from "../../helpers/response";

export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  return errorResponse(
    res,
    err.message,
    err.error,
    err.statusCode,
    err.details
  );
};
