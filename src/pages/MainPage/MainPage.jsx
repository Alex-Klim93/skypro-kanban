// MainPage.jsx
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main/Main.jsx";
import PopBrowse from "../../components/PopBrowse/PopBrowse.jsx";
import PopExit from "../../components/PopExit/PopExit.jsx";
import PopNewCard from "../../components/PopNewCard/PopNewCard.jsx";

function MainPage({ onLogout }) {
  const [showExit, setShowExit] = useState(false);
  const [showNewCard, setShowNewCard] = useState(false);
  const [showBrowse, setShowBrowse] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const taskId = searchParams.get("task");
    if (taskId) {
      setSelectedCardId(taskId);
      setShowBrowse(true);
    }
  }, [searchParams]);

  // ✅ Функция для обновления списка задач
  const handleRefreshTasks = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleOpenExit = () => {
    setShowExit(true);
  };

  const handleCloseExit = () => {
    setShowExit(false);
  };

  const handleOpenNewCard = () => {
    setShowNewCard(true);
  };

  const handleCloseNewCard = () => {
    setShowNewCard(false);
  };

  const handleTaskCreated = () => {
    console.log("✅ Задача создана, обновляем список");
    handleRefreshTasks();
  };

  const handleOpenBrowse = (taskId) => {
    setSelectedCardId(taskId);
    setShowBrowse(true);
    navigate(`/?task=${taskId}`, { replace: true });
  };

  const handleCloseBrowse = () => {
    setShowBrowse(false);
    setSelectedCardId(null);
    navigate("/", { replace: true });
  };

  return (
    <>
      <PopExit
        isOpenExit={showExit}
        onClose={handleCloseExit}
        onLogout={onLogout}
      />

      <PopNewCard
        isOpen={showNewCard}
        onClose={handleCloseNewCard}
        onTaskCreated={handleTaskCreated}
      />

      <PopBrowse
        isOpen={showBrowse}
        onClose={handleCloseBrowse}
        cardId={selectedCardId}
        onTaskUpdated={handleRefreshTasks}
      />

      <Header onExitClick={handleOpenExit} onAddTaskClick={handleOpenNewCard} />

      <Main
        onTaskClick={handleOpenBrowse}
        refreshTrigger={refreshTrigger}
        setRefreshTrigger={setRefreshTrigger}
      />
    </>
  );
}

export default MainPage;
