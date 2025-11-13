// PopBrowse.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cardList, loadTasksFromServer } from "../../data.js";
import { api } from "../../api/api.js";
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
  BrowseButtons,
  EditButtons,
  HideElement,
  OrangeTheme,
  GrayTheme,
  ActiveCategory,
  ActiveStatus,
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
} from "./PopBrowse.style";

function PopBrowse({ isOpen, onClose, setRefreshTrigger }) {
  const navigate = useNavigate();
  const { id } = useParams(); // Получаем ID из URL параметров
  const [isMounted, setIsMounted] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Состояния для календаря
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  // Используем ID из URL параметров
  const actualCardId = id;

  // Мемоизируем функцию закрытия
  const handleClose = useCallback(() => {
    navigate("/"); // Возвращаемся на главную
  }, [navigate]);

  // Основной эффект для загрузки карточки
  useEffect(() => {
    setIsMounted(true);

    if (actualCardId) {
      // Находим карточку по ID в актуальном списке
      const card = cardList.find(
        (item) => item.id === actualCardId || item._id === actualCardId
      );
      setCurrentCard(card);

      // Если карточка не найдена и попап открыт, закрываем его после монтирования
      if (!card && isOpen && isMounted) {
        console.error("Карточка не найдена с ID:", actualCardId);
        handleClose();
      }
    }
  }, [actualCardId, isOpen, isMounted, handleClose]);

  // Эффект для инициализации даты из карточки
  useEffect(() => {
    if (currentCard && currentCard.date) {
      // Парсим дату из карточки
      const cardDate = new Date(currentCard.date);
      setSelectedDate(cardDate);
      setCurrentMonth(cardDate);
    }
  }, [currentCard]); // Только при изменении currentCard

  // Эффект для генерации дней календаря
  useEffect(() => {
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

    generateCalendarDays();
  }, [currentMonth, selectedDate]);

  // Мемоизируем обработчики навигации по календарю
  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  }, [currentMonth]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  }, [currentMonth]);

  // Мемоизируем обработчик выбора даты
  const handleDateSelect = useCallback((date) => {
    if (date) {
      setSelectedDate(date);
      // Здесь можно добавить логику обновления даты задачи
      console.log("Выбрана новая дата:", date);
    }
  }, []);

  const handleEdit = useCallback(() => {
    console.log("🔄 Переход в режим редактирования задачи:", actualCardId);

    // Переходим на страницу редактирования
    navigate(`/task/${actualCardId}/edit`);
  }, [actualCardId, navigate]);

  const handleDelete = useCallback(async () => {
    if (!currentCard) return;

    if (!window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      return;
    }

    setIsDeleting(true);
    try {
      console.log("🗑️ Удаление задачи:", actualCardId);

      // Удаляем задачу через API
      await api.deleteTask(actualCardId);
      console.log("✅ Задача успешно удалена с сервера");

      // Обновляем локальный список задач
      await loadTasksFromServer();

      // Триггерим обновление в Main.jsx (один запрос)
      if (setRefreshTrigger) {
        setRefreshTrigger((prev) => prev + 1);
      }

      // Закрываем попап
      handleClose();
    } catch (error) {
      console.error("❌ Ошибка удаления задачи:", error);
      alert(`Не удалось удалить задачу: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  }, [currentCard, actualCardId, handleClose, setRefreshTrigger]);

  // Форматирование даты для отображения
  const formatDate = useCallback((date) => {
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []);

  // Форматирование месяца для отображения
  const formatMonth = useCallback((date) => {
    return date.toLocaleDateString("ru-RU", {
      month: "long",
      year: "numeric",
    });
  }, []);

  // Если попап не открыт или не смонтирован, не рендерим его
  if (!isOpen || !isMounted) return null;

  // Если карточка не найдена, но попап открыт, показываем сообщение об ошибке
  if (!currentCard) {
    return (
      <PopBrowseContainer $isOpen={isOpen} id="popBrowse">
        <PopBrowseInner>
          <PopBrowseBlock>
            <PopBrowseContent>
              <PopBrowseTitle>Ошибка</PopBrowseTitle>
              <p>Задача не найдена</p>
              <button onClick={handleClose}>Закрыть</button>
            </PopBrowseContent>
          </PopBrowseBlock>
        </PopBrowseInner>
      </PopBrowseContainer>
    );
  }

  return (
    <PopBrowseContainer $isOpen={isOpen} id="popBrowse">
      <PopBrowseInner>
        <PopBrowseBlock>
          <PopBrowseContent>
            {/* Верхний блок с заголовком и категорией */}
            <PopBrowseTopBlock>
              <PopBrowseTitle>{currentCard.title}</PopBrowseTitle>
              <OrangeTheme
                className={`card__theme ${currentCard.themeClass}`}
                $themeClass={currentCard.themeClass}
              >
                <p>{currentCard.topic}</p>
              </OrangeTheme>
            </PopBrowseTopBlock>

            {/* Блок статуса */}
            <StatusBlock className="pop-browse__status status">
              <StatusParagraph className="subttl">Статус</StatusParagraph>
              <StatusThemes>
                <GrayTheme className="active">
                  <p>{currentCard.status}</p>
                </GrayTheme>
              </StatusThemes>
            </StatusBlock>

            {/* Обертка формы и календаря */}
            <PopBrowseWrap>
              {/* Форма с описанием задачи */}
              <PopBrowseForm id="formBrowseCard" action="#">
                <FormBrowseBlock>
                  <label htmlFor="textArea01" className="subttl">
                    Описание задачи
                  </label>
                  <FormBrowseArea
                    name="text"
                    id="textArea01"
                    readOnly
                    placeholder="Введите описание задачи..."
                    value={
                      currentCard.description ||
                      `Описание задачи для "${currentCard.title}". Категория: ${currentCard.topic}, Статус: ${currentCard.status}, Дата: ${currentCard.date}`
                    }
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
                        {currentCard.date
                          ? formatDate(new Date(currentCard.date))
                          : "Не установлен"}
                      </span>
                    </CalendarPeriodText>
                  </CalendarPeriod>
                </CalendarBlock>
              </CalendarContainer>
            </PopBrowseWrap>

            {/* Категория (для мобильной версии) */}
            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <OrangeTheme className="categories__theme _active-category">
                <p>{currentCard.topic}</p>
              </OrangeTheme>
            </div>

            {/* Кнопки просмотра */}
            <BrowseButtons>
              <div className="btn-group">
                <button
                  className="btn-browse__edit _btn-bor _hover03"
                  onClick={handleEdit}
                >
                  Редактировать задачу
                </button>
                <button
                  className="btn-browse__delete _btn-bor _hover03"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Удаление..." : "Удалить задачу"}
                </button>
              </div>
              <button
                className="btn-browse__close _btn-bg _hover01"
                onClick={handleClose}
              >
                Закрыть
              </button>
            </BrowseButtons>
          </PopBrowseContent>
        </PopBrowseBlock>
      </PopBrowseInner>
    </PopBrowseContainer>
  );
}

export default PopBrowse;
