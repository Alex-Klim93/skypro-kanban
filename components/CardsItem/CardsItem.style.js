import styled from "styled-components";

/**
 * Контейнер для элемента карточки
 * Добавляет отступы и анимацию появления
 */
export const CardsItemContainer = styled.div`
  padding: 5px;
  animation-name: ${(props) => props.theme.cardAnimation || "card-animation"};
  animation-duration: 500ms;
  animation-timing-function: linear;
`;

/**
 * Основная карточка задачи
 * Белый фон с закругленными углами и тенями
 */
export const Card = styled.div`
  width: 220px;
  height: 130px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

/**
 * Верхняя группа карточки (тема и кнопка)
 * Располагает элементы по краям с выравниванием по центру
 */
export const CardGroup = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/**
 * Бейдж темы/категории карточки
 * Динамические цвета в зависимости от типа темы
 */
export const CardTheme = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
  background-color: ${(props) => {
    switch (props.$themeClass) {
      case "_orange":
        return "#FFE4C2";
      case "_green":
        return "#B4FDD1";
      case "_purple":
        return "#E9D4FF";
      case "_gray":
        return "#94A6BE";
      default:
        return "#EAEEF6";
    }
  }};
  color: ${(props) => {
    switch (props.$themeClass) {
      case "_orange":
        return "#FF6D00";
      case "_green":
        return "#06B16E";
      case "_purple":
        return "#9A48F1";
      case "_gray":
        return "#FFFFFF";
      default:
        return "#000000";
    }
  }};
`;

/**
 * Текст внутри бейджа темы
 * Жирный шрифт маленького размера
 */
export const CardThemeText = styled.p`
  font-size: 10px;
  font-weight: 600;
  line-height: 10px;
  margin: 0;
  white-space: nowrap;
`;

/**
 * Контейнер для кнопки действий (троеточие)
 * Стили для кнопки вызова контекстного меню
 */
export const CardButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;

  &:hover div {
    background-color: #565eef;
  }
`;

/**
 * Внутренний контейнер кнопки действий
 * Располагает точки троеточия
 */
export const CardButtonInner = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
`;

/**
 * Точка троеточия кнопки действий
 * Круглые элементы серого цвета
 */
export const CardButtonDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #94a6be;
  transition: background-color 0.2s ease;
`;

/**
 * Основное содержимое карточки
 * Располагает заголовок и дату с пространством между
 */
export const CardContent = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

/**
 * Ссылка-заголовок карточки
 * Убирает стандартное подчеркивание и меняет цвет при наведении
 */
export const CardTitleLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  width: 100%;

  &:hover h3 {
    color: #565eef;
  }
`;

/**
 * Заголовок карточки с названием задачи
 * Основной текст с ограничением в 2 строки
 */
export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #000000;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0 0 10px 0;
  transition: color 0.2s ease;
`;

/**
 * Блок с датой выполнения задачи
 * Располагает иконку календаря и текст даты
 */
export const CardDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

/**
 * SVG иконка календаря
 * Стили для векторного изображения
 */
export const CalendarIcon = styled.svg`
  width: 13px;
  height: 13px;

  path {
    stroke: #94a6be;
    transition: stroke 0.2s ease;
  }

  ${Card}:hover & path {
    stroke: #565eef;
  }
`;

/**
 * Текст с датой выполнения
 * Серый цвет для второстепенной информации
 */
export const DateText = styled.p`
  margin-left: 6px;
  font-size: 10px;
  line-height: 13px;
  color: #94a6be;
  letter-spacing: 0.2px;
  margin: 0 0 0 6px;
  transition: color 0.2s ease;

  ${Card}:hover & {
    color: #565eef;
  }
`;
