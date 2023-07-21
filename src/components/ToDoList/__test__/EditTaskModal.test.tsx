import EditTaskModal from '../EditTaskModal';
import { render, RenderOptions, fireEvent, waitFor, screen, act } from '@testing-library/react'
import tasks from "@/lib/__mocks__/DefaultTaskList";
import { TasksInformation } from '@/lib/types';
import { toDateTimeLocalHTMLString } from '@/lib/GenericHelper';
import TaskContextRenderer from './TaskContextRenderer';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import exp from 'constants';

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
    describe(`For Task: \nTitle: ${task.title}, \nDescription: ${task.description} \nDeadline: ${task.deadline.toISOString()} Done? ${task.is_complete}`, () => {
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
      describe("Allows form values to be edited.", () => {
        it("Allows the title to be edited.", () => {
          const { unmount, getByTestId, queryByTestId, getByDisplayValue } = render(modalContextRender(task))
          const editButton = getByTestId("EditTaskIcon")
          fireEvent.click(editButton, { button: 1 })
          const htmlForm = queryByTestId("EditTaskForm")
          const titleHTML = getByDisplayValue(task.title)
          fireEvent.change(titleHTML, { target: { value: "Test Title" } })
          expect(htmlForm).toHaveFormValues({
            "Title": "Test Title",
            "Deadline": toDateTimeLocalHTMLString(task.deadline),
            "Description": task.description
          })
          unmount()
        })
        it("Allows the deadline to be edited.", () => {
          const { unmount, getByTestId, queryByTestId, getByDisplayValue } = render(modalContextRender(task))
          const editButton = getByTestId("EditTaskIcon")
          fireEvent.click(editButton, { button: 1 })
          const htmlForm = queryByTestId("EditTaskForm")
          const titleHTML = getByDisplayValue(toDateTimeLocalHTMLString(task.deadline))
          fireEvent.change(titleHTML, { target: { value: toDateTimeLocalHTMLString(new Date("2022-12-12")) } })
          expect(htmlForm).toHaveFormValues({
            "Title": task.title,
            "Deadline": toDateTimeLocalHTMLString(new Date("2022-12-12")),
            "Description": task.description
          })
          unmount()
        })
        it("Allows the description to be edited", () => {
          const { unmount, getByTestId, queryByTestId, getByDisplayValue } = render(modalContextRender(task))
          const editButton = getByTestId("EditTaskIcon")
          fireEvent.click(editButton, { button: 1 })
          const htmlForm = queryByTestId("EditTaskForm")
          const titleHTML = getByDisplayValue(task.description)
          fireEvent.change(titleHTML, { target: { value: "Test Description" } })
          expect(htmlForm).toHaveFormValues({
            "Title": task.title,
            "Deadline": toDateTimeLocalHTMLString(task.deadline),
            "Description": "Test Description"
          })
          unmount()
        })
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
  })

})