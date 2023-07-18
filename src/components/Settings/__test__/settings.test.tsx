import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SettingsForm from "../SettingsForm";
import SettingsPage from "@/app/(User supposed to see if logged in)/settings/page";
import userEvent from "@testing-library/user-event";

// Unit Testing

describe("Settings page Rendering", () => {
  it("should render the title", () => {
    render(<SettingsPage />);
    const summaryTitle = screen.getByRole("heading");
    expect(summaryTitle).toHaveTextContent("Settings");
  });

  it("should render the name input", () => {
    render(<SettingsForm />);
    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toBeInTheDocument();
  });

  it("should render the avatar input", () => {
    render(<SettingsForm />);
    const fileInput = screen.getByLabelText("Avatar");
    expect(fileInput).toBeInTheDocument();
  });

  it("should render the save changes button as disabled", () => {
    render(<SettingsForm />);
    const saveButton = screen.getByRole("button");
    expect(saveButton).toBeDisabled();
  });
});

//Integration Testing

describe("Settings page Functionality", () => {
  it("should enable save changes button when there are changes in name", () => {
    render(<SettingsForm />);
    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toBeInTheDocument();
    fireEvent.change(nameInput, { target: { value: "Tester" } });
    const saveButton = screen.getByRole("button");
    expect(saveButton).not.toBeDisabled();
  });

  it("should enable save changes button when there are changes in file", async () => {
    render(<SettingsForm />);
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("Avatar");
    expect(fileInput).toBeInTheDocument();
    await userEvent.upload(fileInput, file);
    const saveButton = screen.getByRole("button");
    expect(saveButton).not.toBeDisabled();
  });
});
