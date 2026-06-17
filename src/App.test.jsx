import { fireEvent, render, screen, within } from "@testing-library/react";
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

  it("shows matching projects after selecting a project filter", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Product" }));

    const projectGrid = screen.getByText("Signal Desk").closest(".project-grid");

    expect(within(projectGrid).getByText("Signal Desk")).toBeInTheDocument();
    expect(within(projectGrid).queryByText("Quiet Finance")).not.toBeInTheDocument();
  });
});
