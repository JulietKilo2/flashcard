import React from "react";
import "./EditModal.scss";

export default function EditModal({
  editWord,
  handleEdit,
  handleChange,
  setEditMode,
}) {
  return (
    <div className="modal-active">
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
  );
}
