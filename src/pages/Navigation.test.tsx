import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Navigation from "./Navigation";
import "@testing-library/jest-dom";

// Mock the Outlet component
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: jest.fn(() => <div data-testid="router-outlet"></div>),
}));

describe("Navigation", () => {
  beforeEach(() => {
    render(
      <Router>
        <Navigation />
      </Router>
    );
  });

  it("renders the app logo pointing to the root URL", () => {
    const logoLink = screen.getByRole("link", { name: "App Logo" });
    expect(logoLink).toHaveAttribute("href", "/");
    expect(logoLink).toContainElement(screen.getByAltText("App Logo"));
  });

  it("has a title 'Note app'", () => {
    const title = screen.getByText("Note app");
    expect(title).toBeInTheDocument();
  });

  it("renders a link labeled 'Home' pointing to the root URL", () => {
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders a link labeled 'Create Note' pointing to the '/create' URL", () => {
    const createLink = screen.getByRole("link", { name: "Create Note" });
    expect(createLink).toHaveAttribute("href", "/create");
  });

  it("renders an outlet for nested routes", () => {
    // Assuming Outlet is simply a placeholder, you can check if it's rendered
    const outlet = screen.getByTestId("router-outlet");
    expect(outlet).toBeInTheDocument();
  });
});
