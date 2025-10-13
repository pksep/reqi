# [ADR-0001] Функция Fetch

## Контекст

Необходимо гибкое и минимальное по размерам решение, включающие специфику запросов (автопарсинг), в команде sep

## Варианты решения

### Вариант 1: Написать класс для создание объекта запроса

- **Плюсы:**
  - Единая точка создания для сущности
  - Простота добавления дополнительных данных в запрос
  - Простота создания множества различных сущностей обращающихся к различным сервисам
- **Минусы:**
  - Необходимо дополнительно создавать сущности при уникальных запросах, отличающихся от общего вида запроса

## Решение

Выбранный вариант: **[Название варианта]**

- **Причины выбора:**
  - Причина 1
  - Причина 2
- **Последствия:**
  - Как это повлияет на код
  - Какие изменения потребуются
  - Кто затронут

## Пример использования

```ts
// Создание сущности для запросов на определенные сервер
const api = new Reqi('https://jsonplaceholder.typicode.com');

// Добавление для каждого запроса заголовка авторазиции
// Обязательно возвращать request
api.request.use((request: Request) => {
  request.headers.set('Authorization', 'token');

  return request;
});

// Обработка
api.response.use((response: Response) => {
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
