import type HttpError from '../../errors/http-error/http-error';

export type TResponse<T extends any> = T | HttpError;
