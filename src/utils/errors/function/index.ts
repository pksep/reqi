import { NotFoundError, ValidationError } from '../client-error';
import { ClientError } from '../client-error/client-error';
import { BadRequestError } from '../client-error/codes/bad-request-error/bad-request-error';
import { ConflictError } from '../client-error/codes/conflict-error/conflict-error';
import { ContentTooLargeError } from '../client-error/codes/content-too-large-error/content-too-large-error';
import { ExpectationFailedError } from '../client-error/codes/expectation-failed-error/expectation-failed-error';
import { FailedDependencyError } from '../client-error/codes/failed-dependency-error/failed-dependency-error';
import { ForbiddenError } from '../client-error/codes/forbidden-error/forbidden-error';
import { GoneError } from '../client-error/codes/gone-error/gone-error';
import { LengthRequiredError } from '../client-error/codes/length-required-error/length-required-error';
import { LockedError } from '../client-error/codes/locked-error/locked-error';
import { MethodNotAllowedError } from '../client-error/codes/method-not-allowed-error/method-not-allowed-error';
import { MisdirectedRequestError } from '../client-error/codes/misdirected-request-error/misdirected-request-error';
import { NotAcceptableError } from '../client-error/codes/not-acceptable-error/not-acceptable-error';
import { PaymentRequiredError } from '../client-error/codes/payment-required-error/payment-required-error';
import { PreconditionFailedError } from '../client-error/codes/precondition-failed-error/precondition-failed-error';
import { PreconditionRequiredError } from '../client-error/codes/precondition-required-error/precondition-required-error';
import { ProxyAuthenticationRequiredError } from '../client-error/codes/proxy-authentication-required-error/proxy-authentication-required-error';
import { RangeNotSatisfiableError } from '../client-error/codes/range-not-satisfiable-error/range-not-satisfiable-error';
import { RequestHeaderFieldsTooLargeError } from '../client-error/codes/request-header-fields-too-large-error/request-header-fields-too-large-error';
import { RequestTimeoutError } from '../client-error/codes/request-timeout-error/request-timeout-error';
import { TooEarlyError } from '../client-error/codes/too-early-error/too-early-error';
import { TooManyRequestsError } from '../client-error/codes/too-many-requests-error/too-many-requests-error';
import { UnauthorizedError } from '../client-error/codes/unauthorized-error/unauthorized-error';
import { UnavailableForLegalReasonsError } from '../client-error/codes/unavailable-for-legal-reasons-error/unavailable-for-legal-reasons-error';
import { UnsupportedMediaTypeError } from '../client-error/codes/unsupported-media-type-error/unsupported-media-type-error';
import { UpgradeRequiredError } from '../client-error/codes/upgrade-required-error/upgrade-required-error';
import { URITooLongError } from '../client-error/codes/uri-too-long-error/uri-too-long-error';
import { HttpError } from '../http-error/http-error';
import type {
  IZodValidationError,
  TClientError,
  TResponseError
} from '../interface';
import { ServerError } from '../server-error/server-error';

export const generateError = async (
  response: Response
): Promise<TResponseError> => {
  const status = response.status;

  if (status >= 400 && status < 500) {
    return generateClientError(response);
  }

  if (status >= 500) {
    return new ServerError(status, response.statusText);
  }

  return new HttpError(response.status || 500, 'Unknown response type');
};

const generateClientError = async (
  response: Response
): Promise<TClientError> => {
  let message = response.statusText || '';
  const json = await getJson(response);

  message = json.message || message;

  switch (response.status) {
    case 400:
      // Если есть  errors, то возвращаем ValidationError
      if (json.errors) {
        return new ValidationError(message, json.errors);
        // Иначе возвращаем BadRequestError
      } else {
        return new BadRequestError(message);
      }

    case 401:
      return new UnauthorizedError(message);

    case 402:
      return new PaymentRequiredError(message);

    case 403:
      return new ForbiddenError(message);

    case 404:
      return new NotFoundError(message);

    case 405:
      return new MethodNotAllowedError(message);

    case 406:
      return new NotAcceptableError(message);

    case 407:
      return new ProxyAuthenticationRequiredError(message);

    case 408:
      return new RequestTimeoutError();

    case 409:
      return new ConflictError(message);

    case 410:
      return new GoneError(message);

    case 411:
      return new LengthRequiredError();

    case 412:
      return new PreconditionFailedError(message);

    case 413:
      return new ContentTooLargeError(message);

    case 414:
      return new URITooLongError();

    case 415:
      return new UnsupportedMediaTypeError();

    case 416:
      return new RangeNotSatisfiableError(message);

    case 417:
      return new ExpectationFailedError(message);

    case 421:
      return new MisdirectedRequestError();

    case 423:
      return new LockedError();

    case 424:
      return new FailedDependencyError();

    case 425:
      return new TooEarlyError(message);

    case 426:
      return new UpgradeRequiredError();

    case 428:
      return new PreconditionRequiredError();

    case 429:
      return new TooManyRequestsError();

    case 431:
      return new RequestHeaderFieldsTooLargeError();

    case 451:
      return new UnavailableForLegalReasonsError();

    default:
      return new ClientError(response.status, message);
  }
};

const getJson = async <
  T extends {
    message?: string;
    statusCode?: number;
    errors?: IZodValidationError[];
  }
>(
  response: Response
): Promise<T> => {
  return await response.json();
};
