import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/NoteDetails";
import NoteForm from "./components/NoteForm";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/edit">Create note</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/note/:id" element={<Details />} />
        <Route path="/create" element={<NoteForm />} />
        <Route path="/edit/:id" element={<NoteForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
