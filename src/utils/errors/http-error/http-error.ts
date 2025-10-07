export default class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export const isHttpError = (error: any): error is HttpError =>
  error instanceof HttpError;
