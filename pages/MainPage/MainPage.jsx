import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main/Main.jsx";
import PopBrowse from "../../components/PopBrowse/PopBrowse.jsx";
import PopExit from "../../components/PopExit/PopExit.jsx";
import PopNewCard from "../../components/PopNewCard/PopNewCard.jsx";

function MainPage() {
  const [showExit, setShowExit] = useState(false);
  const [showNewCard, setShowNewCard] = useState(false);
  const [showBrowse, setShowBrowse] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // При монтировании проверяем есть ли task в URL
  useEffect(() => {
    const taskId = searchParams.get("task");
    if (taskId) {
      setSelectedCardId(taskId);
      setShowBrowse(true);
    }
  }, [searchParams]);

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

  const handleOpenBrowse = (taskId) => {
    setSelectedCardId(taskId);
    setShowBrowse(true);
    // Добавляем ID задачи в URL
    navigate(`/?id=${taskId}`, { replace: true });
  };

  const handleCloseBrowse = () => {
    setShowBrowse(false);
    setSelectedCardId(null);
    // Убираем параметр задачи из URL при закрытии
    navigate("/", { replace: true });
  };

  return (
    <>
      <PopExit isOpenExit={showExit} onClose={handleCloseExit} />
      <PopNewCard isOpen={showNewCard} onClose={handleCloseNewCard} />
      <PopBrowse
        isOpen={showBrowse}
        onClose={handleCloseBrowse}
        cardId={selectedCardId}
      />
      <Header onExitClick={handleOpenExit} onAddTaskClick={handleOpenNewCard} />
      <Main onTaskClick={handleOpenBrowse} />
    </>
  );
}

export default MainPage;
