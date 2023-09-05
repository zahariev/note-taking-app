import { useParams } from "react-router-dom";
import { getNotes } from "../utils/localStorage";
import { Note } from "../utils/models";

function NoteDetails() {
  const { id } = useParams();

  const note: Note | undefined = getNotes().find(
    (n: Note) => n.id === Number(id)
  );

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      {/* Additional functionality */}
    </div>
  );
}

export default NoteDetails;
