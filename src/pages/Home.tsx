import { getNotes } from "../utils/localStorage";
import { Link } from "react-router-dom";
import { Note } from "../utils/models";
import styled from "styled-components";

const NoteListContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
`;

const NoteItem = styled.div`
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  }
`;

const NoteTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  color: #007bff;
`;

const NotePreview = styled.p`
  margin: 10px 0;
  color: #555;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  //   &:hover {
  //     text-decoration: underline;
  //   }
`;

const NoteDate = styled.span`
  font-size: 14px;
  color: #888;
  float: right;
`;

function Home() {
  const notes = getNotes();

  return (
    <NoteListContainer>
      Notes:
      {notes.map((note: Note) => (
        <StyledLink key={note.id} to={`/note/${note.id}`}>
          <NoteItem>
            <NoteTitle>
              {note.title}
              <NoteDate>{note.date}</NoteDate>{" "}
            </NoteTitle>
            <NotePreview>{note.content.substring(0, 100)}...</NotePreview>
          </NoteItem>
        </StyledLink>
      ))}
    </NoteListContainer>
  );
}

export default Home;
