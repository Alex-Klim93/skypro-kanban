// MainPage.jsx
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main/Main.jsx";
import PopBrowse from "../../components/PopBrowse/PopBrowse.jsx";
import PopBrowseEdit from "../../components/PopBrowseEdit/PopBrowseEdit.jsx"; // Добавляем импорт
import PopExit from "../../components/PopExit/PopExit.jsx";
import PopNewCard from "../../components/PopNewCard/PopNewCard.jsx";

function MainPage({ onLogout }) {
  const [showExit, setShowExit] = useState(false);
  const [showNewCard, setShowNewCard] = useState(false);
  const [showBrowse, setShowBrowse] = useState(false);
  const [showBrowseEdit, setShowBrowseEdit] = useState(false); // Новое состояние для редактирования
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null); // Новое состояние для хранения данных карточки
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
    setSelectedCard(null);
    navigate("/", { replace: true });
  };

  // ✅ Функция для перехода в режим редактирования
  const handleEditTask = (card) => {
    console.log("🔄 Переход в режим редактирования:", card);
    setSelectedCard(card); // Сохраняем данные карточки
    setShowBrowse(false); // Закрываем просмотр
    setShowBrowseEdit(true); // Открываем редактирование
  };

  // ✅ Функция для закрытия редактирования
  const handleCloseBrowseEdit = () => {
    setShowBrowseEdit(false);
    setSelectedCard(null);
  };

  // ✅ Функция для обработки успешного обновления задачи
  const handleTaskUpdated = () => {
    console.log("✅ Задача обновлена, обновляем список");
    handleRefreshTasks();
    handleCloseBrowseEdit(); // Закрываем редактирование после сохранения
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

      {/* Попап просмотра задачи */}
      <PopBrowse
        isOpen={showBrowse}
        onClose={handleCloseBrowse}
        cardId={selectedCardId}
        setRefreshTrigger={setRefreshTrigger}
        onEdit={handleEditTask} // Передаем функцию для редактирования
      />

      {/* Попап редактирования задачи */}
      <PopBrowseEdit
        isOpen={showBrowseEdit}
        onClose={handleCloseBrowseEdit}
        card={selectedCard}
        setRefreshTrigger={setRefreshTrigger}
        onTaskUpdated={handleTaskUpdated}
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
