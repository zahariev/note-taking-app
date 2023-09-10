jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => jest.fn()),
  useNavigate: jest.fn(() => jest.fn()), // this mock returns a function which is a mock itself
}));

jest.mock("../utils/localStorage", () => ({
  getNotes: jest.fn(),
  createNote: jest.fn(),
  updateNote: jest.fn(),
}));
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import CreateEditNote from "./CreateEditNote";
import { MemoryRouter, useParams } from "react-router-dom";
import { createNote, getNotes, updateNote } from "../utils/localStorage";

import "@testing-library/jest-dom";

describe("<CreateEditNote />", () => {
  beforeEach(() => {
    (createNote as jest.Mock).mockReset();
    (updateNote as jest.Mock).mockReset();

    // if (browser.name !== "submitting the form updates a note") {
    render(
      <MemoryRouter>
        <CreateEditNote />
      </MemoryRouter>
    );
    // }
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

test("submitting the form updates a note", async () => {
  (useParams as jest.Mock).mockReturnValue({ id: "123" });
  (getNotes as jest.MockedFunction<typeof getNotes>).mockReturnValue([
    {
      id: "123",
      title: "Existing Note Title",
      content: "Existing Note Content",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  // Initial render with a specific note ID (this is an example, you should replace '123' with an actual ID)
  render(
    <MemoryRouter initialEntries={["/edit/123"]}>
      <CreateEditNote />
    </MemoryRouter>
  );

  const titleInput = screen.getByTestId("email-input");
  const contentTextArea = screen.getByLabelText(/content:/i);

  // Simulating user input
  fireEvent.change(titleInput, { target: { value: "Updated Note Title" } });
  fireEvent.change(contentTextArea, {
    target: { value: "Updated note content" },
  });

  // Simulating form submission
  const form = screen.getByTestId("note-form"); // Note: You'd need to add data-testid="note-form" to your form in the component
  fireEvent.submit(form);

  //   const submitButton = screen.getByText(/update note/i);
  //   fireEvent.click(submitButton);

  // Expecting the updateNote function to be called with the updated note
  expect(updateNote).toHaveBeenCalledWith({
    id: "123",
    title: "Updated Note Title",
    content: "Updated note content",
    createdAt: expect.any(Date), // If you have an actual date, replace `expect.any(Date)` with it
    updatedAt: expect.any(Date),
  });
});
