import ClientError from '../client-error/client-error';
import type { IZodValidationError } from '../interface';

export default class ValidationError<
  TFields extends string = string
> extends ClientError {
  errorMessages: string[] = [];
  errorFields: string[] = [];
  errors: Record<TFields, string | undefined> = {} as Record<TFields, string>;

  constructor(message: string, errors?: IZodValidationError[]) {
    message = message || 'Validation error';
    super(400, message);

    if (errors) {
      const errorMessages = new Set<string>();
      const errorFields = new Set<string>();

      errors.forEach(error => {
        // Добавляем в массив с сообщениями сообщение с ошибкой
        errorMessages.add(error.message);

        // Если есть поле, которое не прошло валидацию, то добавляем его в массив
        if (error.path.length > 0) {
          error.path.forEach(path => {
            errorFields.add(path);
          });
        }

        // Добавляем в объект с полями сообщение с ошибкой
        this.errors[error.path[0] as TFields] = error.message;
      });

      // конвертируем в массив уникальные значения
      this.errorMessages = Array.from(errorMessages);
      this.errorFields = Array.from(errorFields);
    }
  }
}

export const isValidationError = <TFields extends string = string>(
  error: any
): error is ValidationError<TFields> => error instanceof ValidationError;
