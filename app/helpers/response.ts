import { Response } from "express";

export interface SuccessResponse {
  status: boolean;
  message: string;
  data: any;
}

export interface ErrorResponse {
  status: boolean;
  message: string;
  error: string;
  details?: ErrorDetail[];
}

interface ErrorDetail {
  field: string;
  issue: string;
}

export const successResponse = (
  res: Response,
  message: string,
  data?: any,
  code?: number
) => {
  const responseObj: SuccessResponse = {
    status: true,
    message,
    ...(data && { data }),
  };

  return res.status(code || 200).json(responseObj);
};

export const errorResponse = (
  res: Response,
  message: string,
  error: string,
  code?: number,
  details?: ErrorDetail[]
) => {
  const responseObj: ErrorResponse = {
    status: false,
    message,
    ...(details && { details }),
    error,
  };
  return res.status(code || 400).json(responseObj);
};
