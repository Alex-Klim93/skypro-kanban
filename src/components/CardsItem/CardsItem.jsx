import React from "react";
import {
  CardsItemContainer,
  Card,
  CardGroup,
  CardTheme,
  CardThemeText,
  CardButton,
  CardButtonInner,
  CardButtonDot,
  CardContent,
  CardTitleLink,
  CardTitle,
  CardDate,
  CalendarIcon,
  DateText,
} from "./CardsItem.style";

/**
 * Компонент карточки задачи
 * Отображает отдельную задачу с темой, заголовком и датой
 * Включает кнопку действий для открытия подробной информации
 *
 * @param {Object} props - Свойства компонента
 * @param {Object} props.card - Объект с данными карточки
 * @param {string} props.card.id - Уникальный идентификатор карточки
 * @param {string} props.card.topic - Тема/категория карточки
 * @param {string} props.card.themeClass - CSS класс для стилизации темы
 * @param {string} props.card.title - Заголовок задачи
 * @param {string} props.card.date - Дата выполнения задачи
 * @returns {JSX.Element} Карточка задачи
 */
const CardsItem = ({ card }) => {
  return (
    <CardsItemContainer>
      <Card>
        {/* Верхняя группа: тема и кнопка действий */}
        <CardGroup>
          {/* Бейдж темы/категории задачи */}
          <CardTheme
            className={`card__theme ${card.themeClass}`}
            $themeClass={card.themeClass}
          >
            <CardThemeText className={card.themeClass}>
              {card.topic}
            </CardThemeText>
          </CardTheme>

          {/* Кнопка действий (троеточие) */}
          <CardButton href="#popBrowse" target="_self">
            <CardButtonInner className="card__btn">
              <CardButtonDot></CardButtonDot>
              <CardButtonDot></CardButtonDot>
              <CardButtonDot></CardButtonDot>
            </CardButtonInner>
          </CardButton>
        </CardGroup>

        {/* Основное содержимое карточки */}
        <CardContent>
          {/* Заголовок задачи как ссылка */}
          <CardTitleLink href="" target="_blank">
            <CardTitle>{card.title}</CardTitle>
          </CardTitleLink>

          {/* Блок с датой выполнения */}
          <CardDate>
            <CalendarIcon
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
            >
              <g clipPath="url(#clip0_1_415)">
                <path
                  d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
                  stroke="#94A6BE"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
                  stroke="#94A6BE"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_415">
                  <rect width="13" height="13" fill="white" />
                </clipPath>
              </defs>
            </CalendarIcon>
            <DateText>{card.date}</DateText>
          </CardDate>
        </CardContent>
      </Card>
    </CardsItemContainer>
  );
};

export default CardsItem;
