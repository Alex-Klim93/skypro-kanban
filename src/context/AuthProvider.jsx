import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";

// Базовые URL API
const USERS_API_BASE_URL = "https://wedev-api.sky.pro/api/user";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Функция для выполнения запросов
  const makeRequest = useCallback(async (url, options = {}) => {
    const headers = {
      ...options.headers,
    };

    // Добавляем токен авторизации, если он есть
    const token = localStorage.getItem("userToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    // Добавляем тело запроса только для методов, которые его поддерживают
    if (options.body && ["POST", "PUT", "PATCH"].includes(options.method)) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);

      // Согласно документации: при успешной авторизации/регистрации возвращается 201
      if (response.status === 201 || response.status === 200) {
        const data = await response.json();
        return data;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Правильно обрабатываем ошибку согласно документации
        if (response.status === 400) {
          throw new Error(errorData.error || "Неверный логин или пароль");
        }

        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }, []);

  // Функция для сохранения/удаления токена
  const setToken = useCallback((token) => {
    if (token) {
      localStorage.setItem("userToken", token);
    } else {
      localStorage.removeItem("userToken");
      localStorage.removeItem("currentUser");
    }
  }, []);

  // Функция для сохранения данных пользователя
  const setCurrentUser = useCallback((userData) => {
    if (userData) {
      localStorage.setItem("currentUser", JSON.stringify(userData));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, []);

  // Проверка авторизации при загрузке
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("currentUser");

    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        return true;
      } catch (error) {
        console.error("❌ Ошибка проверки авторизации:", error);
        logout();
        return false;
      }
    }
    return false;
  }, []);

  // Инициализация авторизации
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        await checkAuth();
      } catch (error) {
        console.error("❌ Ошибка инициализации авторизации:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [checkAuth]);

  // Функция входа - согласно документации
  const login = async (loginData) => {
    try {
      setIsLoading(true);
      const { login: username, password } = loginData;

      console.log("🔐 Попытка входа:", { username });

      // Согласно документации: POST /api/user/login
      const data = await makeRequest(`${USERS_API_BASE_URL}/login`, {
        method: "POST",
        body: {
          login: username,
          password: password,
        },
      });

      console.log("📨 Ответ от сервера при входе:", data);

      // Согласно документации: ответ содержит { user: { ... } }
      if (data && data.user) {
        const userData = {
          id: data.user.id,
          login: data.user.login,
          name: data.user.name,
          token: data.user.token,
        };

        setToken(data.user.token);
        setCurrentUser(userData);
        setUser(userData);

        console.log("✅ Успешный вход:", userData);

        return { success: true, data: data.user };
      }

      throw new Error("Неверный ответ от сервера");
    } catch (error) {
      console.error("❌ Ошибка входа:", error);

      // Очищаем данные при ошибке входа
      setToken(null);
      setCurrentUser(null);
      setUser(null);

      return {
        success: false,
        error: error.message || "Ошибка входа",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Функция выхода
  const logout = useCallback(() => {
    setToken(null);
    setCurrentUser(null);
    setUser(null);
    console.log("✅ Выход выполнен");
    return true;
  }, [setToken, setCurrentUser]);

  // Функция регистрации - согласно документации
  const register = async (registerData) => {
    try {
      setIsLoading(true);
      const { login: username, name, password } = registerData;

      console.log("📝 Попытка регистрации:", { username, name });

      // Согласно документации: POST /api/user
      const data = await makeRequest(USERS_API_BASE_URL, {
        method: "POST",
        body: {
          login: username,
          name: name,
          password: password,
        },
      });

      console.log("📨 Ответ от сервера при регистрации:", data);

      // Согласно документации: ответ содержит { user: { ... } }
      if (data && data.user) {
        const userData = {
          id: data.user.id,
          login: data.user.login,
          name: data.user.name,
          token: data.user.token,
        };

        setToken(data.user.token);
        setCurrentUser(userData);
        setUser(userData);

        console.log("✅ Успешная регистрация:", userData);

        return { success: true, data: data.user };
      }

      throw new Error("Неверный ответ от сервера");
    } catch (error) {
      console.error("❌ Ошибка регистрации:", error);

      // Очищаем данные при ошибке регистрации
      setToken(null);
      setCurrentUser(null);
      setUser(null);

      return {
        success: false,
        error: error.message || "Ошибка регистрации",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Получение списка пользователей
  const getUsers = async () => {
    try {
      const data = await makeRequest(USERS_API_BASE_URL, {
        method: "GET",
      });
      return data.users || [];
    } catch (error) {
      console.error("❌ Ошибка получения пользователей:", error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    getUsers,
    isAuthenticated: !!user?.token,
    isLoading,
    makeRequest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
