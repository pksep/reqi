import { ClientError } from '../../client-error';

/**
 * The user agent requested a resource that cannot
 * legally be provided, such as a web page censored by a government.
 */
export class UnavailableForLegalReasonsError extends ClientError {
  constructor() {
    super(451, 'Unavailable for legal reasons');
  }
}

export const isUnavailableForLegalReasonsError = (
  error: any
): error is UnavailableForLegalReasonsError =>
  error instanceof UnavailableForLegalReasonsError;
