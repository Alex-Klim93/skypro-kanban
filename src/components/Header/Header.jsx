import { useState } from "react";
import HeaderPopUserSet from "../HeaderPopUserSet/HeaderPopUserSet.jsx";
import {
  HeaderStyle,
  HeaderStyleContainer,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  HeaderButton,
  HeaderUser,
} from "./Header.style.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

function Header() {
  const [open, setOpen] = useState(false); // Добавляем состояние для попапа
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleUserClick = () => {
    setOpen(!open); // Переключаем видимость попапа пользователя
  };

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  const handleExitClick = () => {
    navigate("/exit");
  };

  const handleAddTask = () => {
    navigate("/add-task"); // Переход на страницу добавления задачи
  };

  return (
    <HeaderStyle>
      <HeaderStyleContainer>
        <HeaderBlock>
          <HeaderLogo className="_show _light">
            <a href="" target="_self">
              <img src="images/logo.png" alt="logo" />
            </a>
          </HeaderLogo>
          <HeaderLogo className="_dark">
            <a href="" target="_self">
              <img src="images/logo_dark.png" alt="logo" />
            </a>
          </HeaderLogo>
          <HeaderNav>
            {/* Меняем ссылку на вызов функции */}
            <HeaderButton
              className="_hover01"
              id="btnMainNew"
              onClick={handleAddTask}
            >
              Создать новую задачу
            </HeaderButton>
            <HeaderUser onClick={handleUserClick}>Ivan Ivanov</HeaderUser>
            {/* Передаем функции в попап пользователя */}
            <HeaderPopUserSet
              isOpen={open}
              onLogout={handleLogout}
              onExit={handleExitClick}
            />
          </HeaderNav>
        </HeaderBlock>
      </HeaderStyleContainer>
    </HeaderStyle>
  );
}

export default Header;
