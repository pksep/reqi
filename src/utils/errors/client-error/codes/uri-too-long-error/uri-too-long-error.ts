import { ClientError } from '../../client-error';

/**
 * The URI requested by the client is longer than the server is willing to interpret.
 */
export class URITooLongError extends ClientError {
  constructor() {
    super(414, 'URI Too Long');
  }
}

export const isURITooLongError = (error: any): error is URITooLongError =>
  error instanceof URITooLongError;
