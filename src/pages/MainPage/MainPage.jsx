import Header from "../../components/Header/Header.jsx";
import Main from "../../components/Main/Main.jsx";
import PopBrowse from "../../components/PopBrowse/PopBrowse.jsx";
import PopExit from "../../components/PopExit/PopExit.jsx";
import PopNewCard from "../../components/PopNewCard/PopNewCard.jsx";

function MainPage() {
  return (
    <>
      <PopExit />
      <PopNewCard />
      <PopBrowse />
      <Header />
      <Main />
    </>
  );
}

export default MainPage;
