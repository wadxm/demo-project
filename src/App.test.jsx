import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App.jsx";

describe("App", () => {
  it("renders the main personal homepage sections", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /Demo Xiong/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText(/Selected Work/i)).toBeInTheDocument();
    expect(screen.getByText(/Start a Conversation/i)).toBeInTheDocument();
  });

  it("applies the dark theme when the theme toggle is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(document.body).not.toHaveAttribute("data-theme");
  });
});
