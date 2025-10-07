import HttpError, { isHttpError } from '../errors/http-error/http-error';
import type { TResponse } from './interface';

/**
 * Класс для работы с API
 *
 * @constructor
 * @param baseUrl - основной путь по которому происходят запросы
 */
export default class Reqi {
  constructor(private baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  public async post<T extends any>(
    url: string,
    data: BodyInit | Object | null,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<T> {
    const response = await this.sendRequest(url, {
      method: 'POST',
      body: data,
      ...options
    });

    const json = await response.json();

    return json;
  }

  /**
   * Отправляет запрос с указанными параметрами
   * @param url
   * @param request
   * @returns
   */
  private async sendRequest(
    url: string,
    request: Omit<RequestInit, 'body'> & { body: BodyInit | Object | null }
  ): Promise<Response> {
    const headers = new Headers(request?.headers || {});

    let formatedBody = null;

    if (typeof request.body === 'object') {
      formatedBody = JSON.stringify(request.body);
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(this.baseUrl + url, {
      ...request,
      body: formatedBody,
      headers
    });

    if (!response.ok) {
      console.log(response);
      let message = response.statusText;

      const json = await response.json();

      if (json.message) {
        message = json.message;
      }

      throw new HttpError(response.status, message);
    }

    return response;
  }
}
