import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyle } from "./Global.style.js";
import MainPage from "./pages/MainPage/MainPage.jsx";
import ContainerSignin from "./pages/ContainerSignin/ContainerSignin.jsx";
import ContainerSignup from "./pages/ContainerSignup/ContainerSignup.jsx";
import EditTaskPage from "./pages/EditTaskPage/EditTaskPage.jsx";
import ViewTaskPage from "./pages/ViewTaskPage/ViewTaskPage.jsx";
import ExitPage from "./pages/ExitPage/ExitPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext.jsx";
import ProtectedRoute from "./components/Routes/ProtectedRoute.jsx";
import { checkAuth, api } from "./api/api.js";

function App() {
  // Состояния для управления авторизацией и загрузкой
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Функция для проверки авторизации при загрузке приложения
  const verifyAuth = useCallback(async () => {
    try {
      console.log("🔐 Проверка авторизации...");
      const authStatus = await checkAuth();
      console.log("✅ Статус авторизации:", authStatus);
      
      // Если пользователь авторизован, загружаем список пользователей
      if (authStatus) {
        try {
          const usersData = await api.getUsers();
          console.log("👥 Список пользователей загружен:", usersData.users);
        } catch (usersError) {
          console.log("⚠️ Не удалось загрузить список пользователей:", usersError);
        }
      }
      
      setIsAuthenticated(authStatus);
    } catch (error) {
      console.error("❌ Ошибка проверки авторизации:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Проверяем авторизацию при монтировании компонента
  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  // Функция для выхода из системы
  const handleLogout = useCallback(() => {
    console.log("🚪 Выход из системы...");
    api.logout();
    setIsAuthenticated(false);
  }, []);

  // Показываем индикатор загрузки во время проверки авторизации
  if (isLoading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        fontSize: "18px",
        color: "#565eef"
      }}>
        Загрузка...
      </div>
    );
  }

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Routes>
        {/* Публичные маршруты - доступны без авторизации */}
        <Route
          path="/sign-in"
          element={
            // Если пользователь уже авторизован, перенаправляем на главную
            isAuthenticated ? <Navigate to="/" replace /> : <ContainerSignin />
          }
        />
        <Route
          path="/sign-up"
          element={
            // Если пользователь уже авторизован, перенаправляем на главную
            isAuthenticated ? <Navigate to="/" replace /> : <ContainerSignup />
          }
        />

        {/* Защищенные маршруты - требуют авторизации */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            >
              {/* Передаем функцию выхода в MainPage для использования в попапе выхода */}
              <MainPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/edit-task/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            >
              <EditTaskPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/task/:id"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            >
              <ViewTaskPage />
            </ProtectedRoute>
          }
        />

        {/* Маршрут для страницы выхода */}
        <Route
          path="/exit"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            >
              <ExitPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Страница 404 для несуществующих маршрутов */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;