import React, { useContext } from "react";
import {
  PopExitContainer,
  PopExitWrapper,
  PopExitBlock,
  PopExitTitle,
  PopExitForm,
  PopExitFormGroup,
  ExitYesButton,
  ExitNoButton,
} from "./PopExit.style";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";

function PopExit({ isOpenExit, onClose }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      // Вызываем logout из контекста
      logout();

      // Перенаправляем на страницу входа
      navigate("/sign-in");

      // Закрываем попап
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Logout failed:", error);

      // В любом случае перенаправляем на страницу входа
      navigate("/sign-in");

      if (onClose) {
        onClose();
      }
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!isOpenExit) return null;

  return (
    <PopExitContainer $isOpen={isOpenExit}>
      <PopExitWrapper>
        <PopExitBlock>
          <PopExitTitle>
            <h2>Выйти из аккаунта?</h2>
          </PopExitTitle>

          <PopExitForm id="formExit" action="#">
            <PopExitFormGroup>
              <ExitYesButton type="button" id="exitYes" onClick={handleLogout}>
                Да, выйти
              </ExitYesButton>

              <ExitNoButton type="button" id="exitNo" onClick={handleCancel}>
                Нет, остаться
              </ExitNoButton>
            </PopExitFormGroup>
          </PopExitForm>
        </PopExitBlock>
      </PopExitWrapper>
    </PopExitContainer>
  );
}

export default PopExit;
