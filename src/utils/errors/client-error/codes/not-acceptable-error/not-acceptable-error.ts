import { ClientError } from '../../client-error';

export class NotAcceptableError extends ClientError {
  constructor(message: string) {
    super(406, message);
  }
}

export const isNotAcceptableError = (error: any): error is NotAcceptableError =>
  error instanceof NotAcceptableError;
