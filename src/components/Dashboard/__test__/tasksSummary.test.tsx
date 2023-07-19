import {
  fireEvent,
  getAllByTestId,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ToDoSummary, { calculateTaskPercentage } from "../ToDoSummary";

jest.mock("../../../lib/CRUD_Tasks.ts");

// Unit Testing

describe("Tasks Summary Rendering", () => {
  it("should render the title", () => {
    render(<ToDoSummary />);
    const summaryTitle = screen.getByRole("heading");
    expect(summaryTitle).toHaveTextContent("Tasks Summary");
  });

  it("should calculate the correct tasks percentage", () => {
    const percentage = calculateTaskPercentage([4, 3, 1]);
    expect(percentage).toBe(75);
  });
});

// Integration Testing
describe("Tasks Summary Functionality", () => {
  it("should render tasks Summary properly", () => {
    render(<ToDoSummary />);
    const totalTasksText = screen.getByTestId("totalTasksText");
    expect(totalTasksText).toHaveTextContent("You have 4 tasks :");
    const completedTasksText = screen.getByTestId("completedTasksText");
    expect(completedTasksText).toHaveTextContent("3");
    const incompleteTasksText = screen.getByTestId("incompleteTasksText");
    expect(incompleteTasksText).toHaveTextContent("1");
  });
});
