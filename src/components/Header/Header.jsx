import { useState, useEffect } from "react";
import { GlobalStyle } from "../../Global.style.js";
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
import { useNavigate, useLocation } from "react-router-dom";

// ДОБАВЛЕНО: импорт контекста темы
import { useThemeContext } from "../ThemeContext/ThemeContext.jsx";

// ДОБАВЛЕНО: импорт данных пользователя из API
import { currentUser } from "../../api/api.js";

function Header({ onExitClick, onAddTaskClick }) {
  const [userDisplayName, setUserDisplayName] = useState("Пользователь");
  const navigate = useNavigate();
  const location = useLocation();

  // ДОБАВЛЕНО: получаем состояние темы
  const { isDarkTheme } = useThemeContext();

  // Определяем, открыт ли попап настроек пользователя
  const isUserSettingsOpen = location.pathname === "/user-settings";

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
    if (isUserSettingsOpen) {
      // Если попап уже открыт, закрываем его
      navigate("/");
    } else {
      // Если попап закрыт, открываем его
      navigate("/user-settings");
    }
  };

  const handleAddTask = () => {
    if (onAddTaskClick) {
      onAddTaskClick();
    }
  };

  return (
    <>
      <GlobalStyle />
      <HeaderStyle>
        <HeaderStyleContainer>
          <HeaderBlock>
            {/* Логотип для светлой темы - показывается когда isDarkTheme = false */}
            <HeaderLogo
              className={!isDarkTheme ? "_show _light" : "_light"}
              style={{ display: !isDarkTheme ? "block" : "none" }}
            >
              <a href="" target="_self">
                <img src="images/logo.png" alt="logo" />
              </a>
            </HeaderLogo>

            {/* Логотип для темной темы - показывается когда isDarkTheme = true */}
            <HeaderLogo
              className={isDarkTheme ? "_show _dark" : "_dark"}
              style={{ display: isDarkTheme ? "block" : "none" }}
            >
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

              {/* Обертка для правильного позиционирования попапа */}
              <div style={{ position: "relative", display: "inline-block" }}>
                <HeaderUser onClick={handleUserClick}>
                  {userDisplayName}
                </HeaderUser>

                {/* HeaderPopUserSet рендерится прямо здесь для правильного позиционирования */}
                <HeaderPopUserSet
                  isOpen={isUserSettingsOpen}
                  onExitClick={onExitClick}
                  onClose={() => navigate("/")}
                />
              </div>
            </HeaderNav>
          </HeaderBlock>
        </HeaderStyleContainer>
      </HeaderStyle>
    </>
  );
}

export default Header;
