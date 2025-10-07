import HttpError from '../http-error/http-error';

export default class ServerError extends HttpError {
  constructor(public status: number, message: string) {
    message = message || 'Server error';
    super(status, message);
  }
}

export const isServerError = (error: any): error is ServerError =>
  error instanceof ServerError;
