import { ClientError } from '../../client-error';

/**
 * The request failed due to failure of a previous request.
 */
export class FailedDependencyError extends ClientError {
  constructor() {
    super(424, 'Failed Dependency');
  }
}

export const isFailedDependencyError = (
  error: any
): error is FailedDependencyError => error instanceof FailedDependencyError;
