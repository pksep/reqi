import { ClientError } from '../../client-error';

/**
 * In conditional requests, the client has indicated preconditions in its headers which the server does not meet.
 */
export class PreconditionFailedError extends ClientError {
  constructor(message: string) {
    super(412, message);
  }
}

export const isPreconditionFailedError = (
  error: any
): error is PreconditionFailedError => error instanceof PreconditionFailedError;
