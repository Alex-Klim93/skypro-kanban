// PopBrowse.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cardList } from "../../data.js";
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
} from "./PopBrowse.style";

function PopBrowse({ isOpen, onClose, cardId }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

  // Получаем ID задачи из URL параметров
  const urlTaskId = searchParams.get("task");

  // Используем ID из пропсов или из URL параметров
  const actualCardId = cardId || urlTaskId;

  useEffect(() => {
    setIsMounted(true);

    // Находим карточку по ID в актуальном списке
    const card = cardList.find(
      (item) => item.id === actualCardId || item._id === actualCardId
    );
    setCurrentCard(card);

    // Если карточка не найдена и попап открыт, закрываем его после монтирования
    if (!card && isOpen && isMounted) {
      console.error("Карточка не найдена с ID:", actualCardId);
      if (onClose) {
        onClose();
      }
    }
  }, [actualCardId, isOpen, isMounted, onClose]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-task/${actualCardId}`);
    if (onClose) {
      onClose();
    }
  };

  const handleDelete = () => {
    // Логика удаления задачи
    console.log("Удаление задачи:", actualCardId);
    // TODO: Реализовать вызов API для удаления
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  // Если попап не открыт или не смонтирован, не рендерим его
  if (!isOpen || !isMounted) return null;

  // Если карточка не найдена, но попап открыт, показываем сообщение об ошибке
  if (!currentCard) {
    return (
      <PopBrowseContainer isOpen={isOpen} id="popBrowse">
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
    <PopBrowseContainer isOpen={isOpen} id="popBrowse">
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
                <HideElement
                  className={
                    currentCard.status === "Без статуса" ? "active" : ""
                  }
                >
                  <p>Без статуса</p>
                </HideElement>
                <GrayTheme
                  className={
                    currentCard.status === "Нужно сделать" ? "active" : ""
                  }
                >
                  <p>Нужно сделать</p>
                </GrayTheme>
                <HideElement
                  className={currentCard.status === "В работе" ? "active" : ""}
                >
                  <p>В работе</p>
                </HideElement>
                <HideElement
                  className={
                    currentCard.status === "Тестирование" ? "active" : ""
                  }
                >
                  <p>Тестирование</p>
                </HideElement>
                <HideElement
                  className={currentCard.status === "Готово" ? "active" : ""}
                >
                  <p>Готово</p>
                </HideElement>
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

              <div className="pop-new-card__calendar calendar">
                <p className="calendar__ttl subttl">Даты</p>
                <div className="calendar__block">
                  <div className="calendar__nav">
                    <div className="calendar__month">
                      {new Date().toLocaleString("ru-RU", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="nav__actions">
                      <div className="nav__action" data-action="prev">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="11"
                          viewBox="0 0 6 11"
                        >
                          <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
                        </svg>
                      </div>
                      <div className="nav__action" data-action="next">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="6"
                          height="11"
                          viewBox="0 0 6 11"
                        >
                          <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="calendar__content">
                    {/* ... содержимое календаря ... */}
                  </div>
                  <input type="hidden" id="datepick_value" value="08.09.2023" />
                  <div className="calendar__period">
                    <p className="calendar__p date-end">
                      Срок исполнения:{" "}
                      <span className="date-control">{currentCard.date}</span>
                    </p>
                  </div>
                </div>
              </div>
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
                >
                  Удалить задачу
                </button>
              </div>
              <button
                className="btn-browse__close _btn-bg _hover01"
                onClick={handleClose}
              >
                Закрыть
              </button>
            </BrowseButtons>

            <EditButtons>
              <div className="btn-group">
                <button className="btn-edit__edit _btn-bg _hover01">
                  Сохранить
                </button>
                <button
                  className="btn-edit__edit _btn-bor _hover03"
                  onClick={handleClose}
                >
                  Отменить
                </button>
                <button
                  className="btn-edit__delete _btn-bor _hover03"
                  id="btnDelete"
                  onClick={handleDelete}
                >
                  Удалить задачу
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

export default PopBrowse;
