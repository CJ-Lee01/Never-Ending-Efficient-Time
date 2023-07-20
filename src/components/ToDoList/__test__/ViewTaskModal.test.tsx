import ViewTaskModal from '../ViewTaskModal';
import { render, RenderOptions, fireEvent, waitFor, screen, act } from '@testing-library/react'
import tasks from "@/lib/__mocks__/DefaultTaskList";
import { TasksInformation } from '@/lib/types';
import { toDateTimeLocalHTMLString } from '@/lib/GenericHelper';
import TaskContextRenderer from './TaskContextRenderer';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'

jest.mock("../../../lib/CRUD_Tasks")

const taskWithUserID: TasksInformation[] = tasks.map(task => {
  return {
    ...task,
    user_id: "1"
  }
})



const modalContextRender = TaskContextRenderer(ViewTaskModal)

describe("Edit Task Modal", () => {
  describe.each(taskWithUserID)("Rendering the components", (task) => {
    it("Opens a modal with correct values after clicking on the icon", () => {
      const { unmount, getByTestId, queryByTestId } = render(modalContextRender(task))
      const viewButton = getByTestId("ViewTaskIcon")
      fireEvent.click(viewButton, { button: 1 })
      const htmlViewer = queryByTestId("ViewTaskModal")
      expect(htmlViewer).not.toBe(null)
      expect(htmlViewer).toHaveFormValues({
        "Title": task.title,
        "Deadline": toDateTimeLocalHTMLString(task.deadline),
        "Description": task.description
      })
      unmount()
    })
    it("Closes after clicking on close modal button", async () => {
      const { unmount, getByTestId, queryByTestId, getAllByRole } = render(modalContextRender(task))
      const viewButton = getByTestId("ViewTaskIcon")
      fireEvent.click(viewButton, { button: 1 })
      const htmlViewer = queryByTestId("ViewTaskModal")
      const [modalCloseButton, submitButton, cancelButton] = getAllByRole("button")
      fireEvent.click(modalCloseButton, { button: 1 })
      await waitFor(() => {
        expect(htmlViewer).not.toBeVisible()
      })

      expect(htmlViewer).not.toBeVisible()
      unmount()
    })
  })
})