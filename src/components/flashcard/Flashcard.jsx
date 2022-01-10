import React, { useState } from "react";
import "./Flashcard.scss";

export default function Flashcard({ data, flashcardID, setCurrState }) {
  const wordListDB = data.filter((list) => list.id === flashcardID)[0];
  const wordList = wordListDB.items;
  const [idx, setIdx] = useState(0);
  const [flip, setFlip] = useState(false);

  const handleIndex = (param) => {
    if (param === "plus") {
      if (idx === wordList.length - 1) {
        return;
      }
      setFlip(false);
      setIdx((prev) => {
        return prev + 1;
      });
    }

    if (param === "minus") {
      if (idx === 0) {
        return;
      }
      setFlip(false);
      setIdx((prev) => {
        return prev - 1;
      });
    }
  };
  return (
    <div className="flashcard-container">
      <div className="flashcard-list-name">{wordListDB.name}</div>
      <div className="flashcard-card">
        <div className="flashcard-indicator">
          <div>{flip ? "뜻" : "단어"}</div>
          <div>
            {idx + 1}/{wordList.length}
          </div>
        </div>
        {flip ? (
          <div className="flashcard-content-back">{wordList[idx].def}</div>
        ) : (
          <div className="flashcard-content-front">{wordList[idx].word}</div>
        )}
        <div className="flashcard-btn-container">
          <button
            className={idx === 0 ? "hidden" : ""}
            onClick={() => handleIndex("minus")}
          >
            이전
          </button>
          <button onClick={() => setFlip(!flip)}>뒤집기</button>
          {idx + 1 === wordList.length ? (
            <button onClick={() => setCurrState("library")}>완성</button>
          ) : (
            <button onClick={() => handleIndex("plus")}>다음</button>
          )}
        </div>
      </div>
    </div>
  );
}
