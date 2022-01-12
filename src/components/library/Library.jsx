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
    setItemID(id); // 삭제 staging 될 id를 state로 저장
    setModal(true);
    setLocalModal(true);
  };

  const handleCancel = () => {
    // 삭제 staging 취소
    setItemID("");
    setModal(false);
    setLocalModal(false);
  };

  const handleDelete = () => {
    const removeID = itemID;
    const newData = data.filter((item) => {
      return item.id !== removeID;
    });
    setData(newData); // data state 변경
    handleCancel(); // 삭제관련 UI 초기화
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
            <h3>정말 삭제하시겠습니까?</h3>
            <div className="modal-btn-container">
              <button className="warning" onClick={handleDelete}>
                삭제
              </button>
              <button onClick={handleCancel}>취소</button>
            </div>
          </div>
        </div>
      )}
      {data === null || data.length === 0 ? (
        <div className="library-empty">
          <img src={leaveImg} className="library-empty-image" alt="leave" />
          <p>단어장이 비어있네요..</p>
          <p>하나 만들어볼까요?</p>
          <button onClick={() => setCurrState("createList")}>
            단어장 만들기
          </button>
        </div>
      ) : (
        <div className="library-container">
          {data &&
            data.map((item) => {
              return (
                <div key={item.id} className="library-card">
                  <h2>{item.name}</h2>
                  <p>단어 {item.items.length}개</p>
                  <div className="library-btn-container">
                    {item.items.length > 0 && (
                      <button
                        className="library-btn"
                        onClick={() => handleTest(item.id)}
                      >
                        테스트
                      </button>
                    )}
                    <button
                      className="library-btn"
                      onClick={() => handleEditList(item.id)}
                    >
                      수정
                    </button>
                    <button
                      className="library-btn warning"
                      onClick={() => handleModal(item.id)}
                    >
                      삭제
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
