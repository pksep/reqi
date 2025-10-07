import HttpError from '../http-error/http-error';

export default class ClientError extends HttpError {
  constructor(public status: number, message: string) {
    message = message || 'Client error';
    super(status, message);
  }
}

export const isClientError = (error: any): error is ClientError =>
  error instanceof ClientError;
