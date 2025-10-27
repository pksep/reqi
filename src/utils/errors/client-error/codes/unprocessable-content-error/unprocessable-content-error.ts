import { ClientError } from '../../client-error';

/**
 * The request was well-formed but was unable to be followed due to semantic errors.
 */
export class UnproccesableContentError extends ClientError {
  constructor(message: string) {
    super(422, message);
  }
}

export const isUnprocessableContentError = (
  error: any
): error is UnproccesableContentError =>
  error instanceof UnproccesableContentError;
