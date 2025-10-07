import { decompressJson } from '@sep-erp-server/zod-shared';
import HttpError from '../errors/http-error/http-error';
import { parse } from 'content-type';
import type { TResponse } from './interface';
import { generateError } from '../errors/function';

/**
 * Класс для работы с API
 *
 * @constructor
 * @param baseUrl - основной путь по которому происходят запросы
 *
 * @example
 * ```
 * const api = new Reqi('http://localhost:5000/api');
 *
 * const response = await api.post('/auth/login', {
 *   login: 'login',
 *   password: 'password'
 * })
 *
 */
export default class Reqi {
  private requestInterseptions: Array<
    (request: Request) => Promise<Request> | Request
  > = [];

  private responseInterseptions: Array<
    (response: Response) => Promise<Response> | Response
  > = [];

  // Добавляем перехватчик для обработки запроса
  request = {
    /**
     * Добавляет перехватчик для обработки запроса
     *
     * Выполняется перед отправкой запроса
     * @param interseption
     */
    use: (interseption: (request: Request) => Promise<Request> | Request) => {
      this.requestInterseptions.push(interseption);
    }
  };

  // Добавляем перехватчик для обработки ответа
  response = {
    /**
     * Добавляет перехватчик для обработки ответа
     *
     * Выполняется сразу после получения ответа
     * @param interseption
     */
    use: (
      interseption: (response: Response) => Promise<Response> | Response
    ) => {
      this.responseInterseptions.push(interseption);
    }
  };

