import React, { useState } from "react";
import "./App.css";
import CreateList from "./components/createlist/CreateList";
import menuBars from "./assets/menu.svg";

function App() {
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState("");

  return (
    <div className={"App" + (modal ? " modal-active" : "")}>
      <header>
        <h1 className="app-title">Flashcard</h1>
        <nav>
          <img
            src={menuBars}
            className="menu-image"
            alt="menu bar"
            onClick={() => setMenu(!menu)}
          />
          <ul className="menu-list">
            <li>대시보드</li>
            <li>라이브러리</li>
            <li>만들기</li>
          </ul>
        </nav>
      </header>
      <div className={menu ? "menuBars-list-active" : "menuBars-list"}>
        <ul>
          <li>대시보드</li>
          <li>라이브러리</li>
          <li>만들기</li>
        </ul>
      </div>
      <div>
        <CreateList modal={modal} setModal={setModal} />
        {/* 단어장이 있으면 목록으로 보여줌. */}
        {/* 단어장이 없으면 아무것도 없다는 것을 보여줌 */}
        {/* 각 단어장 컴포넌트들은 공부하기와 테스트하기 기능이 있음. */}
        {/* 공부하기 -> 단어 리스트 보여주기 */}
        {/* 테스트 -> 플래시카드 형식으로 단어 보여주기 */}
      </div>
    </div>
  );
}

export default App;
