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
    console.log("🚪 Выход из системы через AuthContext...");
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

        {/* Защищенные маршруты */}
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

        {/* Страница 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
