import TaskComponent from "../TaskComponent";
import { render, RenderOptions } from '@testing-library/react'
import tasks from "@/lib/__mocks__/DefaultTaskList";
import TaskContextRenderer from "./TaskContextRenderer";
import { TasksInformation } from "@/lib/types";
import { toDateTimeLocalHTMLString } from "@/lib/GenericHelper";
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'

jest.mock("../../../lib/CRUD_Tasks")
typeof import("../../../lib/CRUD_Tasks") //this is used to verify that the module exists.

const taskWithUserID: TasksInformation[] = tasks.map(task => {
  return {
    ...task,
    user_id: "1"
  }
})

const TaskCardRenderer = TaskContextRenderer(TaskComponent)
const displayDate = (task: TasksInformation) => task.deadline.valueOf() == (new Date("9999-12-12").valueOf())
    ? "No deadline"
    : task.deadline.toLocaleString();
describe("Testing Task Components", () => {
  describe.each(taskWithUserID)("Rendering the components", (task) => {
    it("Contains view, delete and edit components.", () => {
      const { unmount, getByTestId } = render(TaskCardRenderer(task))
      const viewButton = getByTestId("ViewTaskIcon")
      const editButton = getByTestId("EditTaskIcon")
      const deleteButton = getByTestId("DeleteTaskIcon")
      unmount()
      expect(true).toBe(true) //if cannot find the buttons, will throw error.
    })
    describe("Displaying correct values", () => {
      it("Shows correct title", () => {
        const { unmount, getByText } = render(TaskCardRenderer(task))
        const htmlElem = getByText(task.title)
        expect(htmlElem).toBeInTheDocument()
        unmount()
      })
      it("Shows correct deadline", () => {
        const { unmount, getByText } = render(TaskCardRenderer(task))
        const htmlElem = getByText(/Deadline:/)
        expect(htmlElem).toHaveTextContent(`Deadline: ${displayDate(task)}`)
        unmount()
      })
      it("Shows correct done status", () => {
        const { unmount, getByRole } = render(TaskCardRenderer(task))
        const htmlElem = getByRole("checkbox")
        task.is_complete 
        ? expect(htmlElem).toBeChecked()
        : expect(htmlElem).not.toBeChecked()
        
        unmount()
      })
    })
  })
})