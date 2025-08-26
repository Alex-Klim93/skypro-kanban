import styled, { keyframes } from "styled-components";

/**
 * Анимация появления карточек
 * Плавное увеличение высоты и появление opacity
 */
const cardAnimation = keyframes`
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: auto;
    opacity: 1;
  }
`;

/**
 * Основной контейнер главного контента
 * Занимает всю ширину с серым фоном
 */
export const MainContainer = styled.main`
  width: 100%;
  background-color: #eaeef6;
  min-height: calc(100vh - 70px); /* Высота минус header */
`;

/**
 * Блок-обертка для основного контента
 * Центрирует контент и добавляет отступы
 */
export const MainBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;

  @media screen and (max-width: 1200px) {
    padding: 40px 0 64px;
  }
`;

/**
 * Контейнер с ограничением максимальной ширины
 * Обеспечивает адаптивные отступы по бокам
 */
export const Container = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;

  @media screen and (max-width: 495px) {
    padding: 0 16px;
  }
`;

/**
 * Контейнер для колонок контента
 * Располагает колонки в ряд с равным распределением
 */
export const MainContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1200px) {
    flex-direction: row;
    overflow-x: auto;
  }
`;

/**
 * Сообщение о загрузке данных
 * Стили для текста индикатора загрузки
 */
export const LoadingText = styled.p`
  color: #94a6be;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
`;
