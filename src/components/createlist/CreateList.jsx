import React, { useState } from "react";
import uuid from "react-uuid";

export default function CreateList() {
  const [list, setList] = useState([]);
  const [newWord, setNewWord] = useState({ word: "", def: "" });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    // 새 단어 입력폼 관리
    const target = e.target.name;
    const value = e.target.value;
    setNewWord({ ...newWord, [target]: value });
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

  const handleEdit = (id) => {
    setEditMode(true);
  };

  return (
    <div className="modal">
      <div className="container">
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
                  <button onClick={() => handleEdit(item.id)}>수정</button>
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
    </div>
  );
}
