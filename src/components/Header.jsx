import "../App.css";
import { useState } from "react";
import HeaderPopUserSet from "./HeaderPopUserSet.jsx";

function Header() {
  const [open, setOpen] = useState(false);

  const handleUserClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__block">
            <div className="header__logo _show _light">
              <a href="" target="_self">
                <img src="images/logo.png" alt="logo" />
              </a>
            </div>
            <div className="header__logo _dark">
              <a href="" target="_self">
                <img src="public/images/logo_dark.png" alt="logo" />
              </a>
            </div>
            <nav className="header__nav">
              <button className="header__btn-main-new _hover01" id="btnMainNew">
                <a href="#popNewCard">Создать новую задачу</a>
              </button>
              <a href="#user-set-target" className="header__user _hover02" onClick={handleUserClick}>
                Ivan Ivanov
              </a>

              <HeaderPopUserSet isOpen={open} />
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
