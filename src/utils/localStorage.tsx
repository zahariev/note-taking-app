import { Note } from "./models";

export const getNotes = () => {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
};

export const updateNote = (updatedNote: Note) => {
  // Get the existing notes from local storage
  const existingNotes = JSON.parse(localStorage.getItem("notes") || "[]");

  // Find the index of the note we want to update
  const noteIndex = existingNotes.findIndex(
    (note: Note) => note.id === updatedNote.id
  );

  // If the note was found, update it
  if (noteIndex !== -1) {
    existingNotes[noteIndex] = updatedNote;

    // Save the updated notes back to local storage
    localStorage.setItem("notes", JSON.stringify(existingNotes));
  }
};

export const createNote = (note: Note) => {
  // Get the existing notes from local storage
  const existingNotes = JSON.parse(localStorage.getItem("notes") || "[]");

  // Add the new note to the existing notes array
  existingNotes.push(note);
  // Save the updated notes back to local storage
  localStorage.setItem("notes", JSON.stringify(existingNotes));
};

export const deleteNote = (id: string) => {
  let notes = getNotes();
  notes = notes.filter((note: Note) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes));
};
