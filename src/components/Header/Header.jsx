import { useState, useEffect, useContext, useRef } from "react";
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
import { useThemeContext } from "../ThemeContext/ThemeContext.jsx";
import { AuthContext } from "../../context/AuthContext";

function Header({ onExitClick, onAddTaskClick, onUserSettingsClick }) {
  const [userDisplayName, setUserDisplayName] = useState("Пользователь");
  const [userButtonRect, setUserButtonRect] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userButtonRef = useRef(null);

  const { isDarkTheme } = useThemeContext();
  const { user } = useContext(AuthContext);

  // Обновление данных пользователя
  useEffect(() => {
    console.log("🔄 Обновление данных пользователя в Header:", user);

    if (user && user.name) {
      console.log("✅ Установлено имя пользователя:", user.name);
      setUserDisplayName(user.name);
    } else if (user && user.login) {
      console.log("⚠️ Используем логин как имя:", user.login);
      setUserDisplayName(user.login);
    } else {
      console.log("⚠️ Данные пользователя не найдены");
      setUserDisplayName("Пользователь");
    }
  }, [user]);

  // Получаем позицию кнопки пользователя
  const updateUserButtonPosition = () => {
    if (userButtonRef.current) {
      const rect = userButtonRef.current.getBoundingClientRect();
      setUserButtonRect({
        top: rect.top,
        right: rect.right,
        width: rect.width,
        height: rect.height,
      });
    }
  };

  const handleUserClick = () => {
    updateUserButtonPosition();
    if (onUserSettingsClick) {
      onUserSettingsClick();
    } else {
      // Fallback: навигация напрямую
      navigate("/user-settings");
    }
  };

  const handleAddTask = () => {
    if (onAddTaskClick) {
      onAddTaskClick();
    }
  };

  // Обновляем позицию при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      if (location.pathname === "/user-settings") {
        updateUserButtonPosition();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname]);

  // Определяем, открыты ли настройки пользователя для подсветки кнопки
  const isUserSettingsOpen = location.pathname === "/user-settings";

  return (
    <>
      <GlobalStyle />
      {/* ✅ ДОБАВЛЕНА ОБЕРТКА С ОТНОСИТЕЛЬНЫМ ПОЗИЦИОНИРОВАНИЕМ */}
      <div style={{ position: "relative" }}>
        <HeaderStyle>
          <HeaderStyleContainer>
            <HeaderBlock>
              {/* Логотип для светлой темы */}
              <HeaderLogo
                className={!isDarkTheme ? "_show _light" : "_light"}
                style={{ display: !isDarkTheme ? "block" : "none" }}
              >
                <a href="" target="_self">
                  <img src="images/logo.png" alt="logo" />
                </a>
              </HeaderLogo>

              {/* Логотип для темной темы */}
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
                <HeaderUser
                  ref={userButtonRef}
                  onClick={handleUserClick}
                  style={
                    isUserSettingsOpen
                      ? {
                          backgroundColor: isDarkTheme ? "#333" : "#f4f4f4",
                          color: isDarkTheme ? "#fff" : "#000",
                        }
                      : {}
                  }
                >
                  {userDisplayName}
                </HeaderUser>
              </HeaderNav>
            </HeaderBlock>
          </HeaderStyleContainer>
        </HeaderStyle>

        {/* ✅ ПЕРЕМЕЩЕНО ВНУТРЬ HEADER ДЛЯ КОРРЕКТНОГО ПОЗИЦИОНИРОВАНИЯ */}
        {isUserSettingsOpen && (
          <HeaderPopUserSet
            isOpen={true}
            onExitClick={onExitClick}
            onClose={() => navigate("/")}
            userButtonRect={userButtonRect}
          />
        )}
      </div>
    </>
  );
}

export default Header;
