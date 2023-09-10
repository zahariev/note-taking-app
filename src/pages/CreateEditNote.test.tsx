jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(() => jest.fn()), // this mock returns a function which is a mock itself
}));

import { fireEvent, render } from "@testing-library/react";
import CreateEditNote from "./CreateEditNote";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

describe("<CreateEditNote />", () => {
  // Test 1: Initial render
  it("renders without crashing", () => {
    const { getByLabelText } = render(
      <Router>
        <CreateEditNote />
      </Router>
    );
    const titleInput = getByLabelText(/title:/i);
    const contentInput = getByLabelText(/content:/i);
    // const contentInput = screen.getByLabelText(/content:/i);
    expect(titleInput).toBeInTheDocument();
    expect(contentInput).toBeInTheDocument();
  });

  // Test 2: Type in Inputs
  it("updates input value on change", () => {
    const { getByTestId } = render(
      <Router>
        <CreateEditNote />{" "}
      </Router>
    );
    const input = getByTestId("email-input");

    fireEvent.change(input, { target: { value: "My New Note" } });
    expect((input as HTMLInputElement).value).toBe("My New Note");
  });

  // Test 3: Button Interactions - Mocking the useNavigate hook is tricky, so we'll keep it simple
  it("shows confirmation dialog when Back is clicked with changes", () => {
    const { getByText, getByLabelText } = render(
      <Router>
        <CreateEditNote />
      </Router>
    );
    const titleInput = getByLabelText(/title:/i) as HTMLInputElement;
    const backButton = getByText(/back/i);

    fireEvent.change(titleInput, { target: { value: "My New Note" } });
    fireEvent.click(backButton);

    const confirmationDialog = getByText(
      /Are you sure you want to cancel changes?/i
    );
    expect(confirmationDialog).toBeInTheDocument();
  });

  // ... You can add more tests based on the interactions and assertions you want
});
