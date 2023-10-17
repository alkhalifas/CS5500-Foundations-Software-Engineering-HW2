import Header from "./header/header";
import Menubar from "./menubar/menubar";
import "./fakestackoverflow.css"
import MainContent from "./main/main";

export default function fakeStackOverflow() {
  return (
      <>
          <Header />
          <div className="content-container">
              <Menubar />
              <MainContent />
          </div>
      </>

  );
}
