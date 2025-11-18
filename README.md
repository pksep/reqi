## REQI класс

Данный класс используются для реализации отправки запросы на сервера с учетом специфики sep проектов

## Установка

1. `pnpm i @pksep/reqi`

## Инициализация

```ts
// Создание сущности для запросов на определенные сервер
const api = new Reqi('https://your-server.com');
```

## Пример

```ts
// Добавление для каждого запроса заголовка авторазиции
// Обязательно возвращать request
api.request.use((request: Request): Request => {
  request.headers.set('Authorization', 'token');

  return request;
});

// Обработка
api.response.use((response: Response): Response => {
  if (!response.ok) {
    console.log('Здесь можно реализовать логирование');
  }

  return response;
});

// Пример использования отправки запросов
try {
  const response = await api.post('/posts', {
    message: 'Hello world'
  });

  const json = await response.json();

  console.log(json);

  // Пример обработки ошибки
} catch (error) {
  if (isClientError(error)) {
    console.log('Ошибка на стороне клиента');
  }

  // Интерфейс для проверки типизации
  interface testAuthValidate {
    login?: string;
    tabel?: string;
    password?: string;
  }

  // Пример обработки валидации
  if (isValidationError<keyof testAuthValidate>(error)) {
    console.log(error.errors.login);
    console.log(error.message);
  }
}
```

### Работа с декодером

в любой запрос необходимо добавить parsed = true

```ts
await api.post(
  '/posts',
  {
    message: 'Hello world'
  },
  {
    parsed: true
  }
);
```

### Работа с дополнительными параметрами

```ts
await api.post('/posts', {
  message: 'Hello world'
}, {
  request: {
    headers: {
      ...
    },
    credentials: 'include',
  }
  ...
});
```

## Методы

Список методов:

- post;
- patch;
- get;
- head;
- delete;
- put.

Если необходимо использовать другой метод - используйте `sendRequest`

```ts
api.sendRequest('/posts', {
  request: {
    method: 'OPTIONS'
  }
});
```

## Модификаия запроса

Запросы можно модифицировать при отправке запроса и получения ответа.

Полезные пример:

- Вставка jwt токена при отправке каждого запроса из localStorage.

Для модифицирования запроса необходимо использовать функция `use`.

Модификация полученного запроса: `api.response.use`
Модификация отправки запроса: `api.request.use`

Каждая модификация обязательно должна возвращать объект модификации в ответ

Пример:

```ts
const api = new Reqi('https://your-server.com');

api.request.use(request => {
  const userId = getUserId();
  request.headers.set('userId', `${userId}`);
  return request;
});
```

## События

На каждый объект `Reqi` можно поставить слушатели и назначить функция для выполения при срабатывания слушателя.

Слушатели отработаю по принципу FIFO

Типы слушателей:

- `error` - обработчик ошибок

### Событие ошибки (`error`)

Срабатывает после генерации ошибки, но до того как она будет выброшена на клиент
(не блокирует поток выполнения кода. setTimeout может сработать после участка `catch`)

Функция обработки принимает в себя сгенерированную ошибку

Пример:

```ts
const api = new Reqi('https://your-server.com');

api.on('error', (error: TResponseError) => {
  console.log('onError');
});

try {
  const res = await api.get('/posts/error');
} catch (err) {
  if (isHttpError(err)) {
    console.log(err.status, err.message);
  }
}

// onError
// [status] [message]
```

## Ошибки

Если ошибка произошла при выполнение запроса, то сгенерируется ошибка типа `HttpError`, которая наследуется от `Error`.

все последующие ошибки наследуются от `HttpError`

При получение кодов, ошибки делятся на серверные (`ServerError`) и клиентские (`ClientError`)

Все типы ошибок имеют guard функцию на проверку типа ошибки и начинаются с `is`

Пример для HttpError:

```ts
try {
  const res = await api.get('/posts/error');
} catch (err) {
  if (isHttpError(err)) {
    console.log(err.status, err.message);
  }
}
```

### HttpError

Имеет поля:

- `message: string`
- `status: number`

### ServerError

Ошибки сервера 500 кодов

Имеет дочерние ошибки:

- 500: `InternalServerError`;
- 501: `NotImplentedError`;
- 502: `BadGatewayError`;
- 503: `ServiceUnavailableError`;
- 504: `GatewayTimeoutError`;
- 505: `HTTPVersionNotSupportedError`;
- 506: `VariantAlsoNegotiatesError`;
- 507: `InsufficientStorageError`;
- 508: `LoopDetectedError`;
- 510: `NotExtendedError`;
- 511: `NetworkAuthenticationRequiredError`.

### ClientError

Ошибки сервера 400 кодов

Имеет дочерние ошибки:

- 400: `BadRequestError` и `ValidationError`;
- 401: `UnauthorizedError`;
- 402: `PaymentRequiredError`;
- 403: `ForbiddenError`;
- 404: `NotFoundError`;
- 405: `MethodNotAllowedError`;
- 406: `NotAcceptableError`;
- 407: `ProxyAuthenticationRequiredError`;
- 408: `RequestTimeoutError`;
- 409: `ConflictError`;
- 410: `GoneError`;
- 411: `LengthRequiredError`;
- 412: `PreconditionFailedError`;
- 413: `ContentTooLargeError`;
- 414: `URITooLongError`;
- 415: `UnsupportedMediaTypeError`;
- 416: `RangeNotSatisfiableError`;
- 417: `ExpectationFailedError`;
- 421: `MisdirectedRequestError`;
- 423: `LockedError`;
- 422: `UnproccesableContentError`;
- 424: `FailedDependencyError`;
- 425: `TooEarlyError`;
- 426: `UpgradeRequiredError`;
- 428: `PreconditionRequiredError`;
- 429: `TooManyRequestsError`;
- 431: `RequestHeaderFieldsTooLargeError`;
- 451: `UnavailableForLegalReasonsError`.

#### ValidationError

Ошибка характерезующая, что запрос не прошел валидацию на сервере.
Генерируется при возврате ошибки на клиент, когда сервер возращает ошибку с кодом 400 и имеет в ответе поле `errors` с массивом ошибок

Имеет поля:

- `errorMessages: string[]` - массив сообщений ошибок
- `errorFields: string[]` - массив с полями, в которых передана ошибока
- `errors: <TFields extends string = string> Record<TFields, string | undefined>` - объект {[поле]: [сообщение ошибки]}

Рекомендация использовать zod ошибки `IZodValidationError` или схожую стуктура для возврата ошибки валидации на клиент
Необходимая структура `errors`:

```ts
const errors {
  message?: string // сообщение ошибки
  path: string[] // наименование полей ошибки
} = {
  ...
}
```

Можно также типизировать поле `errors` в конечном объекте при помощи generic

Пример:

```ts
try {
  const res = await api.post('/posts/error', data);
} catch (err) {
  if (isValidationError<'message' | 'tabel'>(err)) {
    const { message, tabel } = err.errors;

    console.log(message); // сообщение ошибки поля message
    console.log(tabel); // сообщение ошибки поля tabel
  }
}
```
