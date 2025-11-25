import React, { useEffect, useState } from "react";
import {
  PopBrowseContainer,
  PopBrowseInner,
  PopBrowseBlock,
  PopBrowseContent,
  PopBrowseTopBlock,
  PopBrowseTitle,
  PopBrowseWrap,
  PopBrowseForm,
  FormBrowseBlock,
  FormBrowseArea,
  StatusBlock,
  StatusParagraph,
  StatusThemes,
  StatusTheme,
  EditButtons,
  HideElement,
  OrangeTheme,
  GrayTheme,
  CalendarContainer,
  CalendarTitle,
  CalendarBlock,
  CalendarNav,
  CalendarMonth,
  NavActions,
  NavAction,
  CalendarContent,
  CalendarDaysNames,
  CalendarDayName,
  CalendarCells,
  CalendarCell,
  DatePickValue,
  CalendarPeriod,
  CalendarPeriodText,
} from "./PopBrowseEdit.style";

import { useTasks } from "../../context/TaskContext";

function PopBrowseEdit({ isOpen, onClose, cardId, onTaskUpdated }) {
  const [currentCard, setCurrentCard] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { tasks, updateTask, deleteTask } = useTasks();

  // Состояния для редактирования
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [topic, setTopic] = useState("");

  // Состояния для календаря
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  // Находим карточку по ID
  useEffect(() => {
    if (isOpen && cardId && tasks.length > 0) {
      const card = tasks.find(
        (item) => item.id === cardId || item._id === cardId
      );

      if (card) {
        setCurrentCard(card);
        setTitle(card.title || "");
        setDescription(card.description || "");
        setStatus(card.status || "Без статуса");
        setTopic(card.topic || "");

        // Инициализация календаря
        if (card.date) {
          const cardDate = new Date(card.date);
          setSelectedDate(cardDate);
          setCurrentMonth(cardDate);
        } else {
          const today = new Date();
          setSelectedDate(today);
          setCurrentMonth(today);
        }
      }
    }
  }, [isOpen, cardId, tasks]);

  // Генерация дней календаря
  useEffect(() => {
    generateCalendarDays();
  }, [currentMonth, selectedDate]);

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDay.getDay();
    const startDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const days = [];
    const today = new Date();

    // Пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < startDay; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }

    // Дни текущего месяца
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push({
        day,
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isSelected: date.toDateString() === selectedDate.toDateString(),
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
      });
    }

    setCalendarDays(days);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSave = async () => {
    if (!currentCard) return;

    setIsSaving(true);
    try {
      console.log("💾 Сохранение изменений задачи:", currentCard.id);

      const updatedTaskData = {
        title: title,
        topic: topic,
        status: status,
        description: description,
        date: selectedDate.toISOString(),
      };

      await updateTask(currentCard.id, updatedTaskData);
      console.log("✅ Задача успешно обновлена");

      if (onTaskUpdated) {
        onTaskUpdated();
      }

      handleClose();
    } catch (error) {
      console.error("❌ Ошибка сохранения задачи:", error);
      alert(`Не удалось сохранить изменения: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentCard) return;

    if (!window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      return;
    }

    setIsDeleting(true);
    try {
      console.log("🗑️ Удаление задачи:", currentCard.id);
      await deleteTask(currentCard.id);
      console.log("✅ Задача успешно удалена");
      handleClose();
    } catch (error) {
      console.error("❌ Ошибка удаления задачи:", error);
      alert(`Не удалось удалить задачу: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatMonth = (date) => {
    return date.toLocaleDateString("ru-RU", {
      month: "long",
      year: "numeric",
    });
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  if (!isOpen || !currentCard) return null;

  return (
    <PopBrowseContainer isOpen={isOpen} id="popBrowseEdit">
      <PopBrowseInner>
        <PopBrowseBlock>
          <PopBrowseContent>
            {/* Верхний блок с заголовком и категорией */}
            <PopBrowseTopBlock>
              <PopBrowseTitle>
                <input
                  className={"PopBrowseTitle"}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </PopBrowseTitle>
              <OrangeTheme
                className={`card__theme ${currentCard.themeClass}`}
                $themeClass={currentCard.themeClass}
              >
                <p>{currentCard.topic}</p>
              </OrangeTheme>
            </PopBrowseTopBlock>

            {/* Блок статуса для редактирования */}
            <StatusBlock className="pop-browse__status status">
              <StatusParagraph className="subttl">Статус</StatusParagraph>
              <StatusThemes>
                {[
                  "Без статуса",
                  "Нужно сделать",
                  "В работе",
                  "Тестирование",
                  "Готово",
                ].map((statusItem) => {
                  const isActive = status === statusItem;

                  return isActive ? (
                    <GrayTheme
                      key={statusItem}
                      className="active"
                      onClick={() => handleStatusChange(statusItem)}
                      style={{ cursor: "pointer" }}
                    >
                      <p>{statusItem}</p>
                    </GrayTheme>
                  ) : (
                    <HideElement
                      key={statusItem}
                      onClick={() => handleStatusChange(statusItem)}
                      style={{ cursor: "pointer" }}
                    >
                      <p>{statusItem}</p>
                    </HideElement>
                  );
                })}
              </StatusThemes>
            </StatusBlock>

            <PopBrowseWrap>
              {/* Форма с описанием задачи */}
              <PopBrowseForm id="formEditCard" action="#">
                <FormBrowseBlock>
                  <label htmlFor="textArea01" className="subttl">
                    Описание задачи
                  </label>
                  <FormBrowseArea
                    name="text"
                    id="textArea01"
                    placeholder="Введите описание задачи..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                </FormBrowseBlock>
              </PopBrowseForm>

              {/* Календарь */}
              <CalendarContainer>
                <CalendarTitle>Даты</CalendarTitle>
                <CalendarBlock>
                  <CalendarNav>
                    <CalendarMonth>{formatMonth(currentMonth)}</CalendarMonth>
                    <NavActions>
                      <NavAction onClick={handlePrevMonth} data-action="prev">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="11"
                          viewBox="0 0 6 11"
                        >
                          <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
                        </svg>
                      </NavAction>
                      <NavAction onClick={handleNextMonth} data-action="next">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="11"
                          viewBox="0 0 6 11"
                        >
                          <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
                        </svg>
                      </NavAction>
                    </NavActions>
                  </CalendarNav>

                  <CalendarContent>
                    <CalendarDaysNames>
                      <CalendarDayName>пн</CalendarDayName>
                      <CalendarDayName>вт</CalendarDayName>
                      <CalendarDayName>ср</CalendarDayName>
                      <CalendarDayName>чт</CalendarDayName>
                      <CalendarDayName>пт</CalendarDayName>
                      <CalendarDayName>сб</CalendarDayName>
                      <CalendarDayName>вс</CalendarDayName>
                    </CalendarDaysNames>

                    <CalendarCells>
                      {calendarDays.map((dayInfo, index) => (
                        <CalendarCell
                          key={index}
                          className={`
                            ${!dayInfo.isCurrentMonth ? "_other-month" : ""}
                            ${dayInfo.isToday ? "_current" : ""}
                            ${dayInfo.isSelected ? "_selected" : ""}
                            ${dayInfo.isWeekend ? "_weekend" : ""}
                            ${dayInfo.isCurrentMonth ? "_cell-day" : ""}
                          `}
                          onClick={() =>
                            dayInfo.isCurrentMonth &&
                            handleDateSelect(dayInfo.date)
                          }
                        >
                          {dayInfo.day}
                        </CalendarCell>
                      ))}
                    </CalendarCells>
                  </CalendarContent>

                  <DatePickValue
                    type="hidden"
                    id="datepick_value"
                    value={formatDate(selectedDate)}
                  />

                  <CalendarPeriod>
                    <CalendarPeriodText className="date-end">
                      Срок исполнения:{" "}
                      <span className="date-control">
                        {formatDate(selectedDate)}
                      </span>
                    </CalendarPeriodText>
                  </CalendarPeriod>
                </CalendarBlock>
              </CalendarContainer>
            </PopBrowseWrap>

            {/* Категория */}
            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <OrangeTheme className="categories__theme _active-category">
                <p>{currentCard.topic}</p>
              </OrangeTheme>
            </div>

            {/* Кнопки редактирования */}
            <EditButtons>
              <div className="btn-group">
                <button
                  className="btn-edit__edit _btn-bg _hover01"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Сохранение..." : "Сохранить"}
                </button>
                <button
                  className="btn-edit__edit _btn-bor _hover03"
                  onClick={handleClose}
                >
                  Отменить
                </button>
                <button
                  className="btn-edit__delete _btn-bor _hover03"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Удаление..." : "Удалить задачу"}
                </button>
              </div>
              <button
                className="btn-edit__close _btn-bg _hover01"
                onClick={handleClose}
              >
                Закрыть
              </button>
            </EditButtons>
          </PopBrowseContent>
        </PopBrowseBlock>
      </PopBrowseInner>
    </PopBrowseContainer>
  );
}

export default PopBrowseEdit;
