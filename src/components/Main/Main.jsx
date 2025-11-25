// Main.jsx
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
import { useTaskData } from "../../data.js";
import { AuthContext } from "../../context/AuthContext";

function Main({ onTaskClick }) {

  // ✅ ИСПРАВЛЕНО: используем TaskContext через хук useTaskData
  const { cardList: tasks, isLoading, error } = useTaskData();

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Container>
          <MainBlock>
            {isLoading ? (
              <MainContent>
                <Column>
                  <ColumnTitle>
                    <LoadingText>Данные загружаются...</LoadingText>
                  </ColumnTitle>
                </Column>
              </MainContent>
            ) : error ? (
              <MainContent>
                <Column>
                  <ColumnTitle>
                    <LoadingText style={{ color: "red" }}>{error}</LoadingText>
                  </ColumnTitle>
                </Column>
              </MainContent>
            ) : (
              <MainContent>
                <MainColumn tasks={tasks} onTaskClick={onTaskClick} />
              </MainContent>
            )}
          </MainBlock>
        </Container>
      </MainContainer>
    </>
  );
}

export default Main;
