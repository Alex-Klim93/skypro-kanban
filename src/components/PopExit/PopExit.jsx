import React from "react";
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
import { api } from "../../api/api.js";

function PopExit({ isOpenExit, onClose, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      api.logout();

      // ✅ ВЫЗЫВАЕМ ФУНКЦИЮ ИЗ APP.JSX
      if (onLogout) {
        onLogout();
      }

      navigate("/sign-in");

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Logout failed:", error);
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
    // ✅ ИСПРАВЛЕНО: используем $isOpen вместо isOpen
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
