import { useState } from "react";
import {
  Container,
  Modal,
  ModalBlock,
  ModalTitle,
  Form,
  Input,
  Button,
  FormGroup,
} from "./ContainerSignup.style.js";
import { Link, useNavigate } from "react-router-dom";
import { GlobalStyle } from "../../Global.style.js";

// ✅ ДОБАВЛЕНО: импорт API
import { api } from "../../api/api.js";

function ContainerSignup() {
  // ✅ ДОБАВЛЕНО: состояния для формы
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // ✅ ДОБАВЛЕНО: состояние успеха
  const navigate = useNavigate();

  // ✅ ДОБАВЛЕНО: обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    // ✅ ДОБАВЛЕНО: валидация полей
    if (!name || !login || !password) {
      setError("Все поля обязательны для заполнения");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов");
      setIsLoading(false);
      return;
    }

    try {
      console.log("📝 Регистрация пользователя:", { name, login, password });

      // ✅ ДОБАВЛЕНО: вызов API регистрации
      const result = await api.register(login, name, password);
      console.log("✅ Регистрация успешна:", result);

      // ✅ ИСПРАВЛЕНО: после успешной регистрации показываем сообщение и перенаправляем на вход
      setSuccess(true);

      // ✅ ДОБАВЛЕНО: через 2 секунды перенаправляем на страницу входа
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    } catch (err) {
      console.error("❌ Ошибка регистрации:", err);

      // ✅ ДОБАВЛЕНО: обработка ошибок регистрации
      if (err.message.includes("400")) {
        setError("Пользователь с таким логином уже существует");
      } else if (err.message.includes("500")) {
        setError("Ошибка сервера. Попробуйте позже");
      } else {
        setError(err.message || "Ошибка регистрации. Попробуйте снова.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Modal>
          <ModalBlock>
            <ModalTitle>
              <h2>Регистрация</h2>
            </ModalTitle>

            {/* ✅ ДОБАВЛЕНО: отображение успешной регистрации */}
            {success && (
              <div
                style={{
                  color: "green",
                  textAlign: "center",
                  marginBottom: "15px",
                  padding: "10px",
                  backgroundColor: "#e6ffe6",
                  borderRadius: "4px",
                }}
              >
                ✅ Регистрация успешна! Перенаправляем на страницу входа...
              </div>
            )}

            {/* ✅ ДОБАВЛЕНО: отображение ошибок */}
            {error && !success && (
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "15px",
                  padding: "10px",
                  backgroundColor: "#ffe6e6",
                  borderRadius: "4px",
                }}
              >
                {error}
              </div>
            )}

            {/* ✅ ИСПРАВЛЕНО: форма скрывается после успешной регистрации */}
            {!success && (
              <Form id="formLogUp" action="#" onSubmit={handleSubmit}>
                <Input
                  className="first-name"
                  type="text"
                  name="first-name"
                  id="first-name"
                  placeholder="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <Input
                  className="login"
                  type="text"
                  name="login"
                  id="loginReg"
                  placeholder="Логин"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <Input
                  className="password-first"
                  type="password"
                  name="password"
                  id="passwordFirst"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  minLength={6}
                />

                <Button
                  className="_hover01"
                  id="SignUpEnter"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                </Button>

                <FormGroup>
                  <p>
                    Уже есть аккаунт? <Link to="/sign-in">Войдите здесь</Link>
                  </p>
                </FormGroup>
              </Form>
            )}
          </ModalBlock>
        </Modal>
      </Container>
    </>
  );
}

export default ContainerSignup;
