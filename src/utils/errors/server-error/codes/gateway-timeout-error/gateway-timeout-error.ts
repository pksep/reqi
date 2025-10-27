import { ServerError } from '../../server-error';

/**
 * This error response is given when the server is acting as a gateway and cannot get a response in time.
 */
export class GatewayTimeoutError extends ServerError {
  constructor(message: string) {
    super(504, message);
  }
}

export const isGatewayTimeoutError = (
  error: any
): error is GatewayTimeoutError => error instanceof GatewayTimeoutError;
