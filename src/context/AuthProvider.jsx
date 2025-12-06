import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";

const USERS_API_BASE_URL = "https://wedev-api.sky.pro/api/user";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Простая функция для запросов - ВОЗВРАЩАЕТ ОБЪЕКТ, НЕ БРОСАЕТ ОШИБКИ
  const makeRequest = async (url, options = {}) => {
    const token = localStorage.getItem("userToken");
    const headers = {
      Authorization: token ? `Bearer ${token}` : undefined,
      ...options.headers,
    };

    // Фильтруем undefined заголовки
    const filteredHeaders = {};
    for (const [key, value] of Object.entries(headers)) {
      if (value !== undefined) {
        filteredHeaders[key] = value;
      }
    }

    const config = {
      ...options,
      headers: filteredHeaders,
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);

      // Если сервер вернул ошибку 400 (неправильные данные)
      if (response.status === 400) {
        const errorData = await response.json().catch(() => ({}));
        return {
          error: true,
          message: errorData.error || "Неверный логин или пароль",
          status: 400,
        };
      }

      // Если сервер вернул другую ошибку
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          error: true,
          message: errorData.error || `Ошибка ${response.status}`,
          status: response.status,
        };
      }

      // Если все ок
      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      return {
        error: true,
        message: "Сетевая ошибка",
        status: 0,
      };
    }
  };

  const setToken = (token) => {
    if (token) {
      localStorage.setItem("userToken", token);
    } else {
      localStorage.removeItem("userToken");
      localStorage.removeItem("currentUser");
    }
  };

  const setCurrentUser = (userData) => {
    if (userData) {
      localStorage.setItem("currentUser", JSON.stringify(userData));
    } else {
      localStorage.removeItem("currentUser");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("currentUser");

    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("❌ Ошибка восстановления пользователя:", error);
        setToken(null);
        setCurrentUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  // Функция входа - НИКОГДА НЕ БРОСАЕТ ИСКЛЮЧЕНИЙ
  const login = async (loginData) => {

    setIsLoading(true);

    const result = await makeRequest(`${USERS_API_BASE_URL}/login`, {
      method: "POST",
      body: {
        login: loginData.login,
        password: loginData.password,
      },
    });

    // Если есть ошибка
    if (result.error) {
      setIsLoading(false);
      return {
        success: false,
        error: result.message || "Неверный логин или пароль",
      };
    }

    // Если успешно
    if (result && result.user) {
      const userData = {
        id: result.user.id,
        login: result.user.login,
        name: result.user.name,
        token: result.user.token,
      };

      setToken(result.user.token);
      setCurrentUser(userData);
      setUser(userData);
      setIsLoading(false);

      return {
        success: true,
        data: result.user,
      };
    }

    setIsLoading(false);
    return {
      success: false,
      error: "Неизвестная ошибка",
    };
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    setUser(null);
    return true;
  };

  const register = async (registerData) => {
    setIsLoading(true);

    const result = await makeRequest(USERS_API_BASE_URL, {
      method: "POST",
      body: {
        login: registerData.login,
        name: registerData.name,
        password: registerData.password,
      },
    });

    if (result.error) {
      setIsLoading(false);
      return {
        success: false,
        error: result.message || "Ошибка регистрации",
      };
    }

    if (result && result.user) {
      const userData = {
        id: result.user.id,
        login: result.user.login,
        name: result.user.name,
        token: result.user.token,
      };

      setToken(result.user.token);
      setCurrentUser(userData);
      setUser(userData);
      setIsLoading(false);

      return {
        success: true,
        data: result.user,
      };
    }

    setIsLoading(false);
    return {
      success: false,
      error: "Неизвестная ошибка",
    };
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user?.token,
    isLoading,
    makeRequest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