  constructor(private baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  /**
   * Отправляет запрос с методом POST
   *
   *
   * @param url Путь
   * @param data Данные для отправки
   * @param parsed Флаг парсинга
   * @param options Дополнительные параметры
   * @returns {Response}
   */
  public async post<T = any>(
    url: string,
    data: BodyInit | Object | null,
    parsed?: boolean,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<Response>;
  /**
   * Отправляет запрос с методом POST
   *
   * Возвращает распаршенные данные (response.json() | response.blob() | response.text() | response.formData())
   * @param url Путь
   * @param data Данные для отправки
   * @param parsed Флаг парсинга
   * @param options Дополнительные параметры
   */
  public async post<T = any>(
    url: string,
    data: BodyInit | Object | null,
    parsed: true,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<TResponse<T>>;
  public async post<T = any>(
    url: string,
    data: BodyInit | Object | null,
    parsed?: boolean,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<Response | TResponse<T>> {
    const response = await this.sendRequest<T>(
      url,
      {
        method: 'POST',
        body: data,
        ...options
      },
      parsed
    );

    return response;
  }

  /**
   * Возвращает данные по указанному пути
   * @param url
   * @param parsed
   * @param options
   */
  public async get<T = any>(
    url: string,
    parsed?: boolean,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<Response>;
  /**
   * Возвращает данные по указанному пути
   *
   * возвращает распаршенные данные (response.json() | response.blob() | response.text() | response.formData())
   * @param url
   * @param parsed
   * @param options
   */
  public async get<T = any>(
    url: string,
    parsed: true,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<TResponse<T>>;
  public async get<T = any>(
    url: string,
    parsed?: boolean,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<Response | TResponse<T>> {
    const response = await this.sendRequest<T>(
      url,
      {
        method: 'GET',
        ...options
      },
      parsed
    );

    return response;
  }

  public async delete<T = any>(
    url: string,
    parsed?: boolean,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<Response>;
  public async delete<T = any>(
    url: string,
    parsed: true,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<TResponse<T>>;
  public async delete<T = any>(
    url: string,
    parsed?: boolean,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<Response | TResponse<T>> {
    const response = await this.sendRequest<T>(
      url,
      {
        method: 'DELETE',
        ...options
      },
      parsed
    );

    return response;
  }

  public async put<T = any>(
    url: string,
    data: BodyInit | Object | null,
    parsed?: boolean,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<Response>;
  public async put<T = any>(
    url: string,
    data: BodyInit | Object | null,
    parsed: true,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<TResponse<T>>;
  public async put<T = any>(
    url: string,
    data: BodyInit | Object | null,
    parsed?: boolean,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<Response | TResponse<T>> {
    const response = await this.sendRequest<T>(
      url,
      {
        method: 'PUT',
        body: data,
        ...options
      },
      parsed
    );

    return response;
  }

  public async patch<T = any>(
    url: string,
    data: BodyInit | Object | null,
    parsed?: boolean,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<Response>;
  public async patch<T = any>(
    url: string,
    data: BodyInit | Object | null,
    parsed: true,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<TResponse<T>>;
  public async patch<T = any>(
    url: string,
    data: BodyInit | Object | null,
    parsed?: boolean,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<Response | TResponse<T>> {
    const response = await this.sendRequest<T>(
      url,
      {
        method: 'PATCH',
        body: data,
        ...options
      },
      parsed
    );

    return response;
  }

  public async head<T = any>(
    url: string,
    options?: Omit<RequestInit, 'body' | 'method'>
  ): Promise<Response> {
    const response = await this.sendRequest<T>(url, {
      method: 'HEAD',
      ...options
    });

    return response;
  }

  /**
   * Отправляет запрос с указанными параметрами
   *
   * Возвращает распаршенные данные (response.json() | response.blob() | response.text() | response.formData())
   * @param url
   * @param request
   * @returns
   */
  public async sendRequest<T = any>(
    url: string,
    request: Omit<RequestInit, 'body'> & { body?: BodyInit | Object | null },
    parsed: true
  ): Promise<TResponse<T>>;
  /**
   * Отправляет запрос с указанными параметрами
   *
   * Возвращает response
   * @param url
   * @param request
   * @returns {Reponse}
   */
  public async sendRequest<T = any>(
    url: string,
    request: Omit<RequestInit, 'body'> & { body?: BodyInit | Object | null },
    parsed?: boolean
  ): Promise<Response>;
  public async sendRequest<T = any>(
    url: string,
    request: Omit<RequestInit, 'body'> & { body?: BodyInit | Object | null },
    parsed?: boolean
  ): Promise<TResponse<T> | Response> {
    // Создаем заголовки
    const headers = new Headers(request?.headers || {});

    let formatedBody = null;

    // Если передан объект, то преобразуем его в json
    if (typeof request.body === 'object') {
      formatedBody = JSON.stringify(request.body);
      headers.set('Content-Type', 'application/json');
    } else {
      formatedBody = request.body;
    }

    // Отправляем запрос
    const response = await this._sendRequest(url, {
      ...request,
      body: formatedBody,
      headers
    });

    // Обрабатываем ошибки
    if (!response.ok) {
      throw await generateError(response);
    }

    // Если указан флаг парсинга, то парсим данные
    if (parsed) {
      const result = await this.getData<T>(response);

      return result;
    }

    // возвращаем response
    return response;
  }

  /**
   * Отправляет запрос по указанному пути
   * @param url
   * @param request
   * @returns
   */
  private async _sendRequest(
    url: string,
    request: RequestInit
  ): Promise<Response> {
    let req = new Request(this.baseUrl + url, request);

    // Проходим через все интерсепшены
    for (const interseption of this.requestInterseptions) {
      req = await interseption(req);
    }

    let response = await fetch(req);

    // Проходим через все интерсепшены
    for (const interseption of this.responseInterseptions) {
      response = await interseption(response);
    }

    return response;
  }

  /**
   * Возращает данные в зависимости от типа из response
   * @param response
   * @returns
   */
  private async getData<T = any>(response: Response): Promise<TResponse<T>> {
    const encoding = response.headers.get('content-encoding');
    if (encoding === 'lz-string') {
      return await this.getComressedData<T>(response);
    }

    // Получаем тип возвращаемого контента
    const type = parse(response.headers.get('Content-Type') || 'text/html');

    // Если тип json, то возвращаем json
    if (type.type === 'application/json') {
      if (response.json) {
        return await response?.json();
      }

      // возвращаем blob формат
    } else if (type.type === 'application/octet-stream') {
      if (response.blob) {
        return await response?.blob();
      }

      // Возраваем formData
    } else if (type.type === 'multipart/form-data') {
      if (response.formData) {
        return await response?.formData();
      }

      // в остальных случаях поулчаем text
    } else {
      if (response.text) {
        return await response.text();
      }
    }

    throw new HttpError(500, 'Unknown response type');
  }

  /**
   * Возращает декомпрессованные данные
   * @param response
   * @returns
   */
  private async getComressedData<T = any>(response: Response): Promise<T> {
    try {
      const compressedData = await response.text();
      const decompressedData = decompressJson(compressedData);
      const parsedData = JSON.parse(decompressedData);

      return parsedData;
    } catch (error) {
      throw new HttpError(500, 'Unknown response type');
    }
  }
}
