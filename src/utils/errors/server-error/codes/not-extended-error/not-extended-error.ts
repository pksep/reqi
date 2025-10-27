import { ServerError } from '../../server-error';

/**
 * The client request declares an HTTP Extension (RFC 2774)
 * that should be used to process the request, but the extension is not supported.
 */
export class NotExtendedError extends ServerError {
  constructor() {
    super(510, 'Not Extended');
  }
}

export const isNotExtendedError = (error: any): error is NotExtendedError =>
  error instanceof NotExtendedError;
