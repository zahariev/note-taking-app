import { getNotes } from "../utils/localStorage";
import { Link } from "react-router-dom";
import { Note } from "../utils/models";

function HomePage() {
  const notes = getNotes();

  return (
    <>
      awref
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

export default HomePage;
