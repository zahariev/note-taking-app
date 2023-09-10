// src/pages/NoteDetailPage.tsx

import { useParams, useNavigate } from "react-router-dom";
import { getNotes, deleteNote } from "../utils/localStorage";
import { Note } from "../utils/models";
import styled from "styled-components";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useState } from "react";
import Button from "../components/Button";
import ButtonsContainer from "../components/ButtonsContainer";
import ButtonDanger from "../components/ButtonDanger";
import NoteHeader from "../components/NoteHeader";
import ButtonBack from "../components/ButtonBack";

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid #e1e1e1;
`;

const Content = styled.p`
  font-size: 18px;
  margin-bottom: 24px;
`;

const NoteDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const note: Note | undefined = getNotes().find((n: Note) => n.id === id);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  if (!note) {
    return <div>Note not found</div>;
  }

  const handleDelete = () => {
    deleteNote(id || "");
    navigate("/");
  };

  const confirmDelete = () => {
    setShowDialog(true);
  };

  return (
    <DetailContainer>
      <NoteHeader note={note} />
      <Content>{note.content}</Content>
      <ButtonsContainer styleProps={{ margin: "10px", maxWidth: "260px" }}>
        <ButtonBack onClick={() => navigate(-1)} style={{ width: "50px" }}>
          &lt;
        </ButtonBack>

        <Button onClick={() => navigate(`/edit/${id}`)}>Edit</Button>
        <ButtonDanger onClick={confirmDelete}>Delete</ButtonDanger>
      </ButtonsContainer>
      {showDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this note?"
          onConfirm={handleDelete}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </DetailContainer>
  );
};

export default NoteDetailPage;
