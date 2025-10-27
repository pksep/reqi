import { ClientError } from '../../client-error';
/**
 * Indicates that the server is unwilling to risk processing a request that might be replayed.
 */
export class TooEarlyError extends ClientError {
  constructor(message: string) {
    super(425, message);
  }
}

export const isTooEarlyError = (error: any): error is TooEarlyError =>
  error instanceof TooEarlyError;
