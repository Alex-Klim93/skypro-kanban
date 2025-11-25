import { useThemeContext } from "../ThemeContext/ThemeContext.jsx";
import {
  PopUserSetContainer,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  ThemeCheckbox,
  PopUserButton,
} from "./HeaderPopUserSet.style";
import { currentUser } from "../../api/api.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HeaderPopUserSet({ isOpen, onExitClick, onClose }) {
  const { isDarkTheme, toggleTheme } = useThemeContext();
  const [userName, setUserName] = useState("Пользователь");
  const [userLogin, setUserLogin] = useState("логин");
  const navigate = useNavigate();

  // ✅ УПРОЩЕНО: получаем данные напрямую из currentUser
  useEffect(() => {
    console.log(
      "🔄 Обновление данных пользователя в HeaderPopUserSet:",
      currentUser
    );

    if (currentUser) {
      if (currentUser.name) {
        setUserName(currentUser.name);
      }
      if (currentUser.login) {
        setUserLogin(currentUser.login);
      }
    }
  }, [currentUser]);

  const handleExitClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Предотвращаем всплытие
    if (onExitClick) {
      onExitClick();
    } else {
      navigate("/exit");
    }
  };

  const handleClose = (e) => {
    e?.preventDefault();
    e?.stopPropagation(); // Предотвращаем всплытие
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  // Закрытие при клике на затемненную область
  useEffect(() => {
    const handleClickOutside = (event) => {
      const popup = document.getElementById("user-set-target");
      const userButton = document.querySelector("[data-user-button]");

      if (
        popup &&
        !popup.contains(event.target) &&
        !userButton?.contains(event.target)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <PopUserSetContainer
      id="user-set-target"
      $isOpen={isOpen}
      onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри
    >
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
  );
}

export default HeaderPopUserSet;
