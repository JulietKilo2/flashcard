import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import "./CreateList.scss";
import EditModal from "./EditModal";
import EditTitle from "./EditTitle";
import ItemList from "./ItemList";

export default function CreateList({
  setModal,
  setCurrState,
  editListFlag,
  editListID,
}) {
  const [title, setTitle] = useState("새 단어장");
  const [editTitle, setEditTitle] = useState(false);
  const [list, setList] = useState([]);
  const [newWord, setNewWord] = useState({ word: "", def: "" });
  const [editMode, setEditMode] = useState(false);
  const [editWord, setEditWord] = useState({ word: "", def: "" });
  const [editFlag, setEditFlag] = useState(editListFlag);
  const [editID, setEditID] = useState(editListID);

  const saveData = () => {
    if (!editFlag) {
      // 수정모드가 아닌 새 단어장 입력시 코드
      let newData = [{ name: title, id: uuid(), items: list }];
      if (localStorage.getItem("data") === null) {
        // 로컬스토리지에 데이터가 없을시 새로 생성
        localStorage.setItem("data", [JSON.stringify(newData)]);
        setCurrState("library");
      } else {
        // 로컬스토리지에 데이터가 있을시 업데이트
        let oldData = JSON.parse(localStorage.getItem("data"));
        localStorage.setItem("data", JSON.stringify(oldData.concat(newData)));
        setCurrState("library");
      }
    } else {
      // 수정모드일시 실행되는 코드
      let newData = [{ name: title, id: editID, items: list }];
      // console.log(newData);
      let oldData = JSON.parse(localStorage.getItem("data"));
      // console.log(oldData);
      const listIdx = oldData.findIndex((list) => list.id === editID);
      const updateData = oldData.splice(listIdx, 1, newData);
      setEditFlag(false);
      localStorage.setItem("data", JSON.stringify(updateData));
      setCurrState("library");
    }
  };

  const handleChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    if (!editMode) {
      // 새 단어 입력
      setNewWord({ ...newWord, [target]: value });
    } else if (editMode) {
      // 기존 단어 수정
      setEditWord({ ...editWord, [target]: value });
    }
    return;
  };

  const handleSubmit = (e) => {
    // 새 단어 추가
    e.preventDefault();
    const newItem = { ...newWord, id: uuid() };
    const newList = [...list, newItem];
    setList(newList);
    setNewWord({ word: "", def: "" });
  };

  const handleDelete = (id) => {
    // 목록에서 단어 삭제
    const newList = list.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });
    setList(newList);
  };

  const handleEditMode = (id) => {
    if (!editMode) {
      setEditMode(true);
      setModal(true);
      const target = list.filter((item) => item.id === id);
      setEditWord(...target);
    } else {
      setEditMode(false);
    }
  };

  const handleEdit = (e) => {
    // 단어 수정 반영
    e.preventDefault();
    const id = editWord.id;
    const indexOfItem = list.findIndex((item) => item.id === id);
    const newList = [...list];
    newList.splice(indexOfItem, 1, editWord);
    setList(newList);
    setEditMode(false);
  };

  useEffect(() => {
    // 수정 모드 종료시 관련된 state 초기화
    if (!editMode) {
      setModal(false);
      setEditWord({ word: "", def: "" });
    }
    return;
  }, [editMode]);

  useEffect(() => {
    // 단어 목록 수정모드 플래그 확인
    if (editFlag) {
      // 수정모드 플래그가 켜졌을시 해당 목록의 내용물을 삽입하는 코드들
      const localData = JSON.parse(localStorage.getItem("data"));
      const listToEdit = localData.filter((list) => {
        return list.id === editID;
      });
      setTitle(listToEdit[0].name);
      setList(listToEdit[0].items);
    }
    return;
  }, [editFlag]);

  return (
    <div className="container">
      {editMode && (
        <EditModal
          editWord={editWord}
          handleEdit={handleEdit}
          handleChange={handleChange}
          setEditMode={setEditMode}
        />
      )}
      <EditTitle
        title={title}
        setTitle={setTitle}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
      />
      <ItemList
        list={list}
        handleDelete={handleDelete}
        handleEditMode={handleEditMode}
      />
      <h2>단어 추가하기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-items">
          <label htmlFor="name">
            <b>단어</b>
          </label>
          <input
            type="text"
            value={newWord.word}
            name="word"
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-items">
          <label htmlFor="def">
            <b>의미</b>
          </label>
          <input
            type="text"
            value={newWord.def}
            name="def"
            onChange={handleChange}
            required={true}
          />
        </div>
        <button type="submit">단어 추가</button>
      </form>
      <button className="btn-confirm" onClick={saveData}>
        {editFlag ? "수정완료" : "완성하기"}
      </button>
    </div>
  );
}
