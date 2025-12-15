import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const USERS_API_BASE_URL = "https://wedev-api.sky.pro/api/user";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Начинаем с true для проверки авторизации
  const [authLoading, setAuthLoading] = useState(false); // Отдельное состояние для входа/регистрации

  // Проверка авторизации при загрузке приложения
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("userToken");
      const storedUser = localStorage.getItem("currentUser");

      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          console.error("Ошибка восстановления пользователя:", error);
          localStorage.removeItem("userToken");
          localStorage.removeItem("currentUser");
        }
      }
      setIsLoading(false); // Завершаем начальную загрузку
    };

    checkAuth();
  }, []);

  // Функция для входа
  const login = async (loginData) => {
    setAuthLoading(true);

    try {
      const response = await fetch(`${USERS_API_BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify({
          login: loginData.login,
          password: loginData.password,
        }),
      });

      const result = await response.json();

      if (response.status === 400) {
        throw new Error(result.error || "Неверный логин или пароль");
      }

      if (!response.ok) {
        throw new Error(
          `Ошибка ${response.status}: ${result.error || "Неизвестная ошибка"}`
        );
      }

      if (result && result.user) {
        // Сохраняем токен и данные пользователя
        localStorage.setItem("userToken", result.user.token);
        localStorage.setItem("currentUser", JSON.stringify(result.user));
        setUser(result.user);

        return {
          success: true,
          user: result.user,
        };
      }
    } catch (error) {
      console.error("Ошибка входа:", error.message);
      return {
        success: false,
        error: error.message || "Ошибка при входе",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // Функция для регистрации
  const register = async (registerData) => {
    setAuthLoading(true);

    try {
      const response = await fetch(USERS_API_BASE_URL, {
        method: "POST",
        body: JSON.stringify({
          login: registerData.login,
          name: registerData.name,
          password: registerData.password,
        }),
      });

      const result = await response.json();

      if (response.status === 400) {
        throw new Error(
          result.error || "Пользователь с таким логином уже существует"
        );
      }

      if (!response.ok) {
        throw new Error(
          `Ошибка ${response.status}: ${result.error || "Неизвестная ошибка"}`
        );
      }

      if (result && result.user) {
        // Сохраняем токен и данные пользователя
        localStorage.setItem("userToken", result.user.token);
        localStorage.setItem("currentUser", JSON.stringify(result.user));
        setUser(result.user);

        return {
          success: true,
          user: result.user,
        };
      }
    } catch (error) {
      console.error("Ошибка регистрации:", error.message);
      return {
        success: false,
        error: error.message || "Ошибка при регистрации",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // Функция для выхода
  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("currentUser");
    setUser(null);
    return true;
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isLoading, // Общая загрузка (проверка авторизации при старте)
    authLoading, // Загрузка при входе/регистрации
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
