import styled from "styled-components";

// Основной контейнер попапа
export const PopBrowseContainer = styled.div`
  display: ${(props) =>
    props.isOpen ? "block" : "none"}; // Изменяем на управление через пропсы
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
`;

// Добавьте этот стиль
export const ActiveStatus = styled.div`
  display: block !important;
  background-color: var(--accent-secondary);
  color: var(--bg-secondary);
  border-radius: 24px;
  padding: 6px 12px;

  p {
    color: var(--bg-secondary);
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
  background: var(--overlay);
`;

// Блок содержимого попапа
export const PopBrowseBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: var(--bg-secondary);
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid var(--border-secondary);
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
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: 0px;
  text-align: left;

  .PopBrowseTitle {
    background: none;
    border: none;
    color: var(--text-primary);
    font-size: 20px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: 0px;
    text-align: left;
  }
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
  color: var(--text-secondary);
  background: var(--bg-primary);
  border: 0px solid var(--border-primary);
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
    color: var(--accent-secondary);
    letter-spacing: -0.14px;
  }

  @media screen and (max-width: 495px) {
    max-width: 100%;
    height: 37px;
  }
`;

// Блок статуса
export const StatusBlock = styled.div`
  margin-bottom: 18px;
`;

// Параграф статуса
export const StatusParagraph = styled.p`
  margin-bottom: 14px;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: 0px;
  text-align: left;
`;

// Контейнер тем статуса
export const StatusThemes = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap:7px;
`;



// Тема статуса
export const StatusTheme = styled.div`
  border-radius: 24px;
  background: var(--border-primary);

  p {
    color: var(--text-primary);
    font-size: 14px;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: 0%;
    text-align: center;
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

// ========== СТИЛИ КАЛЕНДАРЯ ==========

// Контейнер календаря
export const CalendarContainer = styled.div`
  width: 182px;
  margin-bottom: 20px;

  @media screen and (max-width: 660px) {
    max-width: 340px;
    width: 100%;
  }
`;

// Заголовок календаря
export const CalendarTitle = styled.p`
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 14px;
  padding: 0 7px;

  @media screen and (max-width: 660px) {
    padding: 0;
  }
`;

// Блок календаря
export const CalendarBlock = styled.div`
  display: block;
`;

// Навигация календаря
export const CalendarNav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 7px;

  @media screen and (max-width: 660px) {
    padding: 0;
  }
`;

// Месяц календаря
export const CalendarMonth = styled.div`
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
`;

// Действия навигации
export const NavActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Действие навигации
export const NavAction = styled.div`
  width: 18px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: var(--text-secondary);
  }
`;

// Контент календаря
export const CalendarContent = styled.div`
  margin-bottom: 12px;
`;

// Имена дней недели
export const CalendarDaysNames = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;

  @media screen and (max-width: 660px) {
    padding: 0;
  }
`;

// Имя дня недели
export const CalendarDayName = styled.div`
  color: var(--text-secondary);
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;

  @media screen and (max-width: 660px) {
    font-size: 14px;
  }

  /* Стили для выходных */
  &.-weekend- {
    color: #ff6d00;
  }
`;

// Ячейки календаря
export const CalendarCells = styled.div`
  width: 182px;
  height: 126px;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 660px) {
    width: 344px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

// Ячейка календаря
export const CalendarCell = styled.div`
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;
  cursor: pointer;

  @media screen and (max-width: 660px) {
    width: 42px;
    height: 42px;
    font-size: 14px;
  }

  /* Эффект при наведении */
  &:hover {
    color: var(--accent-secondary);
    background-color: var(--bg-tertiary0);
  }

  /* Стили для дней из других месяцев */
  &._other-month {
    opacity: 0;
  }

  /* Стили для выходных */
  &._weekend {
    color: #ff6d00;
  }

  /* Стили для текущего дня */
  &._current {
    font-weight: 700;
  }

  /* Стили для выбранного дня */
  &._selected {
    background-color: var(--accent-secondary);
    color: var(--bg-secondary);
  }

  /* Стили для активного дня */
  &._active-day {
    background-color: var(--accent-secondary);
    color: var(--bg-secondary);
  }
`;

// Период календаря
export const CalendarPeriod = styled.div`
  padding: 0 7px;

  @media screen and (max-width: 660px) {
    padding: 0;
  }
`;

// Текст периода
export const CalendarPeriodText = styled.p`
  color: var(--accent-secondary);
  font-size: 10px;
  line-height: 1;

  span {
    color: var(--text-primary);
  }

  @media screen and (max-width: 660px) {
    font-size: 14px;
  }
`;

// Скрытое поле для даты
export const DatePickValue = styled.input`
  display: none;
`;

// Вспомогательные классы
export const HideElement = styled.div`
  width: auto;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 14px 10px 14px;
  box-sizing: border-box;
  border: 0.7px solid var(--border-primary);
  border-radius: 24px;

  color: rgba(148, 166, 190, 1);
  font-size: 14px;
  font-weight: 400;
  line-height: 10px;
  letter-spacing: -1%;
  text-align: center;
`;

export const OrangeTheme = styled.div`
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  background-color: var(--orange-bg);
  color: var(--orange-text);
  font-size: 14px;
  font-weight: 600;
  line-height: 14.21px;
  letter-spacing: 0%;
  text-align: center;
`;

export const GrayTheme = styled.div`
  width: auto;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 14px 10px 14px;
  background: rgba(148, 166, 190, 1);
  border-radius: 24px;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    font-weight: 400;
    line-height: 10px;
    letter-spacing: 0%;
    text-align: center;
`;

export const ActiveCategory = styled.div`
  opacity: 1 !important;
`;
