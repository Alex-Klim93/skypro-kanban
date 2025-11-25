import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import PopExit from "../../components/PopExit/PopExit.jsx";
import { AuthContext } from "../../context/AuthContext";

function ExitPage() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Функция для обработки выхода
  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  // Функция для отмены выхода
  const handleCancel = () => {
    navigate("/");
  };

  return <PopExit isOpenExit={true} onClose={handleCancel} />;
}

export default ExitPage;
