import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import SettingsForm, { isValidExtension } from "../SettingsForm";
import userEvent from "@testing-library/user-event";
import SettingsHeader from "../SettingsHeader";

jest.mock("../../../lib/CRUD_Profile.ts");

// Unit Testing

describe("Settings page Rendering", () => {
  it("should render the title", () => {
    render(<SettingsHeader />);
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

describe("Correct File Extension Check", () => {
  it("should return true when file is of correct type", () => {
    const testName = "avatar.png";
    expect(isValidExtension(testName)).toBeTruthy();
  });

  it("should return false when file is of wrong type", () => {
    const testName = "avatar.pdf";
    expect(isValidExtension(testName)).not.toBeTruthy();
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

  it("should submit the form properly", async () => {
    render(<SettingsForm />);
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("Avatar");
    expect(fileInput).toBeInTheDocument();
    await userEvent.upload(fileInput, file);
    const saveButton = screen.getByRole("button");
    fireEvent.click(saveButton);
    const settingsSuccessAlert = screen.getByTestId("settingsSuccessAlert");
    expect(settingsSuccessAlert).toBeInTheDocument();
  });

  it("should not submit the form when wrong file uploaded", async () => {
    render(<SettingsForm />);
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const fileInput = screen.getByLabelText("Avatar");
    expect(fileInput).toBeInTheDocument();
    fireEvent.change(fileInput, { target: { files: [file] } });
    const saveButton = screen.getByRole("button");
    fireEvent.click(saveButton);
    const settingsErrorAlert = screen.getByTestId("settingsErrorAlert");
    expect(settingsErrorAlert).toBeInTheDocument();
  });
});
