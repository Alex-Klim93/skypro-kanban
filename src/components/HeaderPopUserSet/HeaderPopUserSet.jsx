import { useContext, useState, useEffect, useRef } from "react";
import { useThemeContext } from "../ThemeContext/ThemeContext.jsx";
import {
  PopUserSetWrapper,
  PopUserSetContainer,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  ThemeCheckbox,
  PopUserButton,
} from "./HeaderPopUserSet.style";
import { AuthContext } from "../../context/AuthContext";

function HeaderPopUserSet({ isOpen, onExitClick, onClose, userButtonRect }) {
  const { isDarkTheme, toggleTheme } = useThemeContext();
  const [userName, setUserName] = useState("Пользователь");
  const [userLogin, setUserLogin] = useState("логин");
  const modalRef = useRef(null);

  const { user } = useContext(AuthContext);

  // ✅ Обработчик клика вне модального окна
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Блокируем скролл
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset"; // Восстанавливаем скролл
    };
  }, [isOpen, onClose]);

  // ✅ Обновление данных пользователя
  useEffect(() => {
    console.log("🔄 Обновление данных пользователя в HeaderPopUserSet:", user);

    if (user) {
      if (user.name) {
        setUserName(user.name);
      }
      if (user.login) {
        setUserLogin(user.login);
      }
    }
  }, [user]);

  const handleExitClick = (e) => {
    e.preventDefault();
    if (onExitClick) {
      onExitClick();
    }
  };

  // ✅ Закрытие по клавише Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !userButtonRect) return null;

  return (
    // ✅ ИСПОЛЬЗУЕМ ПОЗИЦИЮ КНОПКИ ПОЛЬЗОВАТЕЛЯ ДЛЯ ПРИВЯЗКИ
    <PopUserSetWrapper
      style={{
        position: "absolute",
        top: `${userButtonRect.top + userButtonRect.height + 10}px`, // ✅ СДВИГ ВНИЗ ОТНОСИТЕЛЬНО ИМЕНИ ПОЛЬЗОВАТЕЛЯ
        right: `${window.innerWidth - userButtonRect.right}px`,
      }}
    >
      <PopUserSetContainer id="user-set-target" $isOpen={isOpen} ref={modalRef}>
        <PopUserName>{userName}</PopUserName>
        <PopUserMail>{userLogin}</PopUserMail>

        <PopUserTheme>
          <label style={{ cursor: "pointer", margin: 0, padding: 0 }}>
            Темная тема
          </label>
          <ThemeCheckbox
            name="checkbox"
            checked={isDarkTheme}
            onChange={() => toggleTheme()}
          />
        </PopUserTheme>

        <PopUserButton type="button" onClick={handleExitClick}>
          Выйти
        </PopUserButton>
      </PopUserSetContainer>
    </PopUserSetWrapper>
  );
}

export default HeaderPopUserSet;
