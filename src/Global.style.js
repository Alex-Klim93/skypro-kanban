import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }

  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
    color: inherit;
  }

  button,
  ._btn {
    cursor: pointer;
    outline: none;
    border: none;
    font-family: inherit;
  }

  ul li {
    list-style: none;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* CSS переменные для светлой темы */
  :root {
    --bg-primary: rgba(234, 238, 246, 1);
    --bg-secondary: #FFFFFF;
    --bg-tertiary: #EAEEF6;
    --text-primary: #000000;
    --text-secondary: #94A6BE;
    --text-accent: #565EEF;
    --border-primary: rgba(148, 166, 190, 0.4);
    --border-secondary: #D4DBE5;
    --accent-primary: #565EEF;
    --accent-hover: #33399b;
    --accent-secondary: #94A6BE;
    --shadow-primary: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
    --shadow-secondary: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);
    --overlay: rgba(0, 0, 0, 0.4);
    
    /* Цвета категорий */
    --orange-bg: #FFE4C2;
    --orange-text: #FF6D00;
    --green-bg: #B4FDD1;
    --green-text: #06B16E;
    --purple-bg: #E9D4FF;
    --purple-text: #9A48F1;
    --gray-bg: #94A6BE;
    --gray-text: #FFFFFF;

    /* Стили в светлой теме */
    /* Header */
    --bg-fon: #FFFFFF;
    --name-use:rgba(86, 94, 239, 1);
    /* HeaderPopUserSet */
    --bg-rgb: rgba(255, 255, 255, 1);
    --but-exit-color: #565EEF;
    --bg-shaow: 0px 10px 39px 0px rgba(26, 56, 101, 0.21);

  }

  /* CSS переменные для темной темы */
  [data-theme="dark"] {
    --bg-primary: rgba(21, 20, 25, 1);
    --bg-secondary: #2d2d2d;
    --bg-tertiary: #3a3a3a;
    --text-primary: #FFFFFF;
    --text-secondary: #94A6BE;
    --text-accent: #7983F5;
    --border-primary: rgba(255, 255, 255, 0.1);
    --border-secondary: rgba(255, 255, 255, 0.2);
    --accent-primary: #7983F5;
    --accent-hover: #5a63d4;
    --accent-secondary: #94A6BE;
    --shadow-primary: 0px 4px 67px -12px rgba(0, 0, 0, 0.6);
    --shadow-secondary: 0px 10px 39px 0px rgba(0, 0, 0, 0.4);
    --overlay: rgba(0, 0, 0, 0.6);
    
    /* Цвета категорий в темной теме */
    --orange-bg: #4a2e0f;
    --orange-text: #FF9A45;
    --green-bg: #1a3b2d;
    --green-text: #2EEF8B;
    --purple-bg: #3a2a4f;
    --purple-text: #B28AFF;
    --gray-bg: #4a5568;
    --gray-text: #E2E8F0;

    /* Стили в темной теме */
    /* Header */
    --bg-fon: rgba(32, 32, 44, 1);
    --name-use:rgba(255, 255, 255, 1);
    /* HeaderPopUserSet */
    --bg-rgb: rgba(32, 34, 41, 1);
    --bg-shaow: 0px 10px 39px 0px rgba(148, 166, 190, 0.4);
    --but-exit-color: #FFFFFF;
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }

  .wrapper {
    max-width: 100%;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    background-color: var(--bg-primary);
  }

  .container {
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
  }

  /* Анимации */
  @keyframes card-animation {
    0% {
      height: 0;
      opacity: 0;
    }
    100% {
      height: auto;
      opacity: 1;
    }
  }

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Ховер-эффекты */
  ._hover01:hover {
    background-color: var(--accent-hover);
  }

  ._hover02:hover, .header__user:hover {
    color: var(--accent-hover);
  }
  ._hover02:hover::after, .header__user:hover::after {
    border-left-color: var(--accent-hover);
    border-bottom-color: var(--accent-hover);
  }

  ._hover03:hover {
    background-color: var(--accent-hover);
    color: var(--bg-secondary);
  }
  ._hover03:hover a {
    color: var(--bg-secondary);
  }

  /* Цвета категорий */
  ._orange {
    background-color: var(--orange-bg);
    color: var(--orange-text);
  }

  ._green {
    background-color: var(--green-bg);
    color: var(--green-text);
  }

  ._purple {
    background-color: var(--purple-bg);
    color: var(--purple-text);
  }

  ._gray {
    background: var(--gray-bg);
    color: var(--gray-text);
  }

  ._active-category {
    opacity: 1 !important;
  }

  /* Попапы */
  .pop-wrap {
    position: relative;
    top: 0;
    left: 0;
  }

  .pop-exit, .pop-user-set, .pop-new-card, .pop-browse {
    display: none;
    width: 100%;
    height: 100%;
    min-width: 320px;
    min-height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
  }

  .pop-exit__container, .pop-new-card__container, .pop-browse__container {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--overlay);
  }

  .pop-exit__block, .pop-new-card__block, .pop-browse__block {
    display: block;
    margin: 0 auto;
    background-color: var(--bg-secondary);
    border-radius: 10px;
    border: 0.7px solid var(--border-secondary);
    box-shadow: var(--shadow-primary);
  }

  .pop-exit__ttl h2, .pop-new-card__ttl, .pop-browse__ttl {
    color: var(--text-primary);
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: -0.4px;
    margin-bottom: 20px;
  }

  /* Кнопки */
  ._btn-bor {
    border-radius: 4px;
    border: 0.7px solid var(--accent-primary);
    outline: none;
    background: transparent;
    color: var(--accent-primary);
    transition: all 0.3s ease;
  }
  ._btn-bor a {
    color: var(--accent-primary);
  }
  ._btn-bor:hover {
    background-color: var(--accent-primary);
    color: var(--bg-secondary);
  }

  ._btn-bg {
    border-radius: 4px;
    background: var(--accent-primary);
    border: none;
    outline: none;
    color: var(--bg-secondary);
    transition: all 0.3s ease;
  }
  ._btn-bg a {
    color: var(--bg-secondary);
  }
  ._btn-bg:hover {
    background-color: var(--accent-hover);
  }

  /* Хедер */
  .header {
    width: 100%;
    margin: 0 auto;
    background-color: var(--bg-secondary);
    border-bottom: 1px solid var(--border-primary);
  }

  .header__block {
    height: 70px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    position: relative;
    top: 0;
    left: 0;
    padding: 0 10px;
  }

  .header__btn-main-new {
    background-color: var(--accent-primary);
    color: var(--bg-secondary);
    border: none;
  }

  .header__user {
    color: var(--accent-primary);
  }
  .header__user::after {
    border-left-color: var(--accent-primary);
    border-bottom-color: var(--accent-primary);
  }

  /* Основной контент */
  .main {
    width: 100%;
    background-color: var(--bg-tertiary);
  }

  .main__block {
    width: 100%;
    margin: 0 auto;
    padding: 25px 0 49px;
  }

  /* Карточки */
  .cards__card {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
  }

  .card__title {
    color: var(--text-primary);
  }

  .card__date p {
    color: var(--text-secondary);
  }

  /* Формы */
  .form-new__input, .form-new__area, .form-browse__area {
    background: transparent;
    border: 0.7px solid var(--border-primary);
    color: var(--text-primary);
  }
  .form-new__input::placeholder, .form-new__area::placeholder, .form-browse__area::placeholder {
    color: var(--text-secondary);
  }

  /* Календарь */
  .calendar__p, .calendar__month, .calendar__day-name {
    color: var(--text-secondary);
  }

  .calendar__cell {
    color: var(--text-secondary);
  }
  .calendar__cell:hover {
    color: var(--text-secondary);
    background-color: var(--bg-tertiary);
  }
  ._active-day {
    background-color: var(--accent-secondary);
    color: var(--bg-secondary);
  }

  /* Утилиты */
  ._hide {
    display: none;
  }

  /* Адаптивность */
  @media screen and (max-width: 1200px) {
    .main__block {
      padding: 40px 0 64px;
    }
  }

  @media screen and (max-width: 660px) {
    .pop-new-card, .pop-browse {
      top: 70px;
    }
    .pop-new-card__container, .pop-browse__container {
      padding: 0;
      justify-content: flex-start;
    }
    .pop-new-card__block, .pop-browse__block {
      border-radius: 0;
    }
  }

  @media screen and (max-width: 495px) {
    .container {
      padding: 0 16px;
    }
    .header__btn-main-new {
      background-color: var(--accent-primary);
    }
  }

  @media only screen and (max-width: 375px) {
    .pop-exit__block {
      padding: 50px 20px;
    }
  }

  /* Целевые состояния для попапов */
  .pop-user-set:target,
  .pop-exit:target,
  .pop-new-card:target,
  .pop-browse:target {
    display: block;
  }
`;
