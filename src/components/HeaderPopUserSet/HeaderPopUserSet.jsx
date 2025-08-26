import { useState } from "react";
import PopExit from "../PopExit/PopExit.jsx";
import {
  PopUserSetContainer,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  ThemeCheckbox,
  PopUserButton,
} from "./HeaderPopUserSet.style";

/**
 * Компонент всплывающего окна настроек пользователя
 * Отображает информацию о пользователе, настройку темы и кнопку выхода
 *
 * @param {Object} props - Свойства компонента
 * @param {boolean} props.isOpen - Флаг отображения окна настроек
 * @returns {JSX.Element} Окно настроек пользователя
 */
function HeaderPopUserSet({ isOpen }) {
  // Состояние для управления отображением окна подтверждения выхода
  const [openExit, setOpenExit] = useState(false);

  /**
   * Обработчик клика по кнопке выхода
   * Открывает окно подтверждения выхода
   *
   * @param {Event} e - Событие клика
   */
  const handleUserClick = (e) => {
    e.preventDefault();
    setOpenExit(!openExit);
  };

  return (
    <>
      {/* Основной контейнер настроек пользователя */}
      <PopUserSetContainer
        id="user-set-target"
        $isOpen={isOpen} // Передаем состояние видимости через пропс
      >
        {/* Имя пользователя */}
        <PopUserName>Ivan Ivanov</PopUserName>

        {/* Email пользователя */}
        <PopUserMail>ivan.ivanov@gmail.com</PopUserMail>

        {/* Блок настройки темы */}
        <PopUserTheme>
          <p>Темная тема</p>
          {/* Переключатель темы */}
          <ThemeCheckbox name="checkbox" />
        </PopUserTheme>

        {/* Кнопка выхода с обработчиком клика */}
        <PopUserButton type="button" onClick={handleUserClick}>
          Выйти
        </PopUserButton>
      </PopUserSetContainer>

      {/* Компонент окна подтверждения выхода */}
      <PopExit isOpenExit={openExit} />
    </>
  );
}

export default HeaderPopUserSet;
