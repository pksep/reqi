import { ClientError } from '../../client-error';

/**
 * The request body is larger than limits defined by server. The server might close the connection or return an Retry-After header field.
 */
export class ContentTooLargeError extends ClientError {
  constructor(message: string) {
    super(413, message);
  }
}

export const isContentTooLargeError = (
  error: any
): error is ContentTooLargeError => error instanceof ContentTooLargeError;
