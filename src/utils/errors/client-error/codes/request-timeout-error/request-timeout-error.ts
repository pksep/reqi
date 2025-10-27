import { ClientError } from '../../client-error';

export class RequestTimeoutError extends ClientError {
  constructor() {
    super(408, 'Request timeout');
  }
}

export const isRequestTimeoutError = (
  error: any
): error is RequestTimeoutError => error instanceof RequestTimeoutError;
