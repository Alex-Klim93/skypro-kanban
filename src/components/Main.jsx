import { useState, useEffect } from "react";
import MainColumn from "./MainColumn.jsx";
import { GlobalStyle } from "../Global.style.js";
import {
  MainContainer,
  Container,
  MainBlock,
  MainContent,
  LoadingText
} from "./Main.style";

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
      <MainContainer className="main">
        <Container className="container">
          <MainBlock className="main__block">
            {isLoading ? (
              // Отображение индикатора загрузки
              <MainContent className="main__content">
                <div className="main__column column">
                  <div className="column__title">
                    <LoadingText>Данные загружаются...</LoadingText>
                  </div>
                </div>
              </MainContent>
            ) : (
              // Отображение основного контента после загрузки
              <MainContent className="main__content">
                <MainColumn />
              </MainContent>
            )}
          </MainBlock>
        </Container>
      </MainContainer>
    </>
  );
}

export default Main;