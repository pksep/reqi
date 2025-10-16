import type { ClientError } from '../client-error/client-error';
import type { HttpError } from '../http-error/http-error';
import type { ServerError } from '../server-error/server-error';
import type { ValidationError } from '../validation-error/validation-error';

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
