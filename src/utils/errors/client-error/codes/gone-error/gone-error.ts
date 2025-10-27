import { ClientError } from '../../client-error';

/**
 * This response is sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.
 */
export class GoneError extends ClientError {
  constructor(message: string) {
    super(410, message);
  }
}

export const isGoneError = (error: any): error is GoneError =>
  error instanceof GoneError;
