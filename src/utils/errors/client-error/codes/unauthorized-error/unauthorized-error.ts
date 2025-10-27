import { ClientError } from '../../client-error';

export class UnauthorizedError extends ClientError {
  constructor(message: string) {
    message = message || 'Unauthorized';
    super(401, message);
  }
}

export const isUnauthorizedError = (error: any): error is UnauthorizedError =>
  error instanceof UnauthorizedError;
