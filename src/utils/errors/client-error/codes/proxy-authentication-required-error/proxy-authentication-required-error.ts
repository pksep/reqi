import { ClientError } from '../../client-error';

export class ProxyAuthenticationRequiredError extends ClientError {
  constructor(message?: string) {
    super(407, message || 'Proxy authentication required');
  }
}

export const isProxyAuthenticationRequiredError = (
  error: any
): error is ProxyAuthenticationRequiredError =>
  error instanceof ProxyAuthenticationRequiredError;
