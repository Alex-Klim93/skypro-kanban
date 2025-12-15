import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { TaskContext } from "./TaskContext";
import { AuthContext } from "./AuthContext";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, logout } = useContext(AuthContext);

  const KANBAN_API_BASE_URL = "https://wedev-api.sky.pro/api/kanban";

  // Референсы для предотвращения бесконечных циклов
  const isInitialLoadRef = useRef(false);
  
  // Кэш для отслеживания обновлений (чтобы не спамить сервер)
  const updateCacheRef = useRef(new Map());
  const updateTimeoutRef = useRef(null);

  // ✅ ИСПРАВЛЕНО: Создаем собственную функцию для запросов
  const makeTaskRequest = async (url, options = {}) => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      throw new Error("Пользователь не авторизован");
    }

    const config = {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    };

    if (options.body && typeof options.body !== "string") {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          throw new Error("Сессия истекла. Пожалуйста, войдите снова.");
        }

        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Ошибка ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Task API request failed:", error);
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
  }, [user?.token, isLoading, logout]);

  // ✅ ИСПРАВЛЕНО: Добавление задачи - согласно документации
  const addTask = async (taskData) => {
    try {
      // Согласно документации: POST /api/kanban возвращает { tasks: [...] }
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

      // ✅ ИСПРАВЛЕНО: Сервер возвращает обновлённый список задач, а не только созданную
      if (!data.tasks) {
        throw new Error("Неверный ответ от сервера");
      }

      const formattedTasks = data.tasks.map((task) => ({
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

      // ✅ Обновляем весь список задач с тем, что вернул сервер
      setTasks(formattedTasks);
      return data;
    } catch (err) {
      console.error("❌ Ошибка добавления задачи:", err);
      throw err;
    }
  };

  // Обновление задачи - согласно документации (с дебаунсом)
  const updateTask = async (id, taskData) => {
    // Сохраняем в кэш
    updateCacheRef.current.set(id, { ...taskData, timestamp: Date.now() });
    
    // Очищаем предыдущий таймаут
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    // Устанавливаем новый таймаут для отправки на сервер
    updateTimeoutRef.current = setTimeout(async () => {
      const updates = Array.from(updateCacheRef.current.entries());
      updateCacheRef.current.clear();
      
      // Отправляем все накопленные обновления
      for (const [taskId, data] of updates) {
        try {
          // Согласно документации: PUT /api/kanban/:id возвращает { tasks: [...] }
          const response = await makeTaskRequest(`${KANBAN_API_BASE_URL}/${taskId}`, {
            method: "PUT",
            body: {
              title: data.title,
              topic: data.topic,
              status: data.status,
              description: data.description,
              date: data.date,
            },
          });

          // ✅ ИСПРАВЛЕНО: Сервер возвращает обновлённый список задач
          if (!response.tasks) {
            throw new Error("Неверный ответ от сервера");
          }

          const formattedTasks = response.tasks.map((task) => ({
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

          // ✅ Обновляем весь список задач с тем, что вернул сервер
          setTasks(formattedTasks);
        } catch (err) {
          console.error(`❌ Ошибка обновления задачи ${taskId}:`, err);
          // Не бросаем ошибку дальше, чтобы не прерывать UI
        }
      }
    }, 300); // Задержка 300ms для группировки обновлений
  };

  // Удаление задачи - согласно документации
  const deleteTask = async (id) => {
    try {
      // Согласно документации: DELETE /api/kanban/:id возвращает { tasks: [...] }
      const data = await makeTaskRequest(`${KANBAN_API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      // ✅ ИСПРАВЛЕНО: Сервер возвращает обновлённый список задач
      if (!data.tasks) {
        throw new Error("Неверный ответ от сервера");
      }

      const formattedTasks = data.tasks.map((task) => ({
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

      // ✅ Обновляем весь список задач с тем, что вернул сервер
      setTasks(formattedTasks);
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

  // Очистка таймаута при размонтировании
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

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