import { useState } from "react";
import PopExit from "../PopExit/PopExit.jsx";
import { useThemeContext } from "../ThemeContext/ThemeContext.jsx";
import {
  PopUserSetContainer,
  PopUserName,
  PopUserMail,
  PopUserTheme,
  ThemeCheckbox,
  PopUserButton,
} from "./HeaderPopUserSet.style";

function HeaderPopUserSet({ isOpen }) {
  const [openExit, setOpenExit] = useState(false);
  const { isDarkTheme, toggleTheme } = useThemeContext();

  const handleUserClick = (e) => {
    e.preventDefault();
    setOpenExit(!openExit);
  };

  return (
    <>
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

        <PopUserButton type="button" onClick={handleUserClick}>
          Выйти
        </PopUserButton>
      </PopUserSetContainer>

      <PopExit isOpenExit={openExit} />
    </>
  );
}

export default HeaderPopUserSet;
