import { ClientError } from '../../client-error';

export class ForbiddenError extends ClientError {
  constructor(message: string) {
    message = message || 'Forbidden';
    super(403, message);
  }
}

export const isForbiddenError = (error: any): error is ForbiddenError =>
  error instanceof ForbiddenError;
