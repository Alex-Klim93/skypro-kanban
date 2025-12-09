import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { TaskContext } from "./TaskContext";
import { AuthContext } from "./AuthContext";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, makeRequest, logout, checkAuth } = useContext(AuthContext);

  const KANBAN_API_BASE_URL = "https://wedev-api.sky.pro/api/kanban";

  // Референсы для предотвращения бесконечных циклов
  const isInitialLoadRef = useRef(false);

  // Функция для выполнения запросов задач
  const makeTaskRequest = async (url, options = {}) => {
    try {
      const response = await makeRequest(url, options);
      return response;
    } catch (error) {
      console.error("Task API request failed:", error);

      // Если ошибка авторизации - разлогиниваем пользователя
      if (
        error.message.includes("401") ||
        error.message.includes("400") ||
        error.message.includes("Неверный")
      ) {
        logout();
      }

      throw error;
    }
  };

  // Загрузка задач - согласно документации
  const loadTasks = useCallback(async () => {
    if (!user?.token) {
      setTasks([]);
      return;
    }

    // Проверяем, не загружаем ли мы уже задачи
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Согласно документации: GET /api/kanban возвращает { tasks: [...] }
      const data = await makeTaskRequest(KANBAN_API_BASE_URL, {
        method: "GET",
      });

      // ИСПРАВЛЕНО: Добавлена проверка на существование данных
      if (!data) {
        throw new Error("Неверный ответ от сервера");
      }

      const formattedTasks = (data.tasks || []).map((task) => ({
        id: task._id,
        _id: task._id,
        userId: task.userId,
        title: task.title,
        topic: task.topic,
        date: task.date,
        description: task.description,
        status: task.status,
        themeClass: getThemeClass(task.topic),
        formattedDate: formatDateForDisplay(task.date),
      }));

      setTasks(formattedTasks);
    } catch (err) {
      console.error("❌ TaskProvider: Ошибка загрузки задач:", err);
      setError(err.message);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, [user?.token, isLoading, makeTaskRequest]);

  // Добавление задачи - согласно документации
  const addTask = async (taskData) => {
    try {
      // Согласно документации: POST /api/kanban
      const data = await makeTaskRequest(KANBAN_API_BASE_URL, {
        method: "POST",
        body: {
          title: taskData.title || "Новая задача",
          topic: taskData.topic || "Research",
          status: taskData.status || "Без статуса",
          description: taskData.description || "",
          date: taskData.date || new Date().toISOString(),
        },
      });

      // Вместо полной перезагрузки, добавляем задачу локально
      const newTask = {
        id: data._id || data.id,
        _id: data._id || data.id,
        userId: data.userId,
        title: data.title,
        topic: data.topic,
        date: data.date,
        description: data.description,
        status: data.status,
        themeClass: getThemeClass(data.topic),
        formattedDate: formatDateForDisplay(data.date),
      };

      setTasks((prev) => [...prev, newTask]);
      return data;
    } catch (err) {
      console.error("❌ Ошибка добавления задачи:", err);
      throw err;
    }
  };

  // Обновление задачи - согласно документации
  const updateTask = async (id, taskData) => {
    try {
      // Согласно документации: PUT /api/kanban/:id
      const data = await makeTaskRequest(`${KANBAN_API_BASE_URL}/${id}`, {
        method: "PUT",
        body: {
          title: taskData.title,
          topic: taskData.topic,
          status: taskData.status,
          description: taskData.description,
          date: taskData.date,
        },
      });

      // Обновляем задачу локально
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                ...taskData,
                themeClass: getThemeClass(taskData.topic),
                formattedDate: formatDateForDisplay(taskData.date),
              }
            : task
        )
      );

      return data;
    } catch (err) {
      console.error("❌ Ошибка обновления задачи:", err);
      throw err;
    }
  };

  // Удаление задачи - согласно документации
  const deleteTask = async (id) => {
    try {
      // Согласно документации: DELETE /api/kanban/:id
      const data = await makeTaskRequest(`${KANBAN_API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      // Удаляем задачу локально
      setTasks((prev) => prev.filter((task) => task.id !== id));
      return data;
    } catch (err) {
      console.error("❌ Ошибка удаления задачи:", err);
      throw err;
    }
  };

  // Получение задачи по ID - согласно документации
  const getTaskById = async (id) => {
    try {
      // Согласно документации: GET /api/kanban/:id возвращает { task: {...} }
      const data = await makeTaskRequest(`${KANBAN_API_BASE_URL}/${id}`, {
        method: "GET",
      });
      return data.task;
    } catch (err) {
      console.error("❌ Ошибка получения задачи:", err);
      throw err;
    }
  };

  // Загрузка задач при монтировании, если пользователь авторизован
  useEffect(() => {
    if (user?.token && !isInitialLoadRef.current) {
      isInitialLoadRef.current = true;
      loadTasks();
    }
  }, [user?.token, loadTasks]);

  // Очистка задач при выходе пользователя
  useEffect(() => {
    if (!user?.token && isInitialLoadRef.current) {
      setTasks([]);
      isInitialLoadRef.current = false;
    }
  }, [user?.token]);

  const value = {
    tasks,
    isLoading,
    error,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    refreshTasks: loadTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Вспомогательные функции
function formatDateForDisplay(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

function getThemeClass(topic) {
  const themeMap = {
    "Web Design": "_orange",
    Research: "_green",
    Copywriting: "_purple",
  };
  return themeMap[topic] || "_gray";
}
