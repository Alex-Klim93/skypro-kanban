// Main.jsx
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
import { loadTasksFromServer } from "../../data.js";
import { authCheck } from "../../api/authCheck.js";

function Main({ onTaskClick, refreshTrigger, setRefreshTrigger }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!authCheck.isUserAuthenticated()) {
        console.log("⚠️ Пользователь не авторизован");
        setIsLoading(false);
        return;
      }

      console.log("🔄 Загрузка задач...");
      const loadedTasks = await loadTasksFromServer();
      setTasks(loadedTasks);
      console.log("✅ Задачи загружены:", loadedTasks.length);
    } catch (error) {
      console.error("❌ Ошибка загрузки задач:", error);
      setError("Не удалось загрузить задачи");
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [refreshTrigger]);

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
                <MainColumn
                  tasks={tasks}
                  onTaskClick={onTaskClick}
                  refreshTrigger={refreshTrigger}
                  setRefreshTrigger={setRefreshTrigger}
                />
              </MainContent>
            )}
          </MainBlock>
        </Container>
      </MainContainer>
    </>
  );
}

export default Main;
