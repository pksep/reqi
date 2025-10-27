import { ClientError } from '../../client-error';

/**
 * Server rejected the request because the `Content-Length` header field is not defined and the server requires it.
 */
export class LengthRequiredError extends ClientError {
  constructor() {
    super(411, 'Length required');
  }
}

export const isLengthRequiredError = (
  error: any
): error is LengthRequiredError => error instanceof LengthRequiredError;
