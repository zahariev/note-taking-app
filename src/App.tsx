import { useState } from "react";

import "./App.css";

function App() {
  const [newItem, setNewItem] = useState("");

    
    function addToDoItem
  return (
    <>
      <form ONSUBMITE className="form">
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
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