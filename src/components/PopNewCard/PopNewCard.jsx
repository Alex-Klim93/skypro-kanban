// PopNewCard.jsx
import React, { useState, useEffect } from "react";
import {
  PopNewCardContainer,
  PopNewCardWrapper,
  PopNewCardBlock,
  PopNewCardContent,
  PopNewCardTitle,
  PopNewCardClose,
  PopNewCardWrap,
  FormNew,
  FormNewBlock,
  Subtitle,
  FormNewInput,
  FormNewTextarea,
  FormNewCreateButton,
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
  CategoriesContainer,
  CategoriesText,
  CategoriesThemes,
  CategoryTheme,
} from "./PopNewCard.style.js";
import { api } from "../../api/api.js";
import { authCheck } from "../../api/authCheck.js";

function PopNewCard({ isOpen, onClose, onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "Web Design",
    date: new Date().toISOString(), // ✅ Исправлено: полная ISO строка
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  // Инициализация календаря
  useEffect(() => {
    generateCalendarDays();
  }, [currentMonth]);

  // Генерация дней календаря
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Первый день месяца
    const firstDay = new Date(year, month, 1);
    // Последний день месяца
    const lastDay = new Date(year, month + 1, 0);

    // День недели первого дня (0 - воскресенье, 1 - понедельник, etc.)
    const firstDayOfWeek = firstDay.getDay();
    // Корректировка для отображения понедельника первым
    const startDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const days = [];
    const today = new Date();

    // Добавляем пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < startDay; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }

    // Добавляем дни текущего месяца
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

  // Навигация по месяцам
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

  // Выбор даты
  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
      setFormData((prev) => ({
        ...prev,
        date: date.toISOString(), // ✅ Сохраняем полную ISO строку
      }));
    }
  };

  // Обработчики изменения формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTopicSelect = (topic) => {
    setFormData((prev) => ({
      ...prev,
      topic,
    }));
  };

  // Валидация формы
  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Название задачи обязательно для заполнения");
      return false;
    }
    if (!formData.topic) {
      setError("Выберите категорию задачи");
      return false;
    }
    setError("");
    return true;
  };

  // Создание задачи
  const handleCreate = async () => {
    if (!validateForm()) return;

    if (!authCheck.isUserAuthenticated()) {
      setError("Необходимо авторизоваться для создания задачи");
      return;
    }

    setIsCreating(true);
    setError("");

    try {
      const taskData = {
        title: formData.title.trim(),
        topic: formData.topic,
        status: "Без статуса", // ✅ Статус по умолчанию
        description: formData.description.trim(),
        date: formData.date, // ✅ Используем полную ISO строку
      };

      console.log("🔄 Отправка данных задачи:", taskData);

      const response = await api.createTask(taskData);
      console.log("✅ Задача создана:", response);

      // Сбрасываем форму
      setFormData({
        title: "",
        description: "",
        topic: "Web Design",
        date: new Date().toISOString(), // ✅ Исправлено
      });
      setSelectedDate(new Date());
      setCurrentMonth(new Date());

      // Уведомляем родительский компонент
      if (onTaskCreated) {
        onTaskCreated();
      }

      // Закрываем попап
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("❌ Ошибка создания задачи:", error);
      setError(
        error.message || "Не удалось создать задачу. Попробуйте еще раз."
      );
    } finally {
      setIsCreating(false);
    }
  };

  // Закрытие попапа
  const handleClose = () => {
    setError("");
    setFormData({
      title: "",
      description: "",
      topic: "Web Design",
      date: new Date().toISOString(), // ✅ Исправлено
    });
    setSelectedDate(new Date());
    setCurrentMonth(new Date());

    if (onClose) {
      onClose();
    }
  };

  // Форматирование даты для отображения
  const formatDate = (date) => {
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Форматирование месяца для отображения
  const formatMonth = (date) => {
    return date.toLocaleDateString("ru-RU", {
      month: "long",
      year: "numeric",
    });
  };

  // Если попап не открыт, не рендерим его
  if (!isOpen) return null;

  return (
    <PopNewCardContainer id="popNewCard">
      <PopNewCardWrapper>
        <PopNewCardBlock>
          <PopNewCardContent>
            <PopNewCardTitle>Создание задачи</PopNewCardTitle>

            <PopNewCardClose href="#" onClick={handleClose}>
              &#10006;
            </PopNewCardClose>

            {/* Сообщение об ошибке */}
            {error && (
              <div
                style={{
                  color: "red",
                  padding: "10px",
                  marginBottom: "15px",
                  backgroundColor: "#ffe6e6",
                  borderRadius: "4px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            <PopNewCardWrap>
              <FormNew id="formNewCard" action="#">
                <FormNewBlock>
                  <Subtitle htmlFor="formTitle">Название задачи</Subtitle>
                  <FormNewInput
                    type="text"
                    name="title"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    value={formData.title}
                    onChange={handleInputChange}
                    autoFocus
                    required
                  />
                </FormNewBlock>

                <FormNewBlock>
                  <Subtitle htmlFor="textArea">Описание задачи</Subtitle>
                  <FormNewTextarea
                    name="description"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    value={formData.description}
                    onChange={handleInputChange}
                  ></FormNewTextarea>
                </FormNewBlock>
              </FormNew>

              {/* Календарь для выбора даты */}
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
                          style={{
                            cursor: dayInfo.isCurrentMonth
                              ? "pointer"
                              : "default",
                            opacity: dayInfo.isCurrentMonth ? 1 : 0.3,
                          }}
                        >
                          {dayInfo.day}
                        </CalendarCell>
                      ))}
                    </CalendarCells>
                  </CalendarContent>

                  {/* Скрытое поле для хранения выбранной даты */}
                  <DatePickValue
                    type="hidden"
                    id="datepick_value"
                    value={formatDate(selectedDate)}
                  />

                  <CalendarPeriod>
                    <CalendarPeriodText className="date-end">
                      Выберите срок исполнения{" "}
                      <span className="date-control">
                        {formatDate(selectedDate)}
                      </span>
                    </CalendarPeriodText>
                  </CalendarPeriod>
                </CalendarBlock>
              </CalendarContainer>
            </PopNewCardWrap>

            {/* Блок выбора категории */}
            <CategoriesContainer className="categories">
              <CategoriesText className="subttl">Категория</CategoriesText>
              <CategoriesThemes>
                <CategoryTheme
                  className={`_orange ${
                    formData.topic === "Web Design" ? "_active-category" : ""
                  }`}
                  onClick={() => handleTopicSelect("Web Design")}
                  style={{ cursor: "pointer" }}
                >
                  <p className="_orange">Web Design</p>
                </CategoryTheme>
                <CategoryTheme
                  className={`_green ${
                    formData.topic === "Research" ? "_active-category" : ""
                  }`}
                  onClick={() => handleTopicSelect("Research")}
                  style={{ cursor: "pointer" }}
                >
                  <p className="_green">Research</p>
                </CategoryTheme>
                <CategoryTheme
                  className={`_purple ${
                    formData.topic === "Copywriting" ? "_active-category" : ""
                  }`}
                  onClick={() => handleTopicSelect("Copywriting")}
                  style={{ cursor: "pointer" }}
                >
                  <p className="_purple">Copywriting</p>
                </CategoryTheme>
              </CategoriesThemes>
            </CategoriesContainer>

            <FormNewCreateButton
              className="_hover01"
              id="btnCreate"
              onClick={handleCreate}
              disabled={isCreating || !formData.title.trim()}
              style={{
                opacity: isCreating || !formData.title.trim() ? 0.6 : 1,
                cursor:
                  isCreating || !formData.title.trim()
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {isCreating ? "Создание..." : "Создать задачу"}
            </FormNewCreateButton>
          </PopNewCardContent>
        </PopNewCardBlock>
      </PopNewCardWrapper>
    </PopNewCardContainer>
  );
}

export default PopNewCard;
