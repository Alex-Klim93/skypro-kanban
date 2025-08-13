// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { cardList } from "../data.js";
import CardsItem from "./CardsItem.jsx";
import "../App.css";

function MainColumn() {
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
        <div key={status} className="main__column column">
          <div className="column__title">
            <p>{status}</p>
          </div>
          <div className="cards">
            {cardList
              .filter((card) => card.status === status)
              // .sort((a, b) => new Date(b.date) - new Date(a.date)) // Сортировка по дате (новые сверху) пока не работает
              .map((card) => (
                <CardsItem key={card.id} card={card} />
              ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default MainColumn;
