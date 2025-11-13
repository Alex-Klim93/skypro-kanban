// data.js
import { useTasks } from "./context/TaskContext";

// ✅ ИСПРАВЛЕНО: теперь это хук для работы с задачами через контекст
export function useTaskData() {
  const {
    tasks,
    isLoading,
    error,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
    refreshTasks,
  } = useTasks();

  return {
    cardList: tasks,
    isLoading,
    error,
    loadTasksFromServer: loadTasks,
    addTaskToServer: addTask,
    updateTaskOnServer: updateTask,
    deleteTaskFromServer: deleteTask,
    refreshTasks,
  };
}

// ✅ Сохраняем глобальную переменную для обратной совместимости
export let cardList = [];
