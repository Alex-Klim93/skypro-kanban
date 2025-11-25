import { useState, useEffect } from "react";
import { useNavigate, Outlet, useParams, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main/Main.jsx";
import PopBrowse from "../../components/PopBrowse/PopBrowse.jsx";
import PopBrowseEdit from "../../components/PopBrowseEdit/PopBrowseEdit.jsx";
import PopExit from "../../components/PopExit/PopExit.jsx";
import PopNewCard from "../../components/PopNewCard/PopNewCard.jsx";
import HeaderPopUserSet from "../../components/HeaderPopUserSet/HeaderPopUserSet.jsx";

function MainPage({ onLogout }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // Определяем, какое модальное окно открыто
  const showExit = location.pathname === "/exit";
  const showNewCard = location.pathname === "/new-task";
  const showBrowse =
    location.pathname.startsWith("/task/") &&
    !location.pathname.includes("/edit");
  const showBrowseEdit = location.pathname.includes("/edit");
  const showUserSettings = location.pathname === "/user-settings";

  // ✅ Функция для обновления списка задач (только один запрос)
  const handleRefreshTasks = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleOpenExit = () => {
    navigate("/exit");
  };

  const handleCloseExit = () => {
    navigate("/");
  };

  const handleOpenNewCard = () => {
    navigate("/new-task");
  };

  const handleCloseNewCard = () => {
    navigate("/");
  };

  const handleCloseUserSettings = () => {
    navigate("/");
  };

  const handleTaskCreated = () => {
    console.log("✅ Задача создана, обновляем список");
    handleRefreshTasks();
    handleCloseNewCard();
  };

  const handleOpenBrowse = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const handleCloseBrowse = () => {
    navigate("/");
  };

  const handleEditTask = (card) => {
    navigate(`/task/${card._id}/edit`);
  };

  const handleCloseBrowseEdit = () => {
    // Возвращаемся к просмотру задачи или закрываем полностью
    if (params.id) {
      navigate(`/task/${params.id}`);
    } else {
      navigate("/");
    }
  };

  const handleTaskUpdated = () => {
    console.log("✅ Задача обновлена, обновляем список");
    handleRefreshTasks();
    // Возвращаемся к просмотру задачи после редактирования
    if (params.id) {
      navigate(`/task/${params.id}`);
    }
  };

  return (
    <>
      {/* Модальные окна, которые рендерятся через роутинг */}
      {showExit && (
        <PopExit
          isOpenExit={true}
          onClose={handleCloseExit}
          onLogout={onLogout}
        />
      )}

      {showNewCard && (
        <PopNewCard
          isOpen={true}
          onClose={handleCloseNewCard}
          onTaskCreated={handleTaskCreated}
        />
      )}

      {showBrowse && params.id && (
        <PopBrowse
          isOpen={true}
          onClose={handleCloseBrowse}
          setRefreshTrigger={setRefreshTrigger}
        />
      )}

      {showBrowseEdit && params.id && (
        <PopBrowseEdit
          isOpen={true}
          onClose={handleCloseBrowseEdit}
          setRefreshTrigger={setRefreshTrigger}
          onTaskUpdated={handleTaskUpdated}
        />
      )}

      {showUserSettings && (
        <HeaderPopUserSet
          isOpen={true}
          onClose={handleCloseUserSettings}
          onExitClick={handleOpenExit}
        />
      )}

      {/* Основной контент */}
      <Header onExitClick={handleOpenExit} onAddTaskClick={handleOpenNewCard} />
      <Main
        onTaskClick={handleOpenBrowse}
        refreshTrigger={refreshTrigger}
        setRefreshTrigger={setRefreshTrigger}
      />

      {/* Outlet для вложенных маршрутов */}
      <Outlet />
    </>
  );
}

export default MainPage;
