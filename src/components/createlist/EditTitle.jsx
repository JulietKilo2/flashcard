import React from "react";
import "./EditTitle.scss";

export default function EditTitle({
  title,
  setTitle,
  editTitle,
  setEditTitle,
}) {
  return (
    <div className="list-title">
      {editTitle ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h2>{title}</h2>
      )}
      <button onClick={() => setEditTitle(!editTitle)}>
        {editTitle ? "확인" : "제목 수정"}
      </button>
    </div>
  );
}
