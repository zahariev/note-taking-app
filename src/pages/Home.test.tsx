import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Home from "./Home";
import "@testing-library/jest-dom";
import { getNotes } from "../utils/localStorage";

jest.mock("../utils/localStorage", () => ({
  getNotes: jest.fn(),
}));

describe("Home", () => {
  afterEach(() => {
    (getNotes as jest.Mock).mockClear();
  });

  it("renders the list of notes", () => {
    (getNotes as jest.Mock).mockReturnValue([
      {
        id: "12345",
        title: "Test Note 1",
        content: "Test Content 1",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
      {
        id: "67890",
        title: "Test Note 2",
        content: "Test Content 2",
        createdAt: new Date("2023-01-03"),
        updatedAt: new Date("2023-01-04"),
      },
    ]);

    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText("Test Note 1")).toBeInTheDocument();
    expect(screen.getByText("Test Note 2")).toBeInTheDocument();
  });

  it("renders notes sorted by updatedAt in descending order", () => {
    (getNotes as jest.Mock).mockReturnValue([
      {
        id: "12345",
        title: "Test Note 1",
        content: "Test Content 1",
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      },
      {
        id: "67890",
        title: "Test Note 2",
        content: "Test Content 2",
        createdAt: new Date("2023-01-03"),
        updatedAt: new Date("2023-01-04"),
      },
    ]);

    render(
      <Router>
        <Home />
      </Router>
    );

    const notes = screen.getAllByText(/Test Note \d+/);
    expect(notes[0]).toHaveTextContent("Test Note 2");
    expect(notes[1]).toHaveTextContent("Test Note 1");
  });

  it("renders correct links to note details", () => {
    (getNotes as jest.Mock).mockReturnValue([
      {
        id: "12345",
        title: "Test Note 1",
        content: "Test Content 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    render(
      <Router>
        <Home />
      </Router>
    );

    const link = screen.getByRole("link", { name: /Test Note 1/ });
    expect(link).toHaveAttribute("href", "/note/12345");
  });

  it("renders preview of note capped at 100 characters", () => {
    (getNotes as jest.Mock).mockReturnValue([
      {
        id: "12345",
        title: "Test Note 1",
        content: "A".repeat(200),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    render(
      <Router>
        <Home />
      </Router>
    );

    const preview = screen.getByText(/A{100}\.{3}$/); // RegEx for 100 A's followed by 3 dots
    expect(preview).toBeInTheDocument();
  });

  it("renders message if no notes are available", () => {
    (getNotes as jest.Mock).mockReturnValue([]);

    render(
      <Router>
        <Home />
      </Router>
    );

    expect(
      screen.getByText("No notes available. Please add a new note.")
    ).toBeInTheDocument();
  });
});
