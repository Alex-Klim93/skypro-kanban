import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styled from "styled-components";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import PopBrowse from "./components/PopBrowse/PopBrowse.jsx";
import PopExit from "./components/PopExit/PopExit.jsx";
import PopNewCard from "./components/PopNewCard/PopNewCard.jsx";
import ContainerSignin from "./components/ContainerSignin/ContainerSignin.jsx";
import SontainerSignup from "./components/ContainerSignup/ContainerSignup.jsx";
import { GlobalStyle } from "./Global.style.js";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <GlobalStyle />
      <div className="wrapper">
        {/* <!-- pop-up start--> */}

        <PopExit />

        <PopNewCard />

        <PopBrowse />

        {/* <!-- pop-up end--> */}

        <Header />

        <Main />

        <ContainerSignin />

        <SontainerSignup />
      </div>

      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
