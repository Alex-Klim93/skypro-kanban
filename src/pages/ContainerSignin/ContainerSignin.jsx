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
import { Link, useNavigate } from "react-router-dom";
import { GlobalStyle } from "../../Global.style.js";
import { AuthContext } from "../../context/AuthContext";

function ContainerSignin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Получаем функцию login из контекста
  const { login: authLogin } = useContext(AuthContext);

  const handleTestLogin = () => {
    setLogin("admin");
    setPassword("admin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("🔐 Попытка входа:", { login, password });

      // Используем реальную функцию login из AuthContext
      const result = await authLogin({ login, password });

      if (result.success) {
        console.log("✅ Вход успешен через AuthContext");
        navigate("/");
      } else {
        setError(result.error || "Ошибка авторизации");
      }
    } catch (err) {
      console.error("❌ Ошибка входа:", err);
      setError("Ошибка авторизации. Проверьте данные и попробуйте снова.");
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

            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <button
                type="button"
                onClick={handleTestLogin}
                style={{
                  background: "transparent",
                  border: "1px solid #565eef",
                  color: "#565eef",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Заполнить тестовые данные (admin/admin)
              </button>
            </div>

            {error && (
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

            <Form id="formLogIn" action="#" onSubmit={handleSubmit}>
              <Input
                type="text"
                name="login"
                id="formlogin"
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                disabled={isLoading}
                required
              />
              <Input
                type="password"
                name="password"
                id="formpassword"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <Button
                className="_hover01"
                id="btnEnter"
                type="submit"
                disabled={isLoading}
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
