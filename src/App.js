import React, { useEffect, useState } from "react";
import "./App.css";
import CreateList from "./components/createlist/CreateList";
import menuBars from "./assets/menu.svg";
import Library from "./components/library/Library";

function App() {
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState("");
  const [currState, setCurrState] = useState("createList");

  const menuControl = (e) => {
    // 메뉴 state와 관련 UI 변경
    const target = e.target.id;
    setCurrState(target);
    setMenu(false);
  };

  useEffect(() => {
    // 로컬스토리지에서 데이터 가져오기
    const localData = localStorage.getItem("data");
    setData(JSON.parse(localData));
  }, [currState]);

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
          <li id="dashboard" onClick={menuControl}>
            대시보드
          </li>
          <li id="library" onClick={menuControl}>
            라이브러리
          </li>
          <li id="createList" onClick={menuControl}>
            만들기
          </li>
        </ul>
      </div>
      <div>
        {
          {
            dashboard: <h1>홈이에요</h1>,
            createList: (
              <CreateList setModal={setModal} setCurrState={setCurrState} />
            ),
            library: (
              <Library data={data} setData={setData} setModal={setModal} />
            ),
          }[currState]
        }
      </div>
    </div>
  );
}

export default App;
