import type { ValidationError } from '../client-error';
import type { ClientError } from '../client-error/client-error';
import type { HttpError } from '../http-error/http-error';
import type { ServerError } from '../server-error/server-error';

export type TResponseError =
  | ValidationError
  | ClientError
  | ServerError
  | HttpError;

export type TClientError = ClientError | ValidationError;

export interface IZodValidationError {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
}
