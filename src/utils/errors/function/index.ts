import { ClientError } from '../client-error/client-error';
import { HttpError } from '../http-error/http-error';
import type {
  IZodValidationError,
  TClientError,
  TResponseError
} from '../interface';
import { NotFoundError } from '../not-found-error/not-found-error';
import { ServerError } from '../server-error/server-error';
import { ValidationError } from '../validation-error/validation-error';

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
      return new ValidationError(message, json.errors);

    case 404:
      return new NotFoundError(message);

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
