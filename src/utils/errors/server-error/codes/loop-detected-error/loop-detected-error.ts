import { ServerError } from '../../server-error';

/**
 * The server detected an infinite loop while processing the request.
 */
export class LoopDetectedError extends ServerError {
  constructor() {
    super(508, 'Loop Detected');
  }
}

export const isLoopDetectedError = (error: any): error is LoopDetectedError =>
  error instanceof LoopDetectedError;
