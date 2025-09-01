import styled from "styled-components";

export const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
`;

export const HeaderStyleContainer = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
`;

export const HeaderBlock = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 10px;
`;

export const HeaderLogo = styled.div`
  img {
    width: 85px;
  }
`;

export const HeaderNav = styled.nav`
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderButton = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;
  
  a {
    color: #ffffff;
    text-decoration: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const HeaderUser = styled.a`
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: #565eef;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid #565eef;
    border-bottom: 1.9px solid #565eef;
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
  }

  &:hover {
    opacity: 0.8;
  }
`;