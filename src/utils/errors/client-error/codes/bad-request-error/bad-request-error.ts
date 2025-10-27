import { ClientError } from '../../client-error';

export class BadRequestError extends ClientError {
  constructor(message: string) {
    message = message || 'Bad request';
    super(400, message);
  }
}

export const isBadRequestError = (error: any): error is BadRequestError =>
  error instanceof BadRequestError;
