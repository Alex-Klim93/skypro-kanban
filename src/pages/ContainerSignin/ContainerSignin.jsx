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
} from "./ContainerSignin.style.js";
import { Link } from "react-router-dom";
import { GlobalStyle } from "../../Global.style.js";
import { AuthContext } from "../../context/AuthContext";

function ContainerSignin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login: authLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    // 1. УБИРАЕМ ВСЕ preventDefault - пусть форма ведет себя как обычно
    // e.preventDefault(); // УБИРАЕМ ЭТУ СТРОЧКУ

    if (isLoading) return;

    setError("");

    // Проверка полей
    if (!login.trim()) {
      setError("Введите логин");
      return;
    }

    if (!password.trim()) {
      setError("Введите пароль");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authLogin({ login, password });
      setError(result.error || "Неверный логин или пароль");
    } catch (err) {
      console.error("Ошибка:", err);
      setError("Ошибка соединения с сервером");
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
              <h2>Вход</h2>
            </ModalTitle>

            {error && (
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "15px",
                  padding: "10px",
                  backgroundColor: "#ffe6e6",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}

            {/* УБИРАЕМ onSubmit у формы */}
            <Form>
              <Input
                type="text"
                name="login"
                id="formlogin"
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                disabled={isLoading}
              />
              <Input
                type="password"
                name="password"
                id="formpassword"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              {/* МЕНЯЕМ type на "button" и добавляем onClick */}
              <Button
                className="_hover01"
                id="btnEnter"
                type="button" // МЕНЯЕМ на button
                disabled={isLoading}
                onClick={handleSubmit} // Добавляем обработчик
              >
                {isLoading ? "Вход..." : "Войти"}
              </Button>
              <FormGroup>
                <p>Нужно зарегистрироваться?</p>
                <Link to="/sign-up">Регистрируйтесь здесь</Link>
              </FormGroup>
            </Form>
          </ModalBlock>
        </Modal>
      </Container>
    </>
  );
}

export default ContainerSignin;
