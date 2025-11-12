import type {
  BadRequestError,
  ConflictError,
  ContentTooLargeError,
  ExpectationFailedError,
  ForbiddenError,
  GoneError,
  LengthRequiredError,
  LockedError,
  MethodNotAllowedError,
  MisdirectedRequestError,
  NotAcceptableError,
  NotFoundError,
  PaymentRequiredError,
  PreconditionFailedError,
  PreconditionRequiredError,
  ProxyAuthenticationRequiredError,
  RangeNotSatisfiableError,
  RequestHeaderFieldsTooLargeError,
  RequestTimeoutError,
  TooEarlyError,
  TooManyRequestsError,
  UnauthorizedError,
  UnavailableForLegalReasonsError,
  UnproccesableContentError,
  UnsupportedMediaTypeError,
  UpgradeRequiredError,
  URITooLongError,
  ValidationError
} from '../client-error';
import type { ClientError } from '../client-error/client-error';
import type { HttpError } from '../http-error/http-error';
import type { ServerError } from '../server-error/server-error';

export type TClientError =
  | ValidationError
  | ClientError
  | ContentTooLargeError
  | ConflictError
  | URITooLongError
  | UnsupportedMediaTypeError
  | UnproccesableContentError
  | UpgradeRequiredError
  | UnavailableForLegalReasonsError
  | UnauthorizedError
  | TooEarlyError
  | TooManyRequestsError
  | RequestTimeoutError
  | RequestHeaderFieldsTooLargeError
  | RangeNotSatisfiableError
  | NotAcceptableError
  | NotFoundError
  | MisdirectedRequestError
  | MethodNotAllowedError
  | LockedError
  | LengthRequiredError
  | GoneError
  | ForbiddenError
  | ExpectationFailedError
  | PaymentRequiredError
  | PreconditionFailedError
  | PreconditionRequiredError
  | ProxyAuthenticationRequiredError
  | BadRequestError;

export type TServerError = ServerError;

export type TResponseError = TServerError | HttpError | TClientError;

export interface IZodValidationError {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
}
