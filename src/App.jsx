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

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Routes>
        {/* Public routes */}
        <Route path="/sign-in" element={<ContainerSignin />} />
        <Route path="/sign-up" element={<ContainerSignup />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-task/:id"
          element={
            <ProtectedRoute>
              <EditTaskPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task/:id"
          element={
            <ProtectedRoute>
              <ViewTaskPage />
            </ProtectedRoute>
          }
        />

        {/* Redirects for old modal URLs */}
        <Route path="/sign-in" element={<ContainerSignin />} />
        <Route path="/sign-up" element={<ContainerSignup />} />

        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
