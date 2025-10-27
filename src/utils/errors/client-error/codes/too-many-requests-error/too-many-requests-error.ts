import { ClientError } from '../../client-error';

/**
 * The user has sent too many requests in a given amount of time `rate limiting`.
 */
export class TooManyRequestsError extends ClientError {
  constructor() {
    super(429, 'Too many requests');
  }
}

export const isTooManyRequestsError = (
  error: any
): error is TooManyRequestsError => error instanceof TooManyRequestsError;
