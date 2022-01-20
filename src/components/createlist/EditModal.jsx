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
          <label htmlFor="edit-word">Word:</label>
          <input
            type="text"
            name="word"
            value={editWord.word}
            onChange={handleChange}
            required={true}
          />
          <label htmlFor="edit-def">Def:</label>
          <input
            type="text"
            name="def"
            value={editWord.def}
            onChange={handleChange}
            required={true}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
