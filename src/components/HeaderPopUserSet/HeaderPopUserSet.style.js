import styled from "styled-components";

/**
 * Основной контейнер всплывающего окна настроек пользователя
 * Содержит позиционирование, размеры, тень и другие базовые стили
 */
export const PopUserSetContainer = styled.div`
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  background: #FFF;
  box-shadow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
  padding: 34px;
  text-align: center;
  z-index: 2;
  /* Управление видимостью через пропс */
  display: ${props => props.$isOpen ? "block" : "none"};
`;

/**
 * Стиль для отображения имени пользователя
 * Использует темный цвет и полужирное начертание для выделения
 */
export const PopUserName = styled.p`
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
`;

/**
 * Стиль для отображения email пользователя
 * Использует серый цвет для менее важной информации
 */
export const PopUserMail = styled.p`
  color: #94A6BE;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
`;

/**
 * Контейнер для настройки темы
 * Располагает текст и переключатель в одну линию
 */
export const PopUserTheme = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  
  /* Стиль для текста описания темы */
  p {
    color: #000;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
  }
`;

/**
 * Кастомный чекбокс для переключения темы
 * Создает toggle-переключатель вместо стандартного checkbox
 */
export const ThemeCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: relative;
  width: 24px;
  height: 13px;
  border-radius: 100px;
  background: #EAEEF6;
  outline: none;
  /* Убираем стандартный вид checkbox */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  /* Создаем круглый бегунок для переключателя */
  &::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: #94A6BE;
    transition: 0.5s;
  }
  
  /* Анимация перемещения бегунка при активации */
  &:checked::before {
    left: 12px;
  }
`;

/**
 * Кнопка выхода из системы
 * Имеет контурный стиль и hover-эффект
 */
export const PopUserButton = styled.button`
  width: 72px;
  height: 30px;
  background: transparent;
  color: #565EEF;
  border-radius: 4px;
  border: 1px solid #565EEF;
  cursor: pointer;
  outline: none;
  font-size: 14px;
  
  /* Эффект при наведении - изменение фона и цвета текста */
  &:hover {
    background-color: #33399b;
    color: #FFFFFF;
  }
  
  /* Обеспечиваем изменение цвета текста при hover */
  &:hover a {
    color: #FFFFFF;
  }
`;