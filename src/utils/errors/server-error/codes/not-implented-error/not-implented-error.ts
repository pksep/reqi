import { ServerError } from '../../server-error';

/**
 * The request method is not supported by the server and cannot be handled.
 * The only methods that servers are required to support
 * (and therefore that must not return this code) are GET and HEAD.
 */
export class NotImplentedError extends ServerError {
  constructor(message: string) {
    super(501, message);
  }
}

export const isNotImplentedError = (error: any): error is NotImplentedError =>
  error instanceof NotImplentedError;
