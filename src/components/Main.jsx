import { useState, useEffect } from "react";
import "../App.css";
import MainColumn from "./MainColumn.jsx";

function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          {isLoading ? (
            <div className="main__content">
              <div className="main__column column">
                <div className="column__title">
                  <p>Данные загружаются...</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="main__content">
              <MainColumn />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Main;
