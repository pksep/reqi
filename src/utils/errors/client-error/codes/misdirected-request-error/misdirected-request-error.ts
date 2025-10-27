import { ClientError } from '../../client-error';

/**
 * The request was directed at a server that is not able to produce a response.
 * This can be sent by a server that is not configured to produce responses
 * for the combination of scheme and authority that are included in the request URI.
 */
export class MisdirectedRequestError extends ClientError {
  constructor() {
    super(421, 'Misdirected Request');
  }
}

export const isMisdirectedRequestError = (
  error: any
): error is MisdirectedRequestError => error instanceof MisdirectedRequestError;
