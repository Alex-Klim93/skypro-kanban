import { useNavigate } from "react-router-dom";
import { api } from "../../api/api.js";
import PopExit from "../../components/PopExit/PopExit.jsx";

function ExitPage({ onLogout }) {
  const navigate = useNavigate();

  // Функция для обработки выхода
  const handleLogout = () => {
    api.logout();
    if (onLogout) {
      onLogout();
    }
    navigate("/sign-in");
  };

  // Функция для отмены выхода
  const handleCancel = () => {
    navigate("/"); // Возвращаем на главную
  };

  return (
    <PopExit
      isOpenExit={true} // Всегда открыт на странице выхода
      onClose={handleCancel}
      onLogout={handleLogout}
    />
  );
}

export default ExitPage;
