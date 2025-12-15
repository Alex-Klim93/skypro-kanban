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
  const [logoError, setLogoError] = useState({ light: false, dark: false });
  const navigate = useNavigate();
  const location = useLocation();
  const userButtonRef = useRef(null);

  const { isDarkTheme } = useThemeContext();
  const { user } = useContext(AuthContext);

  // Обновление данных пользователя
  useEffect(() => {
    if (user && user.name) {
      setUserDisplayName(user.name);
    } else if (user && user.login) {
      setUserDisplayName(user.login);
    } else {
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
      navigate("/user-settings");
    }
  };

  const handleAddTask = () => {
    if (onAddTaskClick) {
      onAddTaskClick();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (location.pathname === "/user-settings") {
        updateUserButtonPosition();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname]);

  const isUserSettingsOpen = location.pathname === "/user-settings";

  // Обработчики ошибок загрузки изображений
  const handleLightLogoError = () => {
    console.log("Light logo failed to load, using fallback");
    setLogoError(prev => ({ ...prev, light: true }));
  };

  const handleDarkLogoError = () => {
    console.log("Dark logo failed to load, using fallback");
    setLogoError(prev => ({ ...prev, dark: true }));
  };

  // Определяем, какой логотип показывать
  const shouldShowLightLogo = !isDarkTheme && !logoError.light;
  const shouldShowDarkLogo = isDarkTheme && !logoError.dark;

  return (
    <>
      <GlobalStyle />
      <div style={{ position: "relative" }}>
        <HeaderStyle>
          <HeaderStyleContainer>
            <HeaderBlock>
              {/* Логотип для светлой темы */}
              <HeaderLogo
                className={!isDarkTheme ? "_show _light" : "_light"}
                style={{ 
                  display: shouldShowLightLogo ? "block" : "none",
                  width: "124px",
                  height: "40px"
                }}
              >
                <a 
                  href="/" 
                  target="_self"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    textDecoration: "none"
                  }}
                >
                  {shouldShowLightLogo ? (
                    <img 
                      src="/images/logo.png" 
                      alt="TaskMaster Logo" 
                      onError={handleLightLogoError}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain"
                      }}
                    />
                  ) : (
                    <div style={{
                      color: "#333",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "'Roboto', sans-serif"
                    }}>
                      TaskMaster
                    </div>
                  )}
                </a>
              </HeaderLogo>

              {/* Логотип для темной темы */}
              <HeaderLogo
                className={isDarkTheme ? "_show _dark" : "_dark"}
                style={{ 
                  display: shouldShowDarkLogo ? "block" : "none",
                  width: "124px",
                  height: "40px"
                }}
              >
                <a 
                  href="/" 
                  target="_self"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    textDecoration: "none"
                  }}
                >
                  {shouldShowDarkLogo ? (
                    <img 
                      src="/images/logo_dark.png" 
                      alt="TaskMaster Logo" 
                      onError={handleDarkLogoError}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain"
                      }}
                    />
                  ) : (
                    <div style={{
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "'Roboto', sans-serif"
                    }}>
                      TaskMaster
                    </div>
                  )}
                </a>
              </HeaderLogo>

              {/* Fallback логотип (текстовый) */}
              {(logoError.light || logoError.dark || (!shouldShowLightLogo && !shouldShowDarkLogo)) && (
                <div style={{
                  width: "124px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <a 
                    href="/" 
                    target="_self"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/");
                    }}
                    style={{
                      textDecoration: "none",
                      color: isDarkTheme ? "#fff" : "#333",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "'Roboto', sans-serif"
                    }}
                  >
                    TaskMaster
                  </a>
                </div>
              )}

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