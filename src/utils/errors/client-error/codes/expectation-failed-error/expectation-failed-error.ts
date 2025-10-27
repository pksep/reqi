import { ClientError } from '../../client-error';

/**
 * This response code means the expectation indicated by the `Expect` request header field
 * cannot be met by the server.
 */
export class ExpectationFailedError extends ClientError {
  constructor(message: string) {
    super(417, message);
  }
}

export const isExpectationFailedError = (
  error: any
): error is ExpectationFailedError => error instanceof ExpectationFailedError;
