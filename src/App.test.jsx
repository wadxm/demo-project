import { render, screen } from "@testing-library/react";
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
});
