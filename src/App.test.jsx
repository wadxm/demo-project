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

  it("shows projects after selecting each category filter", () => {
    render(<App />);

    const projectFilters = screen.getByLabelText("Project filters");

    fireEvent.click(within(projectFilters).getByRole("button", { name: "Product" }));
    expect(screen.getByRole("heading", { name: "Signal Desk" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Quiet Finance" })).not.toBeInTheDocument();

    fireEvent.click(within(projectFilters).getByRole("button", { name: "Brand" }));
    expect(screen.getByRole("heading", { name: "Quiet Finance" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Signal Desk" })).not.toBeInTheDocument();

    fireEvent.click(within(projectFilters).getByRole("button", { name: "Prototype" }));
    expect(screen.getByRole("heading", { name: "Canvas Ops" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Quiet Finance" })).not.toBeInTheDocument();
  });
});
