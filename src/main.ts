// ✅ Код ниже выполняется только при запуске через `vite dev`

import { Reqi } from './utils/reqi/reqi';

// (он просто манипулирует DOM для проверки)
if (import.meta.env.DEV) {
  const root = document.getElementById('app');

  const api = new Reqi('https://jsonplaceholder.typicode.com', {
    credentials: 'include',
    cache: 'force-cache'
  });

  const sendPost = async () => {
    const res = await api.post(
      '/posts',
      {
        message: 'hello worl'
      },
      false
    );

    console.log(res);
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

    root
      .querySelector<HTMLButtonElement>('.send-post')
      ?.addEventListener('click', sendPost);
  }
}
