import { ServerError } from '../../server-error';

/**
 * The server has an internal configuration error: during content negotiation,
 * the chosen variant is configured to engage in
 * content negotiation itself, which results in circular references when creating responses.
 */
export class VariantAlsoNegotiatesError extends ServerError {
  constructor(message: string) {
    super(506, message);
  }
}

export const isVariantAlsoNegotiatesError = (
  error: any
): error is VariantAlsoNegotiatesError =>
  error instanceof VariantAlsoNegotiatesError;
