// MainColumn.jsx
import { useState, useContext } from "react";
import CardsItem from "../CardsItem/CardsItem.jsx";
import { Column, ColumnTitle, CardsContainer } from "./MainColumn.style.js";
import { TaskContext } from "../../context/TaskContext.js";

function MainColumn({ onTaskClick }) {
  const { tasks, updateTask } = useContext(TaskContext);

  const statusColumns = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  const [draggedTask, setDraggedTask] = useState(null);
  const [setDragOverColumn] = useState(null);

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

      const updatedTaskData = {
        title: draggedTask.title,
        topic: draggedTask.topic,
        status: newStatus,
        description: draggedTask.description,
        date: draggedTask.date,
      };

      console.log("📤 Отправка данных на сервер:", updatedTaskData);

      // Обновляем задачу через контекст
      await updateTask(draggedTask.id, updatedTaskData);

      console.log("✅ Статус задачи успешно обновлен на сервере");
    } catch (error) {
      console.error("❌ Ошибка обновления статуса задачи:", error);
      alert(`Не удалось переместить задачу: ${error.message}`);
    } finally {
      setDraggedTask(null);
    }
  };

  if (!tasks || tasks.length === 0) {
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

  const DropIndicator = () => {
    return (
      <div
        style={{
          width: "220px",
          height: "130px",
          backgroundColor: "none",
          border: "2px dashed rgba(148, 166, 190, 1)",
          borderRadius: "8px",
          margin: "5px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94A6BE",
          fontSize: "12px",
          transition: "all 0.2s ease",
        }}
      ></div>
    );
  };

  return (
    <>
      {statusColumns.map((status) => {
        const columnTasks = tasks.filter((task) => task.status === status);
        const isDragging = !!draggedTask;

        return (
          <Column
            key={status}
            onDragOver={(e) => handleDragOver(e, status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, status)}
            style={{
              minWidth: "220px",
              backgroundColor: "transparent",
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
                .map((task) => {
                  // Скрываем перетаскиваемую карточку только в её исходной колонке
                  const isBeingDragged =
                    draggedTask?.id === task.id &&
                    draggedTask?.status === status;

                  return (
                    <div
                      key={task.id}
                      data-card
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={() => setDraggedTask(null)}
                      style={{
                        width: isBeingDragged ? "220px" : "",
                        height: isBeingDragged ? "130px" : "",
                        marginTop: isBeingDragged ? "6px" : "",
                        marginBottom: isBeingDragged ? "6px" : "",
                        backgroundColor: isBeingDragged ? "none" : "",
                        border: isBeingDragged
                          ? "2px dashed rgba(148, 166, 190, 1)"
                          : "",
                        borderRadius: isBeingDragged ? "8px" : "",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {/* Внутренний контейнер для карточки */}
                      <div
                        style={{
                          opacity: isBeingDragged ? "0" : "1",
                          transition: "opacity 0.2s ease",
                        }}
                      >
                        <CardsItem
                          card={task}
                          onTaskClick={() => onTaskClick(task.id)}
                        />
                      </div>
                    </div>
                  );
                })}
              {/* Индикатор для вставки в конце ВСЕГДА при перетаскивании */}
              {isDragging && <DropIndicator />}

              {columnTasks.length === 0 && !isDragging && (
                <div
                  data-card
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#94A6BE",
                    fontStyle: "italic",
                    minHeight: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    borderRadius: "8px",
                    margin: "5px",
                    backgroundColor: "transparent",
                  }}
                >
                  Нет задач
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
