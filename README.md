## REQI класс

Данный класс используются для реализации отправки запросы на сервера с учетом специфики sep проектов

## Установка

1. создать персональный токен (https://github.com/settings/tokens) на чтение пакетов (read:packages)
2. в корневом файле .npmrc в проекте добавить следующие строчки:

```
@pksep:registry=https://npm.pkg.github.com/pksep
//npm.pkg.github.com/:_authToken=ВАШ_ТОКЕН
```

3. `pnpm i @pksep/reqi`

## Пример

```ts
// Создание сущности для запросов на определенные сервер
const api = new Reqi('https://jsonplaceholder.typicode.com');

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
  // Ошибки могут быть
  // Серверные:
  // ServerError: isServerError().
  // Клиентские:
  // ClientError: isClientError();
  // NotFoundError: isNotFoundError();
  // ValidationError: <T extends string = string> isValidationError<T>()
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
  // parsed = true
  true
);
```

### Работа с дополнительными параметрами

```ts
await api.post('/posts', {
  message: 'Hello world'
}, false, {
  headers: {
    ...
  },
  credentials: 'include',
  ...
});
```
