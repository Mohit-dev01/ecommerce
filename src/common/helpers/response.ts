type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

type ErrorResponse = {
  success: false;
  message: string;
};

export function sendSuccess<T>(
  res: any,
  message: string,
  data: T,
  status = 200,
) {
  return res.status(status).json({
    success: true,
    message,
    data,
  } as SuccessResponse<T>);
}

export function sendError(res: any, message: string, status = 500) {
  return res.status(status).json({
    success: false,
    message,
  } as ErrorResponse);
}
