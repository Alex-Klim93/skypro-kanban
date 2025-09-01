import { useState, useEffect } from "react";
import MainColumn from "../MainColumn/MainColumn.jsx";
import { GlobalStyle } from "../../Global.style.js";
import {
  MainContainer,
  Container,
  MainBlock,
  MainContent,
  LoadingText,
} from "./Main.style";
import { Column, ColumnTitle } from "../MainColumn/MainColumn.style.js";

/**
 * Главный компонент приложения
 * Отображает основной контент с колонками задач
 * Включает состояние загрузки для имитации получения данных
 *
 * @returns {JSX.Element} Основной layout приложения
 */
function Main() {
  // Состояние для управления индикатором загрузки
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Эффект для имитации загрузки данных
   * Устанавливает таймер на 1.5 секунды для скрытия индикатора
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Container>
          <MainBlock>
            {isLoading ? (
              // Отображение индикатора загрузки
              <MainContent>
                <Column>
                  <ColumnTitle>
                    <LoadingText>Данные загружаются...</LoadingText>
                  </ColumnTitle>
                </Column>
              </MainContent>
            ) : (
              // Отображение основного контента после загрузки
              <MainContent>
                <MainColumn/>
              </MainContent>
            )}
          </MainBlock>
        </Container>
      </MainContainer>
    </>
  );
}

export default Main;
