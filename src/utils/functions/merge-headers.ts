export const mergeHeaders = (
  ...headersList: Array<HeadersInit | undefined>
): Headers => {
  const result = new Headers();

  for (const headers of headersList) {
    if (!headers) continue;

    if (headers instanceof Headers) {
      for (const [key, value] of headers.entries()) {
        result.set(key, value); // или .append, если хочешь сохранять все варианты
      }
    } else if (Array.isArray(headers)) {
      for (const [key, value] of headers) {
        result.set(key, value);
      }
    } else {
      for (const [key, value] of Object.entries(headers)) {
        result.set(key, value);
      }
    }
  }

  return result;
};
