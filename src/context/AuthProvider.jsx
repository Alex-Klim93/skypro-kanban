import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const USERS_API_BASE_URL = "https://wedev-api.sky.pro/api/user";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Проверка авторизации при загрузке
  const checkAuth = () => {
    const token = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("currentUser");

    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        return true;
      } catch (error) {
        console.error("❌ Ошибка восстановления пользователя:", error);
        localStorage.removeItem("userToken");
        localStorage.removeItem("currentUser");
        return false;
      }
    }
    return false;
  };

  // Упрощенная функция для запросов
  const makeRequest = async (url, options = {}) => {
    const token = localStorage.getItem("userToken");

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const config = {
      ...options,
      headers,
    };

    if (options.body && typeof options.body !== "string") {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);

      // Обрабатываем ошибку 400
      if (response.status === 400) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Неверные данные");
      }

      // Обрабатываем другие ошибки
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Ошибка ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
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

  // Проверяем авторизацию при монтировании компонента
  useEffect(() => {
    checkAuth();
  }, []);

  // Функция входа
  const login = async (loginData) => {
    setIsLoading(true);

    try {
      const result = await makeRequest(`${USERS_API_BASE_URL}/login`, {
        method: "POST",
        body: {
          login: loginData.login,
          password: loginData.password,
        },
      });

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

        return {
          success: true,
          data: result.user,
        };
      }

      return {
        success: false,
        error: "Неизвестная ошибка",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Неверный логин или пароль",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    setUser(null);
    return true;
  };

  const register = async (registerData) => {
    setIsLoading(true);

    try {
      const result = await makeRequest(USERS_API_BASE_URL, {
        method: "POST",
        body: {
          login: registerData.login,
          name: registerData.name,
          password: registerData.password,
        },
      });

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

        return {
          success: true,
          data: result.user,
        };
      }

      return {
        success: false,
        error: "Неизвестная ошибка",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Ошибка регистрации",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user?.token,
    isLoading,
    makeRequest,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
