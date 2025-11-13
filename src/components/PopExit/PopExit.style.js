import styled from "styled-components";

// Основной контейнер всплывающего окна выхода
export const PopExitContainer = styled.div`
  display: ${props => props.$isOpen ? "block" : "none"};
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
`;

// Контейнер для центрирования содержимого
export const PopExitWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--overlay);
`;

// Блок с содержимым всплывающего окна
export const PopExitBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: var(--bg-secondary);
  max-width: 370px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid var(--border-secondary);
  box-shadow: var(--shadow-primary);
`;

// Заголовок всплывающего окна
export const PopExitTitle = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h2 {
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: -0.4px;
    margin-bottom: 20px;
  }
`;

// Группа кнопок формы
export const PopExitFormGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 375px) {
    display: block;
  }
`;

// Кнопка "Да, выйти"
export const ExitYesButton = styled.button`
  width: 153px;
  height: 30px;
  background-color: var(--accent-primary);
  border-radius: 4px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: var(--text-primary);
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 300ms;

  &:hover {
    background-color: var(--accent-hover);
  }

  a {
    width: 100%;
    height: 100%;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  @media only screen and (max-width: 375px) {
    width: 100%;
    height: 40px;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

// Кнопка "Нет, остаться"
export const ExitNoButton = styled.button`
  width: 153px;
  height: 30px;
  background-color: transparent;
  border-radius: 4px;
  border: 0.7px solid var(--accent-primary);
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color 300ms, color 300ms;

  &:hover {
    background-color: var(--accent-hover);
    color: var(--text-primary);

    a {
      color: var(--text-primary);
    }
  }

  a {
    width: 100%;
    height: 100%;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  @media only screen and (max-width: 375px) {
    width: 100%;
    height: 40px;
  }
`;

// Форма выхода
export const PopExitForm = styled.form`
  width: 100%;
`;
