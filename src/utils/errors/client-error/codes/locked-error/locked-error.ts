import { ClientError } from '../../client-error';

/**
 * The resource that is being accessed is locked.
 */
export class LockedError extends ClientError {
  constructor() {
    super(423, 'Locked');
  }
}

export const isLockedError = (error: any): error is LockedError =>
  error instanceof LockedError;
