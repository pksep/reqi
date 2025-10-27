import { ClientError } from '../../client-error';

/**
 * The ranges specified by the `Range` header field in the request cannot be fulfilled.
 * It's possible that the range is outside the size of the target resource's data.
 */
export class RangeNotSatisfiableError extends ClientError {
  constructor(message: string) {
    super(416, message);
  }
}

export const isRangeNotSatisfiableError = (
  error: any
): error is RangeNotSatisfiableError =>
  error instanceof RangeNotSatisfiableError;
