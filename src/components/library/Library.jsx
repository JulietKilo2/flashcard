import React, { useState } from "react";
import "./Library.scss";
import leaveImg from "../../assets/leave.png";

export default function Library({
  data,
  setData,
  setModal,
  setCurrState,
  setEditListFlag,
  setEditListID,
  setFlashCardID,
}) {
  const [localModal, setLocalModal] = useState(false);
  const [itemID, setItemID] = useState("");

  const handleEditList = (id) => {
    setEditListID(id);
    setEditListFlag(true);
    setCurrState("createList");
  };

  const handleModal = (id) => {
    setItemID(id); // save the id of target (to be removed) list to the state
    setModal(true);
    setLocalModal(true);
  };

  const handleCancel = () => {
    // cancelling the removing process
    setItemID("");
    setModal(false);
    setLocalModal(false);
  };

  const handleDelete = () => {
    const removeID = itemID;
    const newData = data.filter((item) => {
      return item.id !== removeID;
    });
    setData(newData); // update the data state
    handleCancel(); // resets the delete interface
  };

  const handleTest = (id) => {
    setFlashCardID(id);
    setCurrState("flashcard");
  };

  return (
    <div>
      {localModal && (
        <div className="modal-active">
          <div className="lib-modal">
            <h3>Are you sure?</h3>
            <div className="modal-btn-container">
              <button className="warning" onClick={handleDelete}>
                Delete
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {data === null || data.length === 0 ? (
        <div className="library-empty">
          <img src={leaveImg} className="library-empty-image" alt="leave" />
          <p>Your library is empty..</p>
          <p>Let's make a new list!</p>
          <button onClick={() => setCurrState("createList")}>Create</button>
        </div>
      ) : (
        <div className="library-container">
          {data &&
            data.map((item) => {
              return (
                <div key={item.id} className="library-card">
                  <h2>{item.name}</h2>
                  <p>{item.items.length} words</p>
                  <div className="library-btn-container">
                    {item.items.length > 0 && (
                      <button
                        className="library-btn"
                        onClick={() => handleTest(item.id)}
                      >
                        Flash!
                      </button>
                    )}
                    <button
                      className="library-btn"
                      onClick={() => handleEditList(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="library-btn warning"
                      onClick={() => handleModal(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
