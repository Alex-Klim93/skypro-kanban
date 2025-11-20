import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ИСПРАВЛЕНО: используем контекст

export function useAuth() {
  // ✅ ИСПРАВЛЕНО: используем AuthContext вместо локального состояния
  const { user, login, logout } = useContext(AuthContext);

  // ✅ ИСПРАВЛЕНО: проверяем авторизацию через наличие пользователя
  const isAuthenticated = !!user;

  return {
    isAuthenticated,
    login,
    logout,
    user, // ✅ ДОБАВЛЕНО: возвращаем данные пользователя
  };
}

export default useAuth;
