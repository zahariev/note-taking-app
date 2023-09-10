import {
  useParams,
  MemoryRouter as Router,
  useNavigate,
} from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("../utils/localStorage", () => ({
  getNotes: jest.fn(),
  createNote: jest.fn(),
  deleteNote: jest.fn(),
}));

import { getNotes, deleteNote } from "../utils/localStorage";
import { fireEvent, render, screen } from "@testing-library/react";
import NoteDetailPage from "./NoteDetails";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => jest.fn()),
  useNavigate: jest.fn(() => jest.fn()), // this mock returns a function which is a mock itself
}));

describe("NoteDetailPage", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    (deleteNote as jest.Mock).mockReset();
    navigate.mockClear(); // Clear previous mock history
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

  it("renders the details of a note", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "12345" });

    (getNotes as jest.Mock).mockReturnValue([
      {
        id: "12345",
        title: "Test Note",
        content: "Test Content",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    render(
      <Router initialEntries={["/edit/12345"]}>
        <NoteDetailPage />
      </Router>
    );

    expect(screen.getByText("Test Note")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it('shows "Note not found" when a note does not exist', () => {
    (useParams as jest.Mock).mockReturnValue({ id: "99999" });
    (getNotes as jest.Mock).mockReturnValue([]);

    render(
      <Router>
        <NoteDetailPage />
      </Router>
    );

    expect(screen.getByText("Note not found")).toBeInTheDocument();
  });

  it('navigates to the edit page on "Edit" button click', () => {
    (useParams as jest.Mock).mockReturnValue({ id: "12345" });
    (getNotes as jest.Mock).mockReturnValue([
      {
        id: "12345",
        title: "Test Note",
        content: "Test Content",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    render(
      <Router>
        <NoteDetailPage />
      </Router>
    );

    fireEvent.click(screen.getByText("Edit"));

    expect(navigate).toHaveBeenCalledWith("/edit/12345");
  });

  it('shows confirmation dialog on "Delete" button click', () => {
    (useParams as jest.Mock).mockReturnValue({ id: "12345" });
    (getNotes as jest.Mock).mockReturnValue([
      {
        id: "12345",
        title: "Test Note",
        content: "Test Content",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    render(
      <Router>
        <NoteDetailPage />
      </Router>
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(
      screen.getByText("Are you sure you want to delete this note?")
    ).toBeInTheDocument();
  });

  it("deletes note and navigates to home on delete confirmation", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "12345" });
    (getNotes as jest.Mock).mockReturnValue([
      {
        id: "12345",
        title: "Test Note",
        content: "Test Content",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    render(
      <Router>
        <NoteDetailPage />
      </Router>
    );

    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("Yes")); // Assuming your confirmation button has the text 'Confirm'

    expect(deleteNote).toHaveBeenCalledWith("12345");
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("deletes note and navigates back on cancel", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "12345" });
    (getNotes as jest.Mock).mockReturnValue([
      {
        id: "12345",
        title: "Test Note",
        content: "Test Content",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    render(
      <Router>
        <NoteDetailPage />
      </Router>
    );

    fireEvent.click(screen.getByText("Delete"));
    fireEvent.click(screen.getByText("No")); // Assuming your confirmation button has the text 'Confirm'

    expect(deleteNote).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalledWith("/");
  });
});
