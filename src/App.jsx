import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { GlobalStyle } from "./Global.style.js";
import MainPage from "./pages/MainPage/MainPage.jsx";
import ContainerSignin from "./pages/ContainerSignin/ContainerSignin.jsx";
import ContainerSignup from "./pages/ContainerSignup/ContainerSignup.jsx";
import ExitPage from "./pages/ExitPage/ExitPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext.jsx";
import ProtectedRoute from "./components/Routes/ProtectedRoute.jsx";
import { checkAuth, api } from "./api/api.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyAuth = useCallback(async () => {
    try {
      console.log("🔐 Проверка авторизации...");
      const authStatus = await checkAuth();
      console.log("✅ Статус авторизации:", authStatus);

      if (authStatus) {
        try {
          const usersData = await api.getUsers();
          console.log("👥 Список пользователей загружен:", usersData.users);
        } catch (usersError) {
          console.log(
            "⚠️ Не удалось загрузить список пользователей:",
            usersError
          );
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

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  const handleLogout = useCallback(() => {
    console.log("🚪 Выход из системы...");
    api.logout();
    setIsAuthenticated(false);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#565eef",
        }}
      >
        Загрузка...
      </div>
    );
  }

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Routes>
        {/* Публичные маршруты */}
        <Route
          path="/sign-in"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <ContainerSignin />
          }
        />
        <Route
          path="/sign-up"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <ContainerSignup />
          }
        />

        {/* Защищенные маршруты с вложенными модальными окнами */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            >
              <MainPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          {/* Вложенные маршруты для модальных окон */}
          <Route path="exit" element={<ExitPage onLogout={handleLogout} />} />
          <Route path="new-task" element={null} /> // Для PopNewCard
          <Route path="task/:id" element={null} /> // Для PopBrowse
          <Route path="task/:id/edit" element={null} /> // Для PopBrowseEdit
          <Route path="user-settings" element={null} /> // Для HeaderPopUserSet
        </Route>

        {/* Страница 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
