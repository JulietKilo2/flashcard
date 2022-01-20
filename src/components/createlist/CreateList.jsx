import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import "./CreateList.scss";
import EditModal from "./EditModal";
import EditTitle from "./EditTitle";
import ItemList from "./ItemList";

export default function CreateList({
  data,
  setData,
  setModal,
  setCurrState,
  editListFlag,
  editListID,
}) {
  const [title, setTitle] = useState("New List");
  const [editTitle, setEditTitle] = useState(false);
  const [list, setList] = useState([]);
  const [newWord, setNewWord] = useState({ word: "", def: "" });
  const [editMode, setEditMode] = useState(false);
  const [editWord, setEditWord] = useState({ word: "", def: "" });
  const [editFlag, setEditFlag] = useState(editListFlag);
  const [editID, setEditID] = useState(editListID);

  const saveData = () => {
    if (!editFlag) {
      // if edit mode flag is off, create a new list of words
      if (data === null) {
        // if the local storage is empty, create a new dataset
        const newDataSet = [{ name: title, id: uuid(), items: list }];
        setData(newDataSet);
        setCurrState("library");
      } else {
        // if the local storage alrady exists, then add the new list to the existing storage dataset
        const newData = { name: title, id: uuid(), items: list };
        const oldData = [...data];
        const updateData = oldData.concat(newData);
        setData(updateData);
        setCurrState("library");
      }
    } else {
      // if edit mode flag is on, execute the following lines
      let newData = { name: title, id: editID, items: list };
      const oldData = [...data];
      const modified = oldData.map((list) => {
        if (list.id === editID) {
          return (list = newData);
        } else {
          return list;
        }
      });
      setData(modified);
      setEditID("");
      setCurrState("library");
    }
  };

  const handleChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    if (!editMode) {
      // if edit mode is off, then create a new word
      setNewWord({ ...newWord, [target]: value });
    } else if (editMode) {
      // if edit mode is on, then change the targt word
      setEditWord({ ...editWord, [target]: value });
    }
    return;
  };

  const handleSubmit = (e) => {
    // add a new word
    e.preventDefault();
    const newItem = { ...newWord, id: uuid() };
    const newList = [...list, newItem];
    setList(newList);
    setNewWord({ word: "", def: "" });
  };

  const handleDelete = (id) => {
    // remove a word from the list
    const newList = list.filter((item) => {
      if (item.id !== id) {
        return item;
      }
      return;
    });
    setList(newList);
  };

  const handleEditMode = (id) => {
    if (!editMode) {
      setEditMode(true);
      setModal(true);
      const target = list.filter((item) => item.id === id);
      setEditWord(...target);
    } else {
      setEditMode(false);
    }
  };

  const handleEdit = (e) => {
    // apply the changes made from the edit mode
    e.preventDefault();
    const id = editWord.id;
    const indexOfItem = list.findIndex((item) => item.id === id);
    const newList = [...list];
    newList.splice(indexOfItem, 1, editWord);
    setList(newList);
    setEditMode(false);
  };

  useEffect(() => {
    // resets all relevant states tied with editing mode
    if (!editMode) {
      setModal(false);
      setEditWord({ word: "", def: "" });
    }
    return;
  }, [editMode]);

  useEffect(() => {
    // checks if the edit mode flag is on
    if (editFlag) {
      // if the edit mode flag is on, insert targted list data
      const localData = data;
      const listToEdit = localData.filter((list) => {
        return list.id === editID;
      });
      setTitle(listToEdit[0].name);
      setList(listToEdit[0].items);
    }
    return;
  }, [editFlag]);

  return (
    <div className="container">
      {editMode && (
        <EditModal
          editWord={editWord}
          handleEdit={handleEdit}
          handleChange={handleChange}
          setEditMode={setEditMode}
        />
      )}
      <EditTitle
        title={title}
        setTitle={setTitle}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
      />
      <ItemList
        list={list}
        handleDelete={handleDelete}
        handleEditMode={handleEditMode}
      />
      <h2>Add</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-items">
          <label htmlFor="name">
            <b>Word</b>
          </label>
          <input
            type="text"
            value={newWord.word}
            name="word"
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-items">
          <label htmlFor="def">
            <b>Def</b>
          </label>
          <input
            type="text"
            value={newWord.def}
            name="def"
            onChange={handleChange}
            required={true}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      <button className="btn-confirm" onClick={saveData}>
        {editFlag ? "Save Changes" : "Save"}
      </button>
    </div>
  );
}
