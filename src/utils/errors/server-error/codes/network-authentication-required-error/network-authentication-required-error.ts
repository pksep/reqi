import { ServerError } from '../../server-error';

/**
 * Indicates that the client needs to authenticate to gain network access.
 */
export class NetworkAuthenticationRequiredError extends ServerError {
  constructor() {
    super(511, 'Network authentication required');
  }
}

export const isNetworkAuthenticationRequiredError = (
  error: any
): error is NetworkAuthenticationRequiredError =>
  error instanceof NetworkAuthenticationRequiredError;
