// ✅ Код ниже выполняется только при запуске через `vite dev`

import { isHttpError } from './utils/errors/http-error/http-error';
import { isValidationError } from './utils/errors/validation-error/validation-error';
import Reqi from './utils/reqi/reqi';

// (он просто манипулирует DOM для проверки)
if (import.meta.env.DEV) {
  const root = document.getElementById('app');

  const api = new Reqi('https://jsonplaceholder.typicode.com');

  const sendPost = async (): Promise<void> => {
    try {
      const response = await api.post('/posts', {
        message: 'Hello world'
      });

      const json = await response.json();

      console.log('sendPost:response', response);
      console.log('sendPost:json', json);
    } catch (error) {
      if (isHttpError(error)) {
        console.log('status:', error.status);
        console.log('message:', error.message);
        throw error;
      }

      throw new Error('error');
    }
  };

  const sendParsedPost = async (): Promise<{ message: string; id: number }> => {
    try {
      const response = await api.post(
        '/posts',
        {
          message: 'Hello world'
        },
        true
      );

      console.log(response);

      return response;
    } catch (error) {
      if (isHttpError(error)) {
        console.log('status:', error.status);
        console.log('message:', error.message);
        throw error;
      }

      throw new Error('error');
    }
  };

  const deletePost = async (): Promise<void> => {
    try {
      const response = await api.delete('/posts/1');

      console.log(response, await response.json());
    } catch (error) {
      console.log(error);
    }
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

  const sepDevApi = new Reqi('http://localhost:5000/api');

  sepDevApi.request.use(request => {
    request.headers.set('Authorization', 'token');

    return request;
  });

  sepDevApi.response.use(response => {
    if (!response.ok) {
      console.log('Тут типа логировать можно');
    }

    return response;
  });

  // Интерфейс для проверки типизации
  interface testAuthValidate {
    login?: string;
    tabel?: string;
    password?: string;
  }

  const auth = async (): Promise<void> => {
    try {
      await sepDevApi.post('/auth/login', {
        tabel: '001'
      });
    } catch (error) {
      console.log(error);

      if (isValidationError<keyof testAuthValidate>(error)) {
        console.log(error.errors.login);
        console.log(error.message);
      }
    }
  };

  if (root) {
    root.innerHTML = `
      <h1>Demo for MyLib</h1>

      
      <div class="flex">
      <button class="send-post">Отправить запрос</button>
      
      <button class="send-post-pars">Отправить запрос c автоматическим парсом</button>

      <button class="delete-post">Удалить пост</button>
      </div>

      <div class="border">
        <h2>Запрос с ошибкой</h2>

        <button class="error-send">
          Отправить ошибочный запрос
        </button>
      </div>

      <div class="border">
        <h2>Запрос на локальный dev сервер localhost:5000</h2>

        <button class="dev-auth">
          авторизация с ошибкой
        </button>
      </div>
    `;

    root.querySelector('.send-post')?.addEventListener('click', sendPost);
    root
      .querySelector('.send-post-pars')
      ?.addEventListener('click', sendParsedPost);
    root.querySelector('.error-send')?.addEventListener('click', errorPost);
    root.querySelector('.dev-auth')?.addEventListener('click', auth);
    root.querySelector('.delete-post')?.addEventListener('click', deletePost);
  }
}
