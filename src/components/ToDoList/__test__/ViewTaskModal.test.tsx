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
    describe(
      `For task: \n\nTitle: ${task.title}, \nDescription: ${task.description} \nDeadline: ${task.deadline.toISOString()} Done? ${task.is_complete}`,
      () => {
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
        describe("Does not allow form values to be edited.", () => {
          it("Does not allow the title to be edited.", () => {
            const { unmount, getByTestId, queryByTestId, getByDisplayValue } = render(modalContextRender(task))
            const editButton = getByTestId("ViewTaskIcon")
            fireEvent.click(editButton, { button: 1 })
            const htmlForm = queryByTestId("ViewTaskModal")
            const titleHTML = getByDisplayValue(task.title)
            fireEvent.change(titleHTML, { target: { value: "Test Title" } })
            expect(htmlForm).toHaveFormValues({
              "Title": task.title,
              "Deadline": toDateTimeLocalHTMLString(task.deadline),
              "Description": task.description
            })
            unmount()
          })
          it("Does not allow the deadline to be edited.", () => {
            const { unmount, getByTestId, queryByTestId, getByDisplayValue } = render(modalContextRender(task))
            const editButton = getByTestId("ViewTaskIcon")
            fireEvent.click(editButton, { button: 1 })
            const htmlForm = queryByTestId("ViewTaskModal")
            const titleHTML = getByDisplayValue(toDateTimeLocalHTMLString(task.deadline))
            fireEvent.change(titleHTML, { target: { value: toDateTimeLocalHTMLString(new Date("2022-12-12")) } })
            expect(htmlForm).toHaveFormValues({
              "Title": task.title,
              "Deadline": toDateTimeLocalHTMLString(task.deadline),
              "Description": task.description
            })
            unmount()
          })
          it("Does not allow the description to be edited", () => {
            const { unmount, getByTestId, queryByTestId, getByDisplayValue } = render(modalContextRender(task))
            const editButton = getByTestId("ViewTaskIcon")
            fireEvent.click(editButton, { button: 1 })
            const htmlForm = queryByTestId("ViewTaskModal")
            const titleHTML = getByDisplayValue(task.description)
            fireEvent.change(titleHTML, { target: { value: "Test Description" } })
            expect(htmlForm).toHaveFormValues({
              "Title": task.title,
              "Deadline": toDateTimeLocalHTMLString(task.deadline),
              "Description": task.description
            })
            unmount()
          })
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
})