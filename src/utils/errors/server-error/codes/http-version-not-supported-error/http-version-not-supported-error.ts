import { ServerError } from '../../server-error';

/**
 * The HTTP version used in the request is not supported by the server.
 */
export class HTTPVersionNotSupportedError extends ServerError {
  constructor(message: string) {
    super(505, message);
  }
}

export const isHTTPVersionNotSupportedError = (
  error: any
): error is HTTPVersionNotSupportedError =>
  error instanceof HTTPVersionNotSupportedError;
