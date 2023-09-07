// src/pages/CreateEditNotePage.tsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNotes, setNote } from "../utils/localStorage";
import { Note } from "../utils/models";
import styled from "styled-components";
import Button from "../components/button";
import ButtonsContainer from "../components/ButtonsContainer";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #e1e1e1;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
  padding: 10px 15px;
  margin-bottom: 20px;
  border: 1px solid grey;
  border-radius: 4px;
  font-size: 16px;
`;

const StyledTextArea = styled.textarea`
  padding: 10px 15px;
  margin-bottom: 20px;
  border: 1px solid grey;
  border-radius: 4px;
  font-size: 16px;
  height: 200px;
  resize: vertical;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CreateEditNote: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      const noteToEdit: Note | undefined = getNotes().find(
        (n: Note) => n.id === id
      );
      if (noteToEdit) {
        setTitle(noteToEdit.title);
        setContent(noteToEdit.content);
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title cannot be empty");
      return;
    }

    const newNote: Note = {
      id: id || Date.now().toString(),
      title,
      content,
      date: new Date().toLocaleDateString(),
    };

    setNote(newNote);
    navigate("/");
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <StyledLabel>Title:</StyledLabel>
          <StyledInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <StyledLabel>Content:</StyledLabel>
          <StyledTextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></StyledTextArea>
        </div>
        <ButtonsContainer styleProps={{ margin: "10px", maxWidth: "260px" }}>
          <StyledButton type="submit">
            {id ? "Update Note" : "Create Note"}
          </StyledButton>
          <Button onClick={() => navigate("/")} backgroundColor="grey">
            Back
          </Button>
        </ButtonsContainer>
      </StyledForm>
    </FormContainer>
  );
};

export default CreateEditNote;
