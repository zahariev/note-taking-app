// src/pages/CreateEditNotePage.tsx

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createNote, getNotes, updateNote } from "../utils/localStorage";
import { Note } from "../utils/models";
import styled from "styled-components";
import Button from "../components/Button";
import ButtonsContainer from "../components/ButtonsContainer";
import ButtonBack from "../components/ButtonBack";

import ConfirmationDialog from "../components/ConfirmationDialog";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid #e1e1e1;
  background-color: #fff;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  margin-bottom: 8px;
  color: #333;
  background-color: #fff;
`;

const StyledInput = styled.input`
  padding: 10px 15px;
  margin-bottom: 20px;
  margin-left: 25px;
  border: 1px solid grey;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
`;

const StyledTextArea = styled.textarea`
  padding: 10px 15px;
  margin-bottom: 20px;
  border: 1px solid grey;
  border-radius: 4px;
  font-size: 16px;
  height: 200px;
  resize: vertical;
  background-color: #fff;
  color: #333;
`;

const CreateEditNote: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const existingNote: Note | undefined = id
    ? getNotes().find((n: Note) => n.id === id)
    : undefined;

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(existingNote?.title || "");
  const [content, setContent] = useState<string>(existingNote?.content || "");
  const [hasChanges, setHasChanges] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasChanges(true);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    setHasChanges(true);
  };

  const handleBack = () => {
    if (!hasChanges) navigate(-1);
    else confirmBack();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title cannot be empty");
      return;
    }

    const note: Note = {
      id: id || Date.now().toString(),
      title,
      content,
      createdAt: existingNote?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (id) updateNote(note);
    else createNote(note);
    navigate("/");
  };

  const confirmBack = () => {
    setShowDialog(true);
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <StyledLabel htmlFor="noteTitle">Title:</StyledLabel>
          <StyledInput
            type="text"
            id="noteTitle"
            data-testid="email-input"
            value={title}
            onChange={(e) => handleTitleChange(e)}
            required
          />
        </div>
        <div>
          <StyledLabel>Content:</StyledLabel>
          <StyledTextArea
            value={content}
            onChange={(e) => handleNoteChange(e)}
          ></StyledTextArea>
        </div>
        <ButtonsContainer styleProps={{ margin: "10px", maxWidth: "260px" }}>
          <Button type="submit">{id ? "Update Note" : "Create Note"} </Button>
          <ButtonBack type="button" onClick={handleBack}>
            Back
          </ButtonBack>
        </ButtonsContainer>
      </StyledForm>
      {showDialog && (
        <ConfirmationDialog
          message="Are you sure you want to cancel changes?"
          onConfirm={() => navigate("/")}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </FormContainer>
  );
};

export default CreateEditNote;
