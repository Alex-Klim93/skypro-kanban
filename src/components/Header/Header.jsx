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

function Header({ onExitClick, onAddTaskClick }) {
  // Добавляем пропс onAddTaskClick
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleUserClick = () => {
    setOpen(!open);
  };

  const handleAddTask = () => {
    if (onAddTaskClick) {
      onAddTaskClick(); // Вызываем функцию открытия попапа вместо навигации
    }
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
            <HeaderButton
              className="_hover01"
              id="btnMainNew"
              onClick={handleAddTask} // Используем новую функцию
            >
              Создать новую задачу
            </HeaderButton>
            <HeaderUser onClick={handleUserClick}>Ivan Ivanov</HeaderUser>
            <HeaderPopUserSet isOpen={open} onExitClick={onExitClick} />
          </HeaderNav>
        </HeaderBlock>
      </HeaderStyleContainer>
    </HeaderStyle>
  );
}

export default Header;
