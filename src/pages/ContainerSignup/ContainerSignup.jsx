import { useState, useContext } from "react";
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
import { AuthContext } from "../../context/AuthContext";

function ContainerSignup() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Получаем функцию register из контекста
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

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
      // Используем реальную функцию register из AuthContext
      const result = await register({ login, name, password });

      if (result.success) {
        setSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(result.error || "Ошибка регистрации");
      }
    } catch (err) {
      console.error("❌ Ошибка регистрации:", err);
      setError("Ошибка регистрации. Попробуйте снова.");
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
                ✅ Регистрация успешна! Перенаправляем на главную страницу...
              </div>
            )}

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
                  placeholder="Эл. почта"
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
