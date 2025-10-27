import { ClientError } from '../../client-error';

export class MethodNotAllowedError extends ClientError {
  constructor(message: string) {
    message = message || 'Method not allowed';
    super(405, message);
  }
}

export const isMethodNotAllowedError = (
  error: any
): error is MethodNotAllowedError => error instanceof MethodNotAllowedError;
