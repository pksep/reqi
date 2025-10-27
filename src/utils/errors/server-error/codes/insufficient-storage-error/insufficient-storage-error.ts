import { ServerError } from '../../server-error';

/**
 * The method could not be performed on the resource because the server is
 * unable to store the representation needed to successfully complete the request.
 */
export class InsufficientStorageError extends ServerError {
  constructor() {
    super(507, 'Insufficient storage');
  }
}

export const isInsufficientStorageError = (
  error: any
): error is InsufficientStorageError =>
  error instanceof InsufficientStorageError;
