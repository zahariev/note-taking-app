import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

interface Note {
  id: string;
  title: string;
}

function App() {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([] as Note[]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setNotes((prevList) => {
      return [...prevList, { id: uuidv4(), title: newNote }];
    });
  }

  //   console.log(notes);

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
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
