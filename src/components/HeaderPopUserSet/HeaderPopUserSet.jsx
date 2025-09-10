import { useThemeContext } from "../ThemeContext/ThemeContext.jsx";
import {
  PopUserSetContainer,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  ThemeCheckbox,
  PopUserButton,
} from "./HeaderPopUserSet.style";

function HeaderPopUserSet({ isOpen, onExitClick }) {
  const { isDarkTheme, toggleTheme } = useThemeContext();

  const handleExitClick = (e) => {
    e.preventDefault();
    if (onExitClick) {
      onExitClick(); // Вызываем функцию открытия попапа выхода
    }
  };

  return (
    <PopUserSetContainer id="user-set-target" $isOpen={isOpen}>
      <PopUserName>Ivan Ivanov</PopUserName>
      <PopUserMail>ivan.ivanov@gmail.com</PopUserMail>

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
