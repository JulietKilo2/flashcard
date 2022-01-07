import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import "./CreateList.scss";
import EditModal from "./EditModal";
import EditTitle from "./EditTitle";
import ItemList from "./ItemList";

export default function CreateList({ setModal, setCurrState }) {
  const [title, setTitle] = useState("새 단어장");
  const [editTitle, setEditTitle] = useState(false);
  const [list, setList] = useState([]);
  const [newWord, setNewWord] = useState({ word: "", def: "" });
  const [editMode, setEditMode] = useState(false);
  const [editWord, setEditWord] = useState({ word: "", def: "" });

  const saveData = () => {
    let newData = [{ name: title, id: uuid(), items: list }];
    if (localStorage.getItem("data") === null) {
      localStorage.setItem("data", [JSON.stringify(newData)]);
      setCurrState("library");
    } else {
      let oldData = JSON.parse(localStorage.getItem("data"));
      localStorage.setItem("data", JSON.stringify(oldData.concat(newData)));
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
        완성하기
      </button>
    </div>
  );
}
