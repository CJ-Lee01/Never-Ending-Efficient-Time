import {
  fireEvent,
  getAllByTestId,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ToDoSummary from "../ToDoSummary";

// Unit Testing

describe("Tasks Summary Rendering", () => {
  it("should render the title", () => {
    render(<ToDoSummary />);
    const summaryTitle = screen.getByRole("heading");
    expect(summaryTitle).toHaveTextContent("Tasks Summary");
  });
});
