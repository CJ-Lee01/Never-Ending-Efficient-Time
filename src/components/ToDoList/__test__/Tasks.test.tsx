import Tasks from "../Tasks";
import tasks from "@/lib/__mocks__/DefaultTaskList";
import { TasksInformation } from "@/lib/types";
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import { render } from "@testing-library/react";

jest.mock("../../../lib/CRUD_Tasks")

describe("Testing list of tasks rendering", () => {
  it("Contains same number of cards as length of task list", () => {
    const { unmount, getAllByTestId } = render(<Tasks />)
    const htmlArray = getAllByTestId("ViewTaskIcon")
    expect(htmlArray.length).toBe(tasks.length)
  })
})