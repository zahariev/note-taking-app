import { getNotes } from "../utils/localStorage";
import { Link } from "react-router-dom";
import { Note } from "../utils/models";

function Home() {
  const notes = getNotes();

  return (
    <>
      <h3>Notes</h3>
      <div>
        {notes.map((note: Note) => (
          <Link key={note.id} to={`/note/${note.id}`}>
            <h2>{note.title}</h2>
            <p>{note.content.substring(0, 100)}...</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Home;
