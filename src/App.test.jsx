import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "./App.jsx";

describe("App", () => {
  afterEach(() => {
    cleanup();
    delete document.documentElement.dataset.theme;
  });

  it("renders the main personal homepage sections", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /Demo Xiong/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText(/Selected Work/i)).toBeInTheDocument();
    expect(screen.getByText(/Start a Conversation/i)).toBeInTheDocument();
  });

  it("applies the dark theme to the document root", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });
});
