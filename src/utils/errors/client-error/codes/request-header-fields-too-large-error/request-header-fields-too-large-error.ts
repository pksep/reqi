import { ClientError } from '../../client-error';

/**
 * The server is unwilling to process the request because its header fields are too large.
 * The request may be resubmitted after reducing the size of the request header fields.
 */
export class RequestHeaderFieldsTooLargeError extends ClientError {
  constructor() {
    super(431, 'Request Header Fields Too Large');
  }
}

export const isRequestHeaderFieldsTooLargeError = (
  error: any
): error is RequestHeaderFieldsTooLargeError =>
  error instanceof RequestHeaderFieldsTooLargeError;
