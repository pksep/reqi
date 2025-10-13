// ✅ Код ниже выполняется только при запуске через `vite dev`

// (он просто манипулирует DOM для проверки)
if (import.meta.env.DEV) {
  const root = document.getElementById('app');

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
  }
}
