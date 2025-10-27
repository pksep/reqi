import { ServerError } from '../../server-error';

/**
 * The server is not ready to handle the request.
 * Common causes are a server that is down for maintenance or that is overloaded.
 * Note that together with this response, a user-friendly page explaining the problem should be sent
 */
export class ServiceUnavailableError extends ServerError {
  constructor(message: string) {
    super(503, message);
  }
}

export const isServiceUnavailableError = (
  error: any
): error is ServiceUnavailableError => error instanceof ServiceUnavailableError;
