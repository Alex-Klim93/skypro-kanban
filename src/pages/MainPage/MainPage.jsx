import { useNavigate, Outlet, useParams, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main/Main.jsx";
import PopBrowse from "../../components/PopBrowse/PopBrowse.jsx";
import PopBrowseEdit from "../../components/PopBrowseEdit/PopBrowseEdit.jsx";
import PopExit from "../../components/PopExit/PopExit.jsx";
import PopNewCard from "../../components/PopNewCard/PopNewCard.jsx";
import HeaderPopUserSet from "../../components/HeaderPopUserSet/HeaderPopUserSet.jsx";

function MainPage({ onLogout }) {
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

  const handleOpenUserSettings = () => {
    navigate("/user-settings");
  };

  const handleCloseUserSettings = () => {
    navigate("/");
  };

  const handleTaskCreated = () => {
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
    if (params.id) {
      navigate(`/task/${params.id}`);
    } else {
      navigate("/");
    }
  };

  const handleTaskUpdated = () => {
    if (params.id) {
      navigate(`/task/${params.id}`);
    }
  };

  return (
    <>
      {/* Модальные окна */}
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
          cardId={params.id}
          onEdit={handleEditTask}
        />
      )}

      {showBrowseEdit && params.id && (
        <PopBrowseEdit
          isOpen={true}
          onClose={handleCloseBrowseEdit}
          cardId={params.id}
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
      <Header
        onExitClick={handleOpenExit}
        onAddTaskClick={handleOpenNewCard}
        onUserSettingsClick={handleOpenUserSettings}
      />
      <Main onTaskClick={handleOpenBrowse} />

      <Outlet />
    </>
  );
}

export default MainPage;
