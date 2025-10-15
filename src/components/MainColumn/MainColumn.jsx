// MainColumn.jsx
import { useState, useEffect } from "react";
import CardsItem from "../CardsItem/CardsItem.jsx";
import { Column, ColumnTitle, CardsContainer } from "./MainColumn.style.js";
import { api } from "../../api/api.js";

function MainColumn({
  tasks = [],
  onTaskClick,
  refreshTrigger,
  setRefreshTrigger,
}) {
  const statusColumns = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [localTasks, setLocalTasks] = useState(tasks);

  // Синхронизируем локальные задачи с props
  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
    console.log(
      "🎯 Начало перетаскивания:",
      task.title,
      "статус:",
      task.status
    );
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
    setDragOverColumn(status);
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    setDragOverColumn(null);

    if (!draggedTask) return;

    if (draggedTask.status === newStatus) {
      setDraggedTask(null);
      return;
    }

    try {
      console.log(
        `🔄 Перенос задачи "${draggedTask.title}" из "${draggedTask.status}" в "${newStatus}"`
      );

      // ✅ Оптимистичное обновление UI
      const updatedTasks = localTasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status: newStatus } : task
      );
      setLocalTasks(updatedTasks);

      const updatedTaskData = {
        title: draggedTask.title,
        topic: draggedTask.topic,
        status: newStatus,
        description: draggedTask.description,
        date: draggedTask.date,
      };

      console.log("📤 Отправка данных на сервер:", updatedTaskData);

      // Обновляем задачу на сервере
      await api.updateTask(draggedTask.id, updatedTaskData);

      console.log("✅ Статус задачи успешно обновлен на сервере");

      // Полное обновление данных
      if (setRefreshTrigger) {
        setRefreshTrigger((prev) => prev + 1);
      }
    } catch (error) {
      console.error("❌ Ошибка обновления статуса задачи:", error);
      // ✅ Откатываем оптимистичное обновление при ошибке
      setLocalTasks(tasks);
      alert(`Не удалось переместить задачу: ${error.message}`);
    } finally {
      setDraggedTask(null);
    }
  };

  // Используем локальные задачи для отображения
  const displayTasks = localTasks;

  if (!displayTasks || displayTasks.length === 0) {
    return (
      <Column>
        <ColumnTitle>
          <p>Нет задач</p>
        </ColumnTitle>
        <CardsContainer>
          <p style={{ padding: "20px", textAlign: "center", color: "#94A6BE" }}>
            Задачи не найдены
          </p>
        </CardsContainer>
      </Column>
    );
  }

  return (
    <>
      {statusColumns.map((status) => {
        const columnTasks = displayTasks.filter(
          (task) => task.status === status
        );
        const isDragOver = dragOverColumn === status;

        return (
          <Column
            key={status}
            onDragOver={(e) => handleDragOver(e, status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, status)}
            style={{
              backgroundColor: isDragOver ? "#f0f8ff" : "transparent",
              border: isDragOver ? "2px dashed #565eef" : "none",
              transition: "all 0.2s ease",
              minHeight: "200px",
              borderRadius: isDragOver ? "10px" : "0",
            }}
          >
            <ColumnTitle>
              <p>
                {status}
                {columnTasks.length > 0 && ` (${columnTasks.length})`}
              </p>
            </ColumnTitle>

            <CardsContainer>
              {columnTasks
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onDragEnd={() => setDraggedTask(null)}
                    style={{
                      opacity: draggedTask?.id === task.id ? 0.5 : 1,
                      cursor: "grab",
                      transition: "all 0.2s ease",
                      transform:
                        draggedTask?.id === task.id
                          ? "scale(0.95)"
                          : "scale(1)",
                    }}
                  >
                    <CardsItem
                      card={task}
                      onTaskClick={() => onTaskClick(task.id)}
                    />
                  </div>
                ))}

              {columnTasks.length === 0 && (
                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#94A6BE",
                    fontStyle: "italic",
                    minHeight: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: isDragOver ? "2px dashed #94A6BE" : "none",
                    borderRadius: "8px",
                    margin: "5px",
                  }}
                >
                  {isDragOver ? "Отпустите чтобы переместить" : "Нет задач"}
                </div>
              )}
            </CardsContainer>
          </Column>
        );
      })}
    </>
  );
}

export default MainColumn;
