import { Note } from "./models";

export const getNotes = () => {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
};

export const setNote = (note: Note) => {
  const notes = getNotes();
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
};

export const deleteNote = (id: string) => {
  let notes = getNotes();
  notes = notes.filter((note: Note) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes));
};
