jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(() => jest.fn()), // this mock returns a function which is a mock itself
}));
jest.mock("../utils/localStorage");
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import CreateEditNote from "./CreateEditNote";
import { MemoryRouter as Router } from "react-router-dom";
import { createNote } from "../utils/localStorage";

import "@testing-library/jest-dom";

describe("<CreateEditNote />", () => {
  beforeEach(() => {
    render(
      <Router>
        <CreateEditNote />
      </Router>
    );
  });
  // Test 1: Initial render
  it("renders without crashing", () => {
    const titleInput = screen.getByLabelText(/title:/i);
    const contentInput = screen.getByLabelText(/content:/i);
    // const contentInput = screen.getByLabelText(/content:/i);
    expect(titleInput).toBeInTheDocument();
    expect(contentInput).toBeInTheDocument();
  });

  // Test 2: Type in Inputs
  it("updates input value on change", () => {
    const input = screen.getByTestId("email-input");

    fireEvent.change(input, { target: { value: "My New Note" } });
    expect((input as HTMLInputElement).value).toBe("My New Note");
  });

  // Test 3: Button Interactions - Mocking the useNavigate hook is tricky, so we'll keep it simple
  it("shows confirmation dialog when Back is clicked with changes", () => {
    const titleInput = screen.getByLabelText(/title:/i) as HTMLInputElement;
    const backButton = screen.getByText(/back/i);

    fireEvent.change(titleInput, { target: { value: "My New Note" } });
    fireEvent.click(backButton);

    const confirmationDialog = screen.getByText(
      /Are you sure you want to cancel changes?/i
    );
    expect(confirmationDialog).toBeInTheDocument();
  });

  it("creates a new note on submit", async () => {
    const titleInput = screen.getByLabelText(/title:/i);
    const contentTextArea = screen.getByLabelText(/content:/i);
    const submitButton = screen.getByText(/create note/i);

    fireEvent.change(titleInput, { target: { value: "My New Note" } });
    fireEvent.change(contentTextArea, {
      target: { value: "Some content for the note" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createNote).toHaveBeenCalledWith({
        id: expect.any(String),
        title: "My New Note",
        content: "Some content for the note",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });
});
