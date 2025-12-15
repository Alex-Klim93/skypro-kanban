import { useState, useContext } from "react";
import {
  Container,
  Modal,
  ModalBlock,
  ModalTitle,
  Input,
  Button,
  FormGroup,
} from "./ContainerSignin.style.js";
import { Link } from "react-router-dom";
import { GlobalStyle } from "../../Global.style.js";
import { AuthContext } from "../../context/AuthContext";

function ContainerSignin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login: authLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // ✅ Проверка на пустые поля с раздельными сообщениями
    if (!login.trim() && !password.trim()) {
      setError("Введите логин и пароль");
      return;
    }else if (!login.trim()) {
      setError("Введите логин");
      return;
    }else if (!password.trim()) {
      setError("Введите пароль");
      return;
    }

    // Сбрасываем ошибки
    setError("");
    setIsLoading(true);

    try {
      // Вызываем функцию логина из контекста
      const result = await authLogin({
        login: login.trim(),
        password: password.trim(),
      });

      // ✅ ИСПРАВЛЕНА ПРОВЕРКА ОШИБОК
      if (result && !result.success) {
        const errorMessage = result.error || "Неверный логин или пароль";
        if (errorMessage.toLowerCase().includes("логин")) {
          setError("Неверный логин");
        } else if (errorMessage.toLowerCase().includes("пароль")) {
          setError("Неверный пароль");
        } else {
          setError(errorMessage);
        }
      }
    } catch (err) {
      console.error("Ошибка при входе:", err);
      setError("Ошибка соединения с сервером");
    } finally {
      setIsLoading(false);
    }
  };

  // Обработчик нажатия клавиши Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Modal>
          <ModalBlock>
            <ModalTitle>
              <h2>Вход</h2>
            </ModalTitle>

            <div>
              <Input
                type="text"
                placeholder="Логин"
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                  // Сбрасываем ошибку при изменении логина
                  if (error && error.includes("логин")) {
                    setError("");
                  }
                }}
                disabled={isLoading}
                style={{ marginBottom: "14px", width: "100%" }}
              />
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  // Сбрасываем ошибку при изменении пароля
                  if (error && error.includes("пароль")) {
                    setError("");
                  }
                }}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                style={{ marginBottom: "4px", width: "100%" }}
              />

              {/* Отображение ошибки под полем пароля */}
              {error && (
                <div
                  style={{
                    color: "#ff0000",
                    fontSize: "12px",
                    marginBottom: "8px",
                    paddingLeft: "4px",
                  }}
                >
                  {error}
                </div>
              )}

              <Button
                className="_hover01"
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                style={{ width: "100%", marginTop: "20px" }}
              >
                {isLoading ? "Проверка..." : "Войти"}
              </Button>

              <FormGroup style={{ marginTop: "20px" }}>
                <p>Нужно зарегистрироваться?</p>
                <Link to="/sign-up">Регистрируйтесь здесь</Link>
              </FormGroup>
            </div>
          </ModalBlock>
        </Modal>
      </Container>
    </>
  );
}

export default ContainerSignin;
