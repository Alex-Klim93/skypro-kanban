import styled from "styled-components";

// ✅ ДОБАВЛЕНА ОБЕРТКА ДЛЯ ПОЗИЦИОНИРОВАНИЯ
export const PopUserSetWrapper = styled.div`
  z-index: 1000;
`;

export const PopUserSetContainer = styled.div`
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid var(--bg-rgb);
  background: var(--bg-secondary);
  box-shadow: var(--bg-shaow);
  padding: 34px;
  text-align: center;
  z-index: 2;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

export const PopUserName = styled.p`
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
`;

export const PopUserMail = styled.p`
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
`;

export const PopUserTheme = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  p {
    color: var(--text-primary);
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.14px;
  }
`;

export const ThemeCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: relative;
  width: 24px;
  height: 13px;
  border-radius: 100px;
  background: ${(props) =>
    props.checked ? "rgba(86, 94, 239, 0.3)" : "#EAEEF6"};
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 1px;
    left: ${(props) => (props.checked ? "12px" : "1px")};
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: ${(props) =>
      props.checked ? "var(--accent-primary)" : "#94A6BE"};
    transition: all 0.3s ease;
  }
`;

export const PopUserButton = styled.button`
  width: 72px;
  height: 30px;
  background: transparent;
  color: var(--but-exit-color);
  border-radius: 4px;
  border: 1px solid var(--but-exit-color);
  cursor: pointer;
  outline: none;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--accent-hover);
    color: #ffffff;
    border-color: var(--accent-hover);
  }
`;
