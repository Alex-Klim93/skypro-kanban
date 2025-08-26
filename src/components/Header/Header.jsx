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

function Header() {
  const [open, setOpen] = useState(false);

  const handleUserClick = (e) => {
    e.preventDefault();
    setOpen(!open);
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
            <HeaderButton className="_hover01" id="btnMainNew">
              <a href="#popNewCard">Создать новую задачу</a>
            </HeaderButton>
            <HeaderUser onClick={handleUserClick}>Ivan Ivanov</HeaderUser>
            <HeaderPopUserSet isOpen={open} />
          </HeaderNav>
        </HeaderBlock>
      </HeaderStyleContainer>
    </HeaderStyle>
  );
}

export default Header;
