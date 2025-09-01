import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyle } from "./Global.style.js";
import MainPage from "./pages/MainPage/MainPage.jsx";
import ContainerSignin from "./pages/ContainerSignin/ContainerSignin.jsx";
import ContainerSignup from "./pages/ContainerSignup/ContainerSignup.jsx";
import AddTaskPage from "./pages/AddTaskPage/AddTaskPage.jsx";
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
          path="/add-task"
          element={
            <ProtectedRoute>
              <AddTaskPage />
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
        <Route
          path="/exit"
          element={
            <ProtectedRoute>
              <ExitPage />
            </ProtectedRoute>
          }
        />

        {/* Redirects for old modal URLs */}
        <Route
          path="/modal/signin.html"
          element={<Navigate to="/sign-in" replace />}
        />
        <Route
          path="/modal/signup.html"
          element={<Navigate to="/sign-up" replace />}
        />

        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
