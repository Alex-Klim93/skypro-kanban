import { useState, useEffect } from "react";
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

// ДОБАВЛЕНО: импорт данных пользователя из API
import { currentUser } from "../../api/api.js";

function Header({ onExitClick, onAddTaskClick }) {
  const [open, setOpen] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState("Пользователь");
  const navigate = useNavigate();

  // ✅ УПРОЩЕНО: получаем имя напрямую из currentUser
  useEffect(() => {
    console.log("🔄 Обновление данных пользователя в Header:", currentUser);

    if (currentUser && currentUser.name) {
      console.log("✅ Установлено имя пользователя:", currentUser.name);
      setUserDisplayName(currentUser.name);
    } else if (currentUser && currentUser.login) {
      console.log("⚠️ Используем логин как имя:", currentUser.login);
      setUserDisplayName(currentUser.login);
    } else {
      console.log("⚠️ Данные пользователя не найдены");
      setUserDisplayName("Пользователь");
    }
  }, [currentUser]); // ✅ Обновляем при изменении currentUser

  const handleUserClick = () => {
    setOpen(!open);
  };

  const handleAddTask = () => {
    if (onAddTaskClick) {
      onAddTaskClick();
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
              onClick={handleAddTask}
            >
              Создать новую задачу
            </HeaderButton>
            <HeaderUser onClick={handleUserClick}>{userDisplayName}</HeaderUser>
            <HeaderPopUserSet isOpen={open} onExitClick={onExitClick} />
          </HeaderNav>
        </HeaderBlock>
      </HeaderStyleContainer>
    </HeaderStyle>
  );
}

export default Header;
