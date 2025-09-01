import styled from "styled-components";

// Основной контейнер попапа
export const PopBrowseContainer = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;

  /* Отображение при наличии target */
  &:target {
    display: block;
  }
`;

// Внутренний контейнер
export const PopBrowseInner = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`;

// Блок содержимого попапа
export const PopBrowseBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
`;

// Контентная область
export const PopBrowseContent = styled.div`
  display: block;
  text-align: left;

  .categories__theme {
    opacity: 1;
  }

  .theme-down {
    display: none;
    margin-bottom: 20px;
  }

  .theme-top {
    display: block;
  }
`;

// Верхний блок с заголовком
export const PopBrowseTopBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

// Заголовок попапа
export const PopBrowseTitle = styled.h3`
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`;

// Обертка для формы и календаря
export const PopBrowseWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: 660px) {
    display: block;
  }
`;

// Форма просмотра
export const PopBrowseForm = styled.form`
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;

  @media screen and (max-width: 495px) {
    max-width: 100%;
  }
`;

// Блок формы
export const FormBrowseBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

// Текстовое поле формы
export const FormBrowseArea = styled.textarea`
  max-width: 370px;
  width: 100%;
  outline: none;
  padding: 14px;
  background: #eaeef6;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;
  resize: none;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: #94a6be;
    letter-spacing: -0.14px;
  }

  @media screen and (max-width: 495px) {
    max-width: 100%;
    height: 37px;
  }
`;

// Блок статуса
export const StatusBlock = styled.div`
  margin-bottom: 11px;
`;

// Параграф статуса
export const StatusParagraph = styled.p`
  margin-bottom: 14px;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

// Контейнер тем статуса
export const StatusThemes = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

// Тема статуса
export const StatusTheme = styled.div`
  border-radius: 24px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  color: #94a6be;
  padding: 11px 14px 10px;
  margin-right: 7px;
  margin-bottom: 7px;

  p {
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.14px;
  }
`;

// Кнопки просмотра
export const BrowseButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;

  button {
    height: 30px;
    margin-bottom: 10px;
    padding: 0 14px;
  }

  .btn-group button {
    margin-right: 8px;
  }

  @media screen and (max-width: 495px) {
    button {
      width: 100%;
      height: 40px;
    }

    .btn-group {
      width: 100%;
    }

    .btn-group button {
      margin-right: 0px;
    }
  }
`;

// Кнопки редактирования (скрыты по умолчанию)
export const EditButtons = styled.div`
  display: none;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;

  button {
    height: 30px;
    margin-bottom: 10px;
    padding: 0 14px;
  }

  .btn-group button {
    margin-right: 8px;
  }

  @media screen and (max-width: 495px) {
    button {
      width: 100%;
      height: 40px;
    }

    .btn-group {
      width: 100%;
    }

    .btn-group button {
      margin-right: 0px;
    }
  }
`;

// Стили для календаря (можно вынести в отдельный компонент)
export const CalendarStyles = {
  container: styled.div`
    width: 182px;
    margin-bottom: 20px;

    @media screen and (max-width: 660px) {
      max-width: 340px;
      width: 100%;

      .date-create {
        display: none;
        margin-bottom: 7px;
      }
    }
  `,
  title: styled.p`
    margin-bottom: 14px;
    padding: 0 7px;
    color: #000;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;

    @media screen and (max-width: 660px) {
      padding: 0;
    }
  `,
  paragraph: styled.p`
    color: #94a6be;
    font-size: 10px;
    line-height: 1;

    span {
      color: #000000;
    }

    @media screen and (max-width: 660px) {
      font-size: 14px;
    }
  `,
  // ... остальные стили календаря
};

// Вспомогательные классы
export const HideElement = styled.div`
  display: none;
`;

export const OrangeTheme = styled.div`
  background-color: #ffe4c2;
  color: #ff6d00;
`;

export const GrayTheme = styled.div`
  background: #94a6be;
  color: #ffffff;
`;

export const ActiveCategory = styled.div`
  opacity: 1 !important;
`;
