## Reqi Class

This class is used to implement sending requests to servers considering the specifics of sep projects.

## Installation

1. `pnpm i @pksep/reqi`

## Initialization

```ts
// Creating an entity for requests to a specific server
const api = new Reqi('https://your-server.com');
```

## Example

```ts
// Adding an authorization header to each request
// Must return the request object
api.request.use((request: Request): Request => {
  request.headers.set('Authorization', 'token');

  return request;
});

// Handling responses
api.response.use((response: Response): Response => {
  if (!response.ok) {
    console.log('Logging can be implemented here');
  }

  return response;
});

// Example of using request sending
try {
  const response = await api.post('/posts', {
    message: 'Hello world'
  });

  const json = await response.json();

  console.log(json);

  // Example of error handling
} catch (error) {
  if (isClientError(error)) {
    console.log('Client-side error');
  }

  // Interface for type checking
  interface testAuthValidate {
    login?: string;
    tabel?: string;
    password?: string;
  }

  // Example of validation handling
  if (isValidationError<keyof testAuthValidate>(error)) {
    console.log(error.errors.login);
    console.log(error.message);
  }
}
```

### Working with the decoder

Add `parsed = true` to any request.

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

### Working with additional parameters

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

## Methods

List of methods:

- post;
- patch;
- get;
- head;
- delete;
- put.

If you need to use another method, use `sendRequest`

```ts
api.sendRequest('/posts', {
  request: {
    method: 'OPTIONS'
  }
});
```

## Request Modification

Requests can be modified when sending requests and receiving responses.

Useful examples:

- Inserting a JWT token into each request from localStorage.

To modify requests, use the `use` function.

Modifying received requests: `api.response.use`
Modifying sent requests: `api.request.use`

Each modification must return the modification object back.

Example:

```ts
const api = new Reqi('https://your-server.com');

api.request.use(request => {
  const userId = getUserId();
  request.headers.set('userId', `${userId}`);
  return request;
});
```

## Events

Listeners can be attached to each `Reqi` object and assign functions to execute when the listener is triggered.

Listeners operate on a FIFO principle.

Types of listeners:

- `error` - error handler

### Error event (`error`)

Triggers after error generation but before it is thrown to the client
(does not block the code execution flow. setTimeout can execute after the `catch` block)

The handler function accepts the generated error as input.

Example:

```ts
const api = new Reqi('https://your-server.com');

api.on('error', (error: TResponseError) => {
  console.log(error.status);
  console.log('onError');
});

try {
  const res = await api.get('/posts/error');
} catch (err) {
  if (isHttpError(err)) {
    console.log(err.status, err.message);
  }
}

// [status]
// onError
// [status] [message]
```

## Errors

If an error occurs during request execution, an `HttpError` type error will be generated, which inherits from `Error`.

All subsequent errors inherit from `HttpError`.

Based on the received codes, errors are divided into server errors (`ServerError`) and client errors (`ClientError`).

All error types have guard functions for checking error types and begin with `is`.

Example for HttpError:

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

Has fields:

- `message: string`
- `status: number`

### ServerError

Server errors with 500 codes.

Has child errors:

- 500: `InternalServerError`;
- 501: `NotImplementedError`;
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

Client errors with 400 codes.

Has child errors:

- 400: `BadRequestError` and `ValidationError`;
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
- 422: `UnprocessableContentError`;
- 424: `FailedDependencyError`;
- 425: `TooEarlyError`;
- 426: `UpgradeRequiredError`;
- 428: `PreconditionRequiredError`;
- 429: `TooManyRequestsError`;
- 431: `RequestHeaderFieldsTooLargeError`;
- 451: `UnavailableForLegalReasonsError`.

#### ValidationError

An error indicating that the request failed validation on the server.
Generated when returning an error to the client when the server returns an error with code 400 and has an `errors` field with an array of errors in the response.

Has fields:

- `errorMessages: string[]` - array of error messages
- `errorFields: string[]` - array with fields containing errors
- `errors: <TFields extends string = string> Record<TFields, string | undefined>` - object {[field]: [error message]}

It is recommended to use zod errors `IZodValidationError` or a similar structure for returning validation errors to the client.
The required structure for `errors` is:

```ts
const errors {
  message?: string // error message
  path: string[] // field names in error
} = {
  ...
}
```

You can also type the `errors` field in the final object using generics.

Example:

```ts
try {
  const res = await api.post('/posts/error', data);
} catch (err) {
  if (isValidationError<'message' | 'tabel'>(err)) {
    const { message, tabel } = err.errors;

    console.log(message); // error message for field message
    console.log(tabel); // error message for field tabel
  }
}
```