import { ClientError } from '../../client-error';

/**
 * The server refuses to perform the request using the current protocol but might
 * be willing to do so after the client upgrades to a different protocol.
 * The server sends an Upgrade header in a 426 response to indicate the required protocol(s).
 */
export class UpgradeRequiredError extends ClientError {
  constructor() {
    super(426, 'Upgrade Required');
  }
}

export const isUpgradeRequiredError = (
  error: any
): error is UpgradeRequiredError => error instanceof UpgradeRequiredError;
