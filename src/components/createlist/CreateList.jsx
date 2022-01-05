import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import "./CreateList.scss";

export default function CreateList() {
  const [list, setList] = useState([]);
  const [newWord, setNewWord] = useState({ word: "", def: "" });
  const [editMode, setEditMode] = useState(false);
  const [editWord, setEditWord] = useState({ word: "", def: "" });

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
    const itemToChange = list.find((item) => item.id === id);
    const indexOfItem = list.findIndex((item) => item.id === id);
    const newList = [...list];
    newList.splice(indexOfItem, 1, editWord);
    setList(newList);
    setEditMode(false);
  };

  useEffect(() => {
    // 수정 모드 종료시 관련된 state 초기화
    if (!editMode) {
      setEditWord({ word: "", def: "" });
    }
    return;
  }, [editMode]);

  return (
    <div className="container">
      <div className={editMode ? "modal-active" : "modal"}>
        <div className="modal-content">
          <form onSubmit={handleEdit}>
            <label htmlFor="edit-word">단어:</label>
            <input
              type="text"
              name="word"
              value={editWord.word}
              onChange={handleChange}
              required={true}
            />
            <label htmlFor="edit-def">의미:</label>
            <input
              type="text"
              name="def"
              value={editWord.def}
              onChange={handleChange}
              required={true}
            />
            <button type="submit">수정</button>
            <button type="button" onClick={() => setEditMode(false)}>
              취소
            </button>
          </form>
        </div>
      </div>
      <div className="title">
        <h1>단어장 관리</h1>
      </div>
      <div className="list-container">
        {list.length > 0 &&
          list.map((item) => {
            return (
              <div key={item.id} id={item.id}>
                <p>단어: {item.word}</p>
                <p>뜻: {item.def}</p>
                <button onClick={() => handleEditMode(item.id)}>수정</button>
                <button onClick={() => handleDelete(item.id)}>삭제</button>
              </div>
            );
          })}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">단어:</label>
        <input
          type="text"
          value={newWord.word}
          name="word"
          onChange={handleChange}
          required={true}
        />
        <label htmlFor="def">의미:</label>
        <input
          type="text"
          value={newWord.def}
          name="def"
          onChange={handleChange}
          required={true}
        />
        <button type="submit">추가</button>
      </form>
      <button>단어장 완성</button>
    </div>
  );
}
