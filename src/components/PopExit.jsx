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

/**
 * Компонент всплывающего окна подтверждения выхода
 * @param {Object} props - Свойства компонента
 * @param {boolean} props.isOpenExit - Флаг отображения окна
 * @returns {JSX.Element} Окно подтверждения выхода
 */
function PopExit({ isOpenExit }) {
  return (
    <PopExitContainer isOpen={isOpenExit} id="popExit">
      <PopExitWrapper>
        <PopExitBlock>
          <PopExitTitle>
            <h2>Выйти из аккаунта?</h2>
          </PopExitTitle>

          <PopExitForm id="formExit" action="#">
            <PopExitFormGroup>
              <ExitYesButton type="button" id="exitYes">
                <a href="modal/signin.html">Да, выйти</a>
              </ExitYesButton>

              <ExitNoButton type="button" id="exitNo">
                <a href="main.html">Нет, остаться</a>
              </ExitNoButton>
            </PopExitFormGroup>
          </PopExitForm>
        </PopExitBlock>
      </PopExitWrapper>
    </PopExitContainer>
  );
}

export default PopExit;
