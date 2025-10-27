import { ClientError } from '../../client-error';

/**
 * The media format of the requested data is not supported by the server, so the server is rejecting the request.
 */
export class UnsupportedMediaTypeError extends ClientError {
  constructor() {
    super(415, 'Unsupported Media Type');
  }
}

export const isUnsupportedMediaTypeError = (
  error: any
): error is UnsupportedMediaTypeError =>
  error instanceof UnsupportedMediaTypeError;
