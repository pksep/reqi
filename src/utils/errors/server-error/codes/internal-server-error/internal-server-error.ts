import { ServerError } from '../../server-error';

export class InternalServerError extends ServerError {
  constructor(message: string) {
    super(500, message);
  }
}

export const isInternalServerError = (
  error: any
): error is InternalServerError => error instanceof InternalServerError;
