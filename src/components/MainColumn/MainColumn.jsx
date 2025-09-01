import { cardList } from "../../data.js";
import CardsItem from "../CardsItem/CardsItem.jsx";
import { Column, ColumnTitle, CardsContainer } from "./MainColumn.style.js";

/**
 * Компонент колонок с задачами
 * Отображает задачи, сгруппированные по статусам
 * Каждая колонка представляет определенный этап выполнения
 *
 * @returns {JSX.Element} Группа колонок с задачами
 */
function MainColumn() {
  // Массив статусов для создания колонок
  const statusColumns = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  return (
    <>
      {statusColumns.map((status) => (
        <Column key={status}>
          {/* Заголовок колонки с названием статуса */}
          <ColumnTitle>
            <p>{status}</p>
          </ColumnTitle>

          {/* Контейнер для карточек текущего статуса */}
          <CardsContainer>
            {cardList
              .filter((card) => card.status === status)
              // TODO: Добавить сортировку по дате когда будет реализовано
              // .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((card) => (
                <CardsItem key={card.id} card={card} />
              ))}
          </CardsContainer>
        </Column>
      ))}
    </>
  );
}

export default MainColumn;
