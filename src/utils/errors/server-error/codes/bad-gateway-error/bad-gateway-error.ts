import { ServerError } from '../../server-error';

/**
 * This error response means that the server, while working as a gateway
 * to get a response needed to handle the request, got an invalid response.
 */
export class BadGatewayError extends ServerError {
  constructor(message: string) {
    super(502, message);
  }
}

export const isBadGatewayError = (error: any): error is BadGatewayError =>
  error instanceof BadGatewayError;
