// Базовые URL API
const USERS_API_BASE_URL = "https://wedev-api.sky.pro/api/user";
const KANBAN_API_BASE_URL = "https://wedev-api.sky.pro/api/kanban";

// Экспортируемые переменные для хранения данных
export let currentUser = null;
export let userToken = localStorage.getItem("userToken") || null;
export let usersList = [];
export let tasksList = [];

// Общая функция для выполнения запросов
async function makeRequest(url, options = {}) {
  const headers = {
    ...options.headers,
  };

  // Добавляем токен авторизации, если он есть
  if (userToken) {
    headers["Authorization"] = `Bearer ${userToken}`;
  }

  const config = {
    ...options,
    headers,
  };

  // Добавляем тело запроса только для методов, которые его поддерживают
  if (options.body && ["POST", "PUT", "PATCH"].includes(options.method)) {
    config.body = options.body;
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

// Функция для сохранения/удаления токена
function setToken(token) {
  userToken = token;
  if (token) {
    localStorage.setItem("userToken", token);
  } else {
    localStorage.removeItem("userToken");
  }
}

// Функция для обновления текущего пользователя
export function setCurrentUser(user) {
  currentUser = user;
  console.log("✅ currentUser установлен:", currentUser);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
}

// Функция для восстановления currentUser из localStorage
export function restoreCurrentUser() {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
      console.log("✅ currentUser восстановлен из localStorage:", currentUser);
    } catch (error) {
      console.error("❌ Ошибка восстановления currentUser:", error);
      currentUser = null;
    }
  }
}

// Экспорт функций API
export const api = {
  // Авторизация
  async login(login, password) {
    const data = await makeRequest(`${USERS_API_BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ login, password }),
    });

    console.log("📨 Ответ от API при входе:", data);

    setToken(data.user.token);

    setCurrentUser({
      id: data.user.id,
      login: data.user.login,
      name: data.user.name,
      token: data.user.token,
    });

    return data;
  },

  // Регистрация
  async register(login, name, password) {
    const data = await makeRequest(USERS_API_BASE_URL, {
      method: "POST",
      body: JSON.stringify({ login, name, password }),
    });

    setToken(data.user.token);

    setCurrentUser({
      id: data.user.id,
      login: data.user.login,
      name: data.user.name,
      token: data.user.token,
    });

    return data;
  },

  // Получение списка пользователей
  async getUsers() {
    const data = await makeRequest(USERS_API_BASE_URL, {
      method: "GET",
    });
    usersList = data.users;
    console.log("👥 Список пользователей загружен:", usersList);
    return data;
  },

  // Выход из системы
  logout() {
    setToken(null);
    setCurrentUser(null);
    usersList = [];
    tasksList = [];
  },

  // Kanban API - исправлено согласно документации
  async getTasks() {
    try {
      const data = await makeRequest(KANBAN_API_BASE_URL, {
        method: "GET",
      });
      tasksList = data.tasks || [];
      console.log("📋 Задачи загружены из API:", tasksList.length);
      return data;
    } catch (error) {
      console.error("❌ Ошибка загрузки задач:", error);
      tasksList = [];
      throw error;
    }
  },

  async getTaskById(id) {
    const data = await makeRequest(`${KANBAN_API_BASE_URL}/${id}`, {
      method: "GET",
    });
    return data;
  },

  async createTask(taskData) {
    const data = await makeRequest(KANBAN_API_BASE_URL, {
      method: "POST",
      body: JSON.stringify(taskData),
    });
    tasksList = data.tasks || [];
    console.log("✅ Задача создана, новый список:", tasksList.length);
    return data;
  },

  async updateTask(id, taskData) {
    console.log("🔄 Обновление задачи:", { id, taskData });
    try {
      const data = await makeRequest(`${KANBAN_API_BASE_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(taskData),
      });
      tasksList = data.tasks || [];
      console.log("✅ Задача обновлена, новый список:", tasksList.length);
      return data;
    } catch (error) {
      console.error("❌ Ошибка обновления задачи:", error);
      throw error;
    }
  },

  async deleteTask(id) {
    const data = await makeRequest(`${KANBAN_API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    tasksList = data.tasks || [];
    return data;
  },
};

// Проверяем авторизацию при загрузке
export async function checkAuth() {
  restoreCurrentUser();

  if (userToken) {
    try {
      await api.getTasks();

      try {
        await api.getUsers();
      } catch (usersError) {
        console.log("⚠️ Не удалось загрузить пользователей:", usersError);
      }

      return true;
    } catch (error) {
      console.error("❌ Ошибка проверки авторизации:", error);
      api.logout();
      return false;
    }
  }
  return false;
}

export { setToken, makeRequest };
