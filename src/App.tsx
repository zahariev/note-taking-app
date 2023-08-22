import { useState } from "react";
import { uuid } from "uuidv4";
import "./App.css";

interface Note {
  id: string;
  title: string;
}

function App() {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([] as Note[]);

  function addNote(e: React.FormEvent) {
    e.preventDefault();
    setNotes((prevList) => [...prevList, { id: uuid(), title: newNote }]);
  }

  console.log(notes);

  return (
    <>
      <form onSubmit={addNote} className="form">
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header"> ToDo List</h1>
      <ul className="list">
        <li>
          <label>
            <input type="checkbox" />
            <span>Buy Milk</span>
          </label>
          <button className="btn">Delete</button>
        </li>

        <li>
          <label>
            <input type="checkbox" />
            <span>Buy Milk</span>
          </label>
          <button className="btn">Delete</button>
        </li>
      </ul>
    </>
  );
}

export default App;
