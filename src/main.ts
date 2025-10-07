// ✅ Код ниже выполняется только при запуске через `vite dev`

import { isHttpError } from './utils/errors/http-error/http-error';
import Reqi from './utils/reqi/reqi';

// (он просто манипулирует DOM для проверки)
if (import.meta.env.DEV) {
  const root = document.getElementById('app');

  const api = new Reqi('https://jsonplaceholder.typicode.com');

  const sendPost = async (): Promise<void> => {
    const response = await api.post<{
      message?: string;
      id: number;
    }>('/posts', {
      message: 'Hello world'
    });

    console.log(response.message);
  };

  const errorPost = async (): Promise<void> => {
    try {
      await api.post('/postsr', {
        message: 'Hello world'
      });
    } catch (error) {
      console.log(error);

      if (isHttpError(error)) {
        console.log('status:', error.status);
        console.log('message:', error.message);
      }
    }
  };

  if (root) {
    root.innerHTML = `
      <h1>Demo for MyLib</h1>

      
      <div class="flex">
      <button class="send-post">Отправить запрос</button>
      </div>

      <div class="border">
        <h2>Запрос с ошибкой</h2>

        <button class="error-send">
          Отправить ошибочный запрос
        </button>
      </div>
    `;

    root.querySelector('.send-post')?.addEventListener('click', sendPost);
    root.querySelector('.error-send')?.addEventListener('click', errorPost);
  }
}
