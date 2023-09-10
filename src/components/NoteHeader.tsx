import styled from "styled-components";
import { Note } from "../utils/models";
import { format } from "date-fns";

interface NoteTitleProps {
  note: Note;
}

const NoteTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #235565;
`;

const NoteDate = styled.span`
  font-size: 14px;
  color: #888;
  float: right;
`;
const NoteHeader: React.FC<NoteTitleProps> = ({ note }) => {
  return (
    <NoteTitle>
      {note.title}
      <NoteDate>
        {format(new Date(note.updatedAt), "dd/MM/yyyy HH:mm")}
      </NoteDate>{" "}
    </NoteTitle>
  );
};

export default NoteHeader;
