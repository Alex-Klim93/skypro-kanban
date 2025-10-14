import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Проверяем наличие токена в localStorage
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  // Пока проверяем аутентификацию, показываем loading
  if (isAuthenticated === null) {
    return <div>Загрузка...</div>;
  }

  // Если не аутентифицирован, перенаправляем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // Если аутентифицирован, показываем дочерний компонент
  return children;
}

export default ProtectedRoute;
