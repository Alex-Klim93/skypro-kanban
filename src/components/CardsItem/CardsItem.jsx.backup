// CardsItem.jsx
import React, { useState, useRef } from "react";
import { GlobalStyle } from "../../Global.style.js";
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

const CardsItem = ({ card, onTaskClick, isBeingDragged = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  // Состояние для отслеживания наведения курсора и удерживания ЛКМ
  const [isHoveredWithLMB, setIsHoveredWithLMB] = useState(false);

  // Референс для таймера (для оптимизации производительности)
  const mouseDownTimerRef = useRef(null);

  // Обработчик клика по карточке
  const handleCardClick = (e) => {
    e.preventDefault();
    if (onTaskClick && !isDragging) {
      onTaskClick(card.id);
    }
  };

  // Обработчик клика по кнопке
  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onTaskClick) {
      onTaskClick(card.id);
    }
  };

  // Обработчик начала перетаскивания
  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", card.id);
    e.dataTransfer.effectAllowed = "move";
  };

  // Обработчик окончания перетаскивания
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Обработчик наведения курсора на элемент
  const handleMouseEnter = (e) => {
    // Проверяем, нажата ли левая кнопка мыши (buttons === 1)
    if (e.buttons === 1) {
      setIsHoveredWithLMB(true);
      // Здесь можно добавить дополнительную логику при наведении с зажатой ЛКМ
      console.log("Курсор наведен и удерживается ЛКМ");
    }
  };

  // Обработчик ухода курсора с элемента
  const handleMouseLeave = () => {
    setIsHoveredWithLMB(false);
    console.log("Курсор наведен и удерживается ЛКМ");
  };

  // Обработчик нажатия кнопки мыши
  const handleMouseDown = (e) => {
    // Проверяем, что нажата именно левая кнопка мыши (button === 0)
    if (e.button === 0) {
      // Устанавливаем состояние, что ЛКМ нажата на этом элементе
      setIsHoveredWithLMB(true);
      console.log("ЛКМ нажата на карточке");
    }
  };

  // Обработчик отпускания кнопки мыши
  const handleMouseUp = () => {
    setIsHoveredWithLMB(false);
  };

  return (
    <>
    <GlobalStyle />
    <CardsItemContainer
      onClick={handleCardClick}
      // Добавляем обработчики мыши
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        // Убираем display: "none" - скрытие управляется из MainColumn
        opacity: isBeingDragged ? 0 : 1,
        visibility: isBeingDragged ? "hidden" : "visible",
        transition: "opacity 0.2s ease",
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Card>
        <CardGroup>
          <CardTheme
            className={`card__theme ${card.themeClass}`}
            $themeClass={card.themeClass}
          >
            <CardThemeText className={card.themeClass}>
              {card.topic}
            </CardThemeText>
          </CardTheme>

          <CardButton
            href="#popBrowse"
            target="_self"
            onClick={handleButtonClick}
          >
            <CardButtonInner className="card__btn">
              <CardButtonDot></CardButtonDot>
              <CardButtonDot></CardButtonDot>
              <CardButtonDot></CardButtonDot>
            </CardButtonInner>
          </CardButton>
        </CardGroup>

        <CardContent>
          <CardTitleLink
            href=""
            target="_blank"
            onClick={(e) => e.preventDefault()}
          >
            <CardTitle>{card.title}</CardTitle>
          </CardTitleLink>

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
            {/* Используем formattedDate для отображения */}
            <DateText>{card.formattedDate || card.date}</DateText>
          </CardDate>
        </CardContent>
      </Card>
    </CardsItemContainer>
    </>
  );
};

export default CardsItem;
