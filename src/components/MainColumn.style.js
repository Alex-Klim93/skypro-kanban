import styled from "styled-components";

/**
 * Колонка для отображения задач определенного статуса
 * Занимает 20% ширины с адаптивным поведением
 */
export const Column = styled.div`
  width: 20%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  min-width: 250px;
  
  @media screen and (max-width: 1200px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

/**
 * Заголовок колонки с названием статуса
 * Стили для текста заголовка колонки
 */
export const ColumnTitle = styled.div`
  padding: 0 10px;
  margin: 15px 0;
  
  p {
    color: #94A6BE;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
  }
`;

/**
 * Контейнер для карточек внутри колонки
 * Обеспечивает правильное расположение карточек
 */
export const CardsContainer = styled.div`
  width: 100%;
  display: block;
  position: relative;
  
  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
`;

/**
 * Элемент карточки с анимацией появления
 * Добавляет анимацию при добавлении новых карточек
 */
export const CardsItem = styled.div`
  padding: 5px;
  animation-name: ${props => props.theme.cardAnimation};
  animation-duration: 500ms;
  animation-timing-function: linear;
`;

/**
 * Стили для самой карточки задачи
 * Белый фон с закругленными углами и тенью
 */
export const Card = styled.div`
  width: 220px;
  height: 130px;
  background-color: #FFFFFF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  
  @media screen and (max-width: 1200px) {
    width: 220px;
    height: 130px;
  }
`;

/**
 * Верхняя группа карточки (тема и кнопка действий)
 * Располагает элементы в одну линию с пространством между
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
 * Бейдж темы карточки
 * Цветной фон с текстом категории задачи
 */
export const CardTheme = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
  background-color: ${props => {
    switch(props.themeColor) {
      case 'orange': return '#FFE4C2';
      case 'green': return '#B4FDD1';
      case 'purple': return '#E9D4FF';
      case 'gray': return '#94A6BE';
      default: return '#EAEEF6';
    }
  }};
  color: ${props => {
    switch(props.themeColor) {
      case 'orange': return '#FF6D00';
      case 'green': return '#06B16E';
      case 'purple': return '#9A48F1';
      case 'gray': return '#FFFFFF';
      default: return '#000000';
    }
  }};
  
  p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
  }
`;

/**
 * Кнопка действий карточки (троеточие)
 * Стили для кнопки вызова меню действий
 */
export const CardButton = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
  cursor: pointer;
  
  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #94A6BE;
  }
`;

/**
 * Заголовок карточки с названием задачи
 * Основной текст карточки с ограничением в 2 строки
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
`;

/**
 * Контейнер для содержимого карточки
 * Располагает элементы с пространством между
 */
export const CardContent = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

/**
 * Блок с датой карточки
 * Отображает иконку календаря и дату выполнения
 */
export const CardDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  svg {
    width: 13px;
    fill: #94A6BE;
  }
  
  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: #94A6BE;
    letter-spacing: 0.2px;
  }
`;