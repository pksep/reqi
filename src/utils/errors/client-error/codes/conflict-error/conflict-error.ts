import { ClientError } from '../../client-error';

/**
 * This response is sent when a request conflicts with the current state of the server
 */
export class ConflictError extends ClientError {
  constructor(message: string) {
    super(409, message);
  }
}

export const isConflictError = (error: any): error is ConflictError =>
  error instanceof ConflictError;
