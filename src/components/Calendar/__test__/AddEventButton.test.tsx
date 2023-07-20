import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'

import AddEventButton from '../AddEventButton';

jest.mock("../../../lib/CRUD_Calendar");

describe("Add event button", () => {
  it("Opens the add event modal when clicked on", () => {
    const { unmount, getByRole, queryByTestId } = render(<AddEventButton />)
    const addEventButton = getByRole("button")
    fireEvent.click(addEventButton, {button: 1})
    const addEventForm = queryByTestId("AddEventForm")
    expect(addEventForm).not.toBeNull()
    unmount()
  })
  it("Closes when modal close button is clicked", async () => {
    const { unmount, getByRole, queryByTestId, getAllByRole } = render(<AddEventButton />)
    const addEventButton = getByRole("button")
    fireEvent.click(addEventButton, {button: 1})
    const addEventForm = queryByTestId("AddEventForm")
    const [modalCloseButton, saveButton, cancelButton] = getAllByRole("button")
    fireEvent.click(modalCloseButton, {button: 1})
    await waitFor(() => {
      expect(addEventForm).not.toBeVisible()
    })
    unmount()
  })
  it("Closes when form is submitted", async () => {
    const { unmount, getByRole, queryByTestId, getAllByRole } = render(<AddEventButton />)
    const addEventButton = getByRole("button")
    fireEvent.click(addEventButton, {button: 1})
    const addEventForm = queryByTestId("AddEventForm")
    const [modalCloseButton, saveButton, cancelButton] = getAllByRole("button")
    fireEvent.click(saveButton, {button: 1})
    await waitFor(() => {
      expect(addEventForm).not.toBeVisible()
    })
    unmount()
  })
  it("Closes when cancel button is clicked", async () => {
    const { unmount, getByRole, queryByTestId, getAllByRole } = render(<AddEventButton />)
    const addEventButton = getByRole("button")
    fireEvent.click(addEventButton, {button: 1})
    const addEventForm = queryByTestId("AddEventForm")
    const [modalCloseButton, saveButton, cancelButton] = getAllByRole("button")
    fireEvent.click(cancelButton, {button: 1})
    await waitFor(() => {
      expect(addEventForm).not.toBeVisible()
    })
    unmount()
  })
})


