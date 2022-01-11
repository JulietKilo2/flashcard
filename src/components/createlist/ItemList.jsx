import React from "react";
import "./ItemList.scss";

export default function ItemList({ list, handleDelete, handleEditMode }) {
  return (
    <div className="list-container">
      {list.length > 0 &&
        list.map((item) => {
          return (
            <div className="list-item-container" key={item.id} id={item.id}>
              <div className="list-item-text-container">
                <p>
                  <span className="list-bold">단어:</span> {item.word}
                </p>
                <p>
                  <span className="list-bold">뜻: </span>
                  {item.def}
                </p>
              </div>
              <div className="list-item-btn-container">
                <button onClick={() => handleEditMode(item.id)}>수정</button>
                <button
                  className="delete"
                  onClick={() => handleDelete(item.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
