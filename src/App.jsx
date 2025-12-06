import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyle } from "./Global.style.js";
import MainPage from "./pages/MainPage/MainPage.jsx";
import ContainerSignin from "./pages/ContainerSignin/ContainerSignin.jsx";
import ContainerSignup from "./pages/ContainerSignup/ContainerSignup.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext.jsx";
import ProtectedRoute from "./components/Routes/ProtectedRoute.jsx";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, logout, isLoading } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  // ✅ ПРОСТОЙ ИНДИКАТОР ЗАГРУЗКИ
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

  const isAuthenticated = !!user;

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Routes>
        {/* Главная страница - защищенная */}
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
          <Route path="exit" element={null} />
          <Route path="new-task" element={null} />
          <Route path="task/:id" element={null} />
          <Route path="task/:id/edit" element={null} />
          <Route path="user-settings" element={null} />
        </Route>

        {/* Страница входа - доступна только НЕавторизованным */}
        <Route
          path="/sign-in"
          element={
            !isAuthenticated ? <ContainerSignin /> : <Navigate to="/" replace />
          }
        />

        {/* Страница регистрации - доступна только НЕавторизованным */}
        <Route
          path="/sign-up"
          element={
            !isAuthenticated ? <ContainerSignup /> : <Navigate to="/" replace />
          }
        />

        {/* Страница 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
