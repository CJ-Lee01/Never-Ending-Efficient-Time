import { render, RenderOptions, fireEvent, waitFor, screen, act } from '@testing-library/react'
import { TasksInformation } from '@/lib/types';
import { toDateTimeLocalHTMLString } from '@/lib/GenericHelper';
import TaskContextRenderer from './TaskContextRenderer';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import defaultTask from '../DefaultTask';
import AddTaskModal from '../AddTaskModal';

jest.mock("../../../lib/CRUD_Tasks")



const modalContextRender = TaskContextRenderer(AddTaskModal)

describe("Edit Task Modal", () => {

  it("Opens a form modal after clicking on the button", () => {
    const { unmount, getByTestId, queryByTestId, getByRole } = render(modalContextRender(defaultTask))
    const addButton = getByRole("button")
    fireEvent.click(addButton, { button: 1 })
    const htmlForm = queryByTestId("AddTaskForm") //unsure why getbyrole form doesnt work.
    expect(htmlForm).not.toBe(null)
    expect(htmlForm).toHaveFormValues({
      "Title": "",
      "Deadline": toDateTimeLocalHTMLString(defaultTask.deadline),
      "Description": ""
    })
    unmount()
  })
  describe("Form has correct placeholder values", () => {
    it("Has correct placeholder title", () => {
      const { unmount, queryByPlaceholderText, queryByTestId, getByRole } = render(modalContextRender(defaultTask))
      const addButton = getByRole("button")
      fireEvent.click(addButton, { button: 1 })
      const htmlForm = queryByPlaceholderText("Type Here")
      expect(htmlForm).not.toBe(null)
      unmount()
    })
    it("Has correct placeholder description", () => {
      const { unmount, queryByPlaceholderText, queryByTestId, getByRole } = render(modalContextRender(defaultTask))
      const addButton = getByRole("button")
      fireEvent.click(addButton, { button: 1 })
      const htmlForm = queryByPlaceholderText("Write your task description here")
      expect(htmlForm).not.toBe(null)
      unmount()
    })
  })
  it("Closes after clicking on close modal button", async () => {
    const { unmount, getByTestId, queryByTestId, getAllByRole, getByRole } = render(modalContextRender(defaultTask))
    const addButton = getByRole("button")
    fireEvent.click(addButton, { button: 1 })
    const htmlForm = queryByTestId("AddTaskForm")
    const [modalCloseButton, submitButton, cancelButton] = getAllByRole("button")
    console.log(getAllByRole("button").length)
    fireEvent.click(modalCloseButton, { button: 1 })
    await waitFor(() => {
      expect(htmlForm).not.toBeVisible()
    })

    expect(htmlForm).not.toBeVisible()
    unmount()
  })
  it("Closes after clicking on Cancel", async () => {
    const { unmount, getByRole, queryByTestId, getAllByRole } = render(modalContextRender(defaultTask))
    const addButton = getByRole("button")
    fireEvent.click(addButton, { button: 1 })
    const htmlForm = queryByTestId("AddTaskForm")
    const [modalCloseButton, submitButton, cancelButton] = getAllByRole("button")
    fireEvent.click(cancelButton, { button: 1 })
    await waitFor(() => {
      expect(htmlForm).not.toBeVisible()
    })
    unmount()
  })
  it("Closes after clicking submit button", async () => {
    const { unmount, getByRole, queryByTestId, getAllByRole } = render(modalContextRender(defaultTask))
    const addButton = getByRole("button")
    fireEvent.click(addButton, { button: 1 })
    const htmlForm = queryByTestId("AddTaskForm")
    const [modalCloseButton, submitButton, cancelButton] = getAllByRole("button")
    fireEvent.click(submitButton, { button: 1 })
    await waitFor(() => {
      expect(htmlForm).not.toBeVisible()
    })
    unmount()
  })
})