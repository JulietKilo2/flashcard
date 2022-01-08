import React from "react";
import "./Library.scss"

export default function Library({ data }) {
  return (
    <div>
      <h1>라이브러리</h1>
      <div className="library-container">
      {data &&
        data.map((item) => {
          return (
            <div key={item.id} className="library-card">
              <h2>{item.name}</h2>
              <p>단어: {item.items.length}개</p>
              <div className="library-btn-container">
                <button className="library-btn">테스트</button>
                <button className="library-btn">수정</button>
                <button className="library-btn">삭제</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
