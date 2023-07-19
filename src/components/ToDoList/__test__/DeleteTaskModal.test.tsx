import DeleteTaskModal from '../DeleteTaskModal';
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

const modalContextRender = TaskContextRenderer(DeleteTaskModal)

describe("Edit Task Modal", () => {
  describe.each(taskWithUserID)("Rendering the components", (task) => {
    it("Opens a confirmation after clicking on the icon", () => {
      const { unmount, getByTestId, queryByTestId } = render(modalContextRender(task))
      const deleteButton = getByTestId("DeleteTaskIcon")
      fireEvent.click(deleteButton, { button: 1 })
      const htmlModal = queryByTestId("DeleteConfirmationModal")
      expect(htmlModal).not.toBe(null)
      unmount()
    })
    it("Closes after clicking on close modal", async () => {
      const { unmount, getByTestId, queryByTestId, getAllByRole } = render(modalContextRender(task))
      const deleteButton = getByTestId("DeleteTaskIcon")
      fireEvent.click(deleteButton, { button: 1 })
      const htmlModal = getByTestId("DeleteConfirmationModal")
      const [modalCloseButton, confirmButton, cancelButton] = getAllByRole("button")
      fireEvent.click(modalCloseButton, { button: 1 })
      await waitFor(() => {
        expect(htmlModal).not.toBeInTheDocument()
      })
      unmount()
    })
    it("Closes after clicking on Cancel", async () => {
      const { unmount, getByTestId, queryByTestId, getAllByRole } = render(modalContextRender(task))
      const deleteButton = getByTestId("DeleteTaskIcon")
      fireEvent.click(deleteButton, { button: 1 })
      const htmlModal = getByTestId("DeleteConfirmationModal")
      const [modalCloseButton, confirmButton, cancelButton] = getAllByRole("button")
      fireEvent.click(cancelButton, { button: 1 })
      await waitFor(() => {
        expect(htmlModal).not.toBeInTheDocument()
      })
      unmount()
    })
    it("Closes after clicking confirm button", async () => {
      const { unmount, getByTestId, queryByTestId, getAllByRole } = render(modalContextRender(task))
      const deleteButton = getByTestId("DeleteTaskIcon")
      fireEvent.click(deleteButton, { button: 1 })
      const htmlModal = getByTestId("DeleteConfirmationModal")
      const [modalCloseButton, confirmButton, cancelButton] = getAllByRole("button")
      fireEvent.click(confirmButton, { button: 1 })
      await waitFor(() => {
        expect(htmlModal).not.toBeInTheDocument()
      })
      unmount()
    })
  })
})