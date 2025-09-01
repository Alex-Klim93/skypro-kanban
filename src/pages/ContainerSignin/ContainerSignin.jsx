import { useState } from "react"; // Добавляем useState
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
import { Link, useNavigate } from "react-router-dom"; // Добавляем useNavigate
import { GlobalStyle } from "../../Global.style.js";
import useAuth from "../../components/Hooks/useAuth.js"; // Добавляем хук аутентификации

function ContainerSignin() {
  const [email, setEmail] = useState(""); // Состояние для email
  const [password, setPassword] = useState(""); // Состояние для пароля
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь должна быть логика авторизации
    // После успешной авторизации:
    login("auth-token-example"); // Сохраняем токен
    navigate("/"); // Переходим на главную
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
            {/* Добавляем обработчик отправки формы */}
            <Form id="formLogIn" action="#" onSubmit={handleSubmit}>
              <Input
                type="email"
                name="login"
                id="formlogin"
                placeholder="Эл. почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                name="password"
                id="formpassword"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Меняем Link на button для отправки формы */}
              <Button className="_hover01" id="btnEnter" type="submit">
                Войти
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
