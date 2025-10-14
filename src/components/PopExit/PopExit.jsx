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
import useAuth from "../Hooks/useAuth";

function PopExit({ isOpenExit, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  const handleCancel = () => {
    if (onClose) {
      onClose(); // Закрываем попап
    }
  };

  // Если попап не открыт, не рендерим его
  if (!isOpenExit) return null;

  return (
    <PopExitContainer isOpen={isOpenExit}>
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
