import React, { useEffect, useState } from "react";
import "./App.css";
import CreateList from "./components/createlist/CreateList";
import menuBars from "./assets/menu.svg";
import Library from "./components/library/Library";
import Flashcard from "./components/flashcard/Flashcard";
import Home from "./components/home/Home";

function App() {
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState("");
  const [currState, setCurrState] = useState("home");
  const [editListFlag, setEditListFlag] = useState(false);
  const [editListID, setEditListID] = useState("");
  const [flashcardID, setFlashCardID] = useState("");

  const menuControl = (e) => {
    // 메뉴 state와 관련 UI 변경
    const target = e.target.id;
    setCurrState(target);
    setMenu(false);
  };

  useEffect(() => {
    setEditListFlag(false); // 단어목록 수정 플래그 초기화
    setEditListID(""); // 단어목록 수정 대상ID 초기화
  }, [currState]);

  useEffect(() => {
    const localData = localStorage.getItem("data");
    setData(JSON.parse(localData));
  }, []);

  useEffect(() => {
    // data 변경시 로컬스토리지에 변경사항 저장
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <div className="App">
      <div className={modal ? "app-modal-active" : ""}> </div>
      <header>
        <h1 className="app-title">Flashbook</h1>
        <nav>
          <img
            src={menuBars}
            className="menu-image"
            alt="menu bar"
            onClick={() => setMenu(!menu)}
          />
          <ul className="menu-list">
            <li id="home" onClick={menuControl}>
              홈
            </li>
            <li id="library" onClick={menuControl}>
              라이브러리
            </li>
            <li id="createList" onClick={menuControl}>
              만들기
            </li>
          </ul>
        </nav>
      </header>
      <div className={menu ? "menuBars-list-active" : "menuBars-list"}>
        <ul>
          <li id="home" onClick={menuControl}>
            홈
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
            home: <Home />,
            createList: (
              <CreateList
                data={data}
                setData={setData}
                setModal={setModal}
                setCurrState={setCurrState}
                editListFlag={editListFlag}
                editListID={editListID}
              />
            ),
            library: (
              <Library
                data={data}
                setData={setData}
                setModal={setModal}
                setCurrState={setCurrState}
                setEditListFlag={setEditListFlag}
                setEditListID={setEditListID}
                setFlashCardID={setFlashCardID}
              />
            ),
            flashcard: (
              <Flashcard
                data={data}
                flashcardID={flashcardID}
                setCurrState={setCurrState}
              />
            ),
          }[currState]
        }
      </div>
    </div>
  );
}

export default App;
