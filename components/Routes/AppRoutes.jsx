import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MainPage from "../../main.jsx";
import ContainerSignin from "./pages/ContainerSignin/ContainerSignin";
import ContainerSignup from "./pages/ContainerSignup/ContainerSignup";

function AppRoutes() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={<MainPage loading={loading} />} />
        {/* Страница входа */}
        <Route path="/sign-in" element={<ContainerSignin />} />
        {/* Страница регистрации */}
        <Route path="/sign-up" element={<ContainerSignup />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
