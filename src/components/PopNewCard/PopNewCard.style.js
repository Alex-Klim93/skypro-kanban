import styled from "styled-components";

// Основной контейнер всплывающего окна
export const PopNewCardContainer = styled.div`
  
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;

  /* Показ окна при наличии target */
  &:target {
    display: block;
  }
`;

// Контейнер для центрирования содержимого
export const PopNewCardWrapper = styled.div`
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

// Блок с содержимым карточки
export const PopNewCardBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: var(--bg-secondary);
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid var(--border-secondary);
  position: relative;
`;

// Контентная область
export const PopNewCardContent = styled.div`
  display: block;
  text-align: left;
`;

// Заголовок карточки
export const PopNewCardTitle = styled.h3`
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 20px;
`;

// Кнопка закрытия
export const PopNewCardClose = styled.a`
  position: absolute;
  top: 20px;
  right: 30px;
  color: var(--text-secondary);
  cursor: pointer;

  &:hover {
    color: var(--text-accent);
  }
`;

// Обертка для формы и календаря
export const PopNewCardWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 660px) {
    display: block;
  }
`;

// Форма создания новой карточки
export const FormNew = styled.form`
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;

  @media (max-width: 495px) {
    max-width: 100%;
  }
`;

// Блок формы
export const FormNewBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

// Подзаголовок
export const Subtitle = styled.label`
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

// Поле ввода
export const FormNewInput = styled.input`
  width: 100%;
  outline: none;
  padding: 14px;
  color: var(--text-secondary);
  background: transparent;
  border: 0.7px solid var(--border-primary);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin: 20px 0;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: var(--text-secondary);
    letter-spacing: -0.14px;
  }
`;

// Текстовое поле
export const FormNewTextarea = styled.textarea`
  width: 100%;
  outline: none;
  padding: 14px;
  color: var(--text-secondary);
  background: transparent;
  border: 0.7px solid var(--border-primary);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: var(--text-secondary);
    letter-spacing: -0.14px;
  }

  @media (max-width: 495px) {
    max-width: 100%;
    height: 34px;
  }
`;

// Кнопка создания
export const FormNewCreateButton = styled.button`
  width: 132px;
  height: 30px;
  background-color: var(--text-accent);
  border-radius: 4px;
  border: 0;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: var(--text-primary);
  float: right;
  cursor: pointer;

  /* Эффект при наведении */
  &:hover {
    background-color: var(--accent-hover);
  }

  @media (max-width: 495px) {
    width: 100%;
    height: 40px;
  }
`;

// Календарь
export const CalendarContainer = styled.div`
  width: 182px;
  margin-bottom: 20px;

  @media (max-width: 660px) {
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

  @media (max-width: 660px) {
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

  @media (max-width: 660px) {
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
    fill: var(--accent-secondary);
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

  @media (max-width: 660px) {
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

  @media (max-width: 660px) {
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

  @media (max-width: 660px) {
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
  color: var(--accent-secondary);
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;
  cursor: pointer;

  @media (max-width: 660px) {
    width: 42px;
    height: 42px;
    font-size: 14px;
  }

  /* Эффект при наведении */
  &:hover {
    color: var(--text-secondary);
    background-color: var(--bg-tertiary);
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

  /* Стили для активного дня */
  &._active-day {
    background-color: var(--accent-secondary);
    color: var(--bg-secondary);
  }
`;

// Период календаря
export const CalendarPeriod = styled.div`
  padding: 0 7px;

  @media (max-width: 660px) {
    padding: 0;
  }
`;

// Текст периода
export const CalendarPeriodText = styled.p`
  color: var(--text-secondary);
  font-size: 10px;
  line-height: 1;

  span {
    color: var(--text-primary);
  }

  @media (max-width: 660px) {
    font-size: 14px;
  }
`;

// Скрытое поле для даты
export const DatePickValue = styled.input`
  display: none;
`;

// Категории
export const CategoriesContainer = styled.div`
  margin-bottom: 20px;
`;

// Текст категорий
export const CategoriesText = styled.p`
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 14px;
`;

// Темы категорий
export const CategoriesThemes = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

// Тема категории
export const CategoryTheme = styled.div`
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  margin-right: 7px;
  opacity: 0.4;
  cursor: pointer;

  /* Активная категория */
  &._active-category {
    opacity: 1 !important;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    white-space: nowrap;
  }

  /* Оранжевая тема */
  &._orange {
    background-color: var(--orange-bg);
    color: var(--orange-text);
  }

  /* Зеленая тема */
  &._green {
    background-color: var(--green-bg);
    color: var(--green-text);
  }

  /* Фиолетовая тема */
  &._purple {
    background-color: var(--purple-bg);
    color: var(--purple-text);
  }
`;
