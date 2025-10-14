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
import { Link } from "react-router-dom";
import { GlobalStyle } from "../../Global.style.js";

function ContainerSignup() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Modal>
          <ModalBlock>
            <ModalTitle>
              <h2>Регистрация</h2>
            </ModalTitle>
            <Form id="formLogUp" action="#">
              <Input
                className="first-name"
                type="text"
                name="first-name"
                id="first-name"
                placeholder="Имя"
              />
              <Input
                className="login"
                type="email"
                name="login"
                id="loginReg"
                placeholder="Эл. почта"
              />
              <Input
                className="password-first"
                type="password"
                name="password"
                id="passwordFirst"
                placeholder="Пароль"
              />
              <Button className="_hover01" id="SignUpEnter">
                <Link to="/">Зарегистрироваться</Link>
              </Button>
              <FormGroup>
                <p>
                  Уже есть аккаунт? <Link to="/sign-in">Войдите здесь</Link>
                </p>
              </FormGroup>
            </Form>
          </ModalBlock>
        </Modal>
      </Container>
    </>
  );
}

export default ContainerSignup;
