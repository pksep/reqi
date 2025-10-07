import { ClientError } from '../client-error/client-error';

export class NotFoundError extends ClientError {
  constructor(message: string) {
    message = message || 'Not found';
    super(404, message);
  }
}

export const isNotFoundError = (error: any): error is NotFoundError =>
  error instanceof NotFoundError;
