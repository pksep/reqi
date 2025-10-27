import { ClientError } from '../../client-error';

export class PaymentRequiredError extends ClientError {
  constructor(message: string) {
    message = message || 'Payment required';
    super(402, message);
  }
}

export const isPaymentRequiredError = (
  error: any
): error is PaymentRequiredError => error instanceof PaymentRequiredError;
