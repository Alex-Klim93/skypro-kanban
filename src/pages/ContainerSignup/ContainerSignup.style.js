import styled from "styled-components";

export const Container = styled.div`
  &.container-signup {
    width: 100%;
    height: 100%;
    min-width: 320px;
    min-height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
  }
`;

export const Modal = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--overlay);
`;

export const ModalBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: var(--bg-secondary);
  max-width: 370px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid var(--border-secondary);
  box-shadow: var(--shadow-primary);
`;

export const ModalTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.4px;
  margin-bottom: 20px;

  h2 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: -0.4px;
    margin-bottom: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid var(--border-primary);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-bottom: 20px;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: var(--text-secondary);
    letter-spacing: -0.14px;
  }

  &:first-of-type {
    margin-top: 20px;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 30px;
  background-color: var(--accent-primary);
  border-radius: 4px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: var(--text-primary);
  margin-top: 20px;
  margin-bottom: 20px;

  a {
    width: 100%;
    height: 100%;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  &:hover {
    background-color: var(--accent-hover);
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: var(--text-primary);
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
    text-align: center;

    a {
      color: var(--text-accent);
      font-size: 14px;
      line-height: 21px;
      letter-spacing: -0.14px;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
