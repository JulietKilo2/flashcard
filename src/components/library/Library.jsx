import React, { useState } from "react";
import "./Library.scss";

export default function Library({
  data,
  setData,
  setModal,
  setCurrState,
  setEditListFlag,
  setEditListID,
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
    // localStorage.setItem("data", [JSON.stringify(newData)]); // localStorage 덮어씌우기
    setData(newData); // data state 변경
    handleCancel(); // 삭제관련 UI 초기화
  };

  return (
    <div>
      <h1>라이브러리</h1>
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
      <div className="library-container">
        {data &&
          data.map((item) => {
            return (
              <div key={item.id} className="library-card">
                <h2>{item.name}</h2>
                <p>단어 {item.items.length}개</p>
                <div className="library-btn-container">
                  <button className="library-btn">테스트</button>
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
    </div>
  );
}
