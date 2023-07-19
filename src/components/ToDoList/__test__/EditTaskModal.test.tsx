import EditTaskModal from '../EditTaskModal';
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



const modalContextRender = TaskContextRenderer(EditTaskModal)

describe("Edit Task Modal", () => {
  describe.each(taskWithUserID)("Rendering the components", (task) => {
    it("Opens a form modal with correct values after clicking on the icon", () => {
      const { unmount, getByTestId, queryByTestId } = render(modalContextRender(task))
      const editButton = getByTestId("EditTaskIcon")
      fireEvent.click(editButton, { button: 1 })
      const htmlForm = queryByTestId("EditTaskForm")
      expect(htmlForm).not.toBe(null)
      expect(htmlForm).toHaveFormValues({
        "Title": task.title,
        "Deadline": toDateTimeLocalHTMLString(task.deadline),
        "Description": task.description
      })
      unmount()
    })
    it("Closes after clicking on close modal button", async () => {
      const { unmount, getByTestId, queryByTestId, getAllByRole } = render(modalContextRender(task))
      const editButton = getByTestId("EditTaskIcon")
      fireEvent.click(editButton, { button: 1 })
      const htmlForm = queryByTestId("EditTaskForm")
      const [modalCloseButton, submitButton, cancelButton] = getAllByRole("button")
      fireEvent.click(modalCloseButton, { button: 1 })
      await waitFor(() => {
        expect(htmlForm).not.toBeVisible()
      })

      expect(htmlForm).not.toBeVisible()
      unmount()
    })
    it("Closes after clicking on Cancel", async () => {
      const { unmount, getByTestId, queryByTestId, getAllByRole } = render(modalContextRender(task))
      const editButton = getByTestId("EditTaskIcon")
      fireEvent.click(editButton, { button: 1 })
      const htmlForm = queryByTestId("EditTaskForm")
      const [modalCloseButton, submitButton, cancelButton] = getAllByRole("button")
      fireEvent.click(cancelButton, { button: 1 })
      await waitFor(() => {
        expect(htmlForm).not.toBeVisible()
      })
      unmount()
    })
    it("Closes after clicking submit button", async () => {
      const { unmount, getByTestId, queryByTestId, getAllByRole } = render(modalContextRender(task))
      const editButton = getByTestId("EditTaskIcon")
      fireEvent.click(editButton, { button: 1 })
      const htmlForm = queryByTestId("EditTaskForm")
      const [modalCloseButton, submitButton, cancelButton] = getAllByRole("button")
      fireEvent.click(submitButton, { button: 1 })
      await waitFor(() => {
        expect(htmlForm).not.toBeVisible()
      })
      unmount()
    })
  })
  /* test.each(taskWithUserID)("Fields show the correct values", async (task) => {
    const { findAllByRole, getByTestId } = render(modalContextRender(task))
    const editButton = getByTestId("EditTaskIcon")
    fireEvent.click(editButton, { button: 1 })
    const htmlForm = getByTestId("EditTaskForm")
    expect(htmlForm).toHaveFormValues({
      "Title": task.title,
      "Deadline": toDateTimeLocalHTMLString(task.deadline),
      "Description": task.description
    })
    const [submitButton, cancelButton] = await findAllByRole("button")
    fireEvent.click(submitButton, { button: 1 })
    await waitFor(() => {
      expect(htmlForm).not.toBeInTheDocument()
    })
  }) */
})