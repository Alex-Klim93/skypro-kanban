import { Navigate } from "react-router-dom";

// ✅ ИСПРАВЛЕНО: убраны все useEffect и состояния
function ProtectedRoute({ children, isAuthenticated, isLoading }) {
  // Если идет загрузка, показываем индикатор
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Если не авторизован, редирект на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // Если авторизован, показываем защищенный контент
  return children;
}

export default ProtectedRoute;