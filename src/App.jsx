import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyle } from "./Global.style.js";
import MainPage from "./pages/MainPage/MainPage.jsx";
import ContainerSignin from "./pages/ContainerSignin/ContainerSignin.jsx";
import ContainerSignup from "./pages/ContainerSignup/ContainerSignup.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import { ThemeProvider, useThemeContext } from "./components/ThemeContext/ThemeContext.jsx";
import ProtectedRoute from "./components/Routes/ProtectedRoute.jsx";
import { AuthContext } from "./context/AuthContext";

// Компонент-обертка для отложенного рендеринга
function AppContent() {
  const { user, logout, isLoading } = useContext(AuthContext);
  const { isThemeLoaded } = useThemeContext();

  const handleLogout = () => {
    logout();
  };

  const isAuthenticated = !!user;

  // Если тема еще не загружена, показываем минимальный прелоадер
  if (!isThemeLoaded) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f4f4'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px',
          border: '3px solid #94a6be',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Routes>
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
          <Route path="exit" element={null} />
          <Route path="new-task" element={null} />
          <Route path="task/:id" element={null} />
          <Route path="task/:id/edit" element={null} />
          <Route path="user-settings" element={null} />
        </Route>

        <Route
          path="/sign-in"
          element={
            !isAuthenticated ? <ContainerSignin /> : <Navigate to="/" replace />
          }
        />

        <Route
          path="/sign-up"
          element={
            !isAuthenticated ? <ContainerSignup /> : <Navigate to="/" replace />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;