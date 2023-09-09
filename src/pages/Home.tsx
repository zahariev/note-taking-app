import { getNotes } from "../utils/localStorage";
import { Link } from "react-router-dom";
import { Note } from "../utils/models";
import styled from "styled-components";
import { format } from "date-fns";
import NoteHeader from "../components/NoteHeader";

const NoteListContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
`;

const NoteItem = styled.div`
  border: 1px solid #e1e1e1;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  }
`;

const NotePreview = styled.p`
  margin: 10px 0;
  color: #555;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function Home() {
  const notes = getNotes().sort((a: Note, b: Note) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <NoteListContainer>
      Notes:
      {notes.map((note: Note) => (
        <StyledLink key={note.id} to={`/note/${note.id}`}>
          <NoteItem>
            <NoteHeader note={note} />
            <NotePreview>{note.content.substring(0, 100)}...</NotePreview>
          </NoteItem>
        </StyledLink>
      ))}
      {notes.length === 0 ? (
        <p>No notes available. Please add a new note.</p>
      ) : null}
    </NoteListContainer>
  );
}

export default Home;
