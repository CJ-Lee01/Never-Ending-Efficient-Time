import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import DefaultEventList from '@/lib/__mocks__/DefaultEventList';
import DeleteEventModal from '../DeleteEventModal';

const eventListWithUserID = DefaultEventList.map(x => {
  return {
    ...x,
    user_id: "1"
  }
})

jest.mock("../../../lib/CRUD_Calendar");

describe("Delete event modal", () => {
  it("Shows confirmation box when clicking on the icon", () => {
    const { queryByTestId, getByTestId, unmount } = render(
      <DeleteEventModal eventInfo={eventListWithUserID[0]} />
    )
    const deleteEventIcon = getByTestId("DeleteEventIcon")
    fireEvent.click(deleteEventIcon, { button: 1 })
    const deleteConfirmation = queryByTestId("DeleteEventConfirmation")
    expect(deleteConfirmation).not.toBeNull()
    expect(deleteConfirmation).toHaveTextContent("Are you sure you want to delete this event?")
    unmount()
  })
  it("Closes the modal when close modal is clicked", async () => {
    const { getAllByRole, getByTestId, unmount } = render(
      <DeleteEventModal eventInfo={eventListWithUserID[0]} />
    )
    const deleteEventIcon = getByTestId("DeleteEventIcon")
    fireEvent.click(deleteEventIcon, { button: 1 })
    const deleteConfirmation = getByTestId("DeleteEventConfirmation")
    const [modalCloseButton, deleteButton, cancelButton] = getAllByRole("button")
    fireEvent.click(modalCloseButton, { button: 1 })
    await waitFor(() => {
      expect(deleteConfirmation).not.toBeVisible()
    })
    unmount()
  })
  it("Closes the modal when successfully deleted", async () => {
    const { getAllByRole, getByTestId, unmount } = render(
      <DeleteEventModal eventInfo={eventListWithUserID[0]} />
    )
    const deleteEventIcon = getByTestId("DeleteEventIcon")
    fireEvent.click(deleteEventIcon, { button: 1 })
    const deleteConfirmation = getByTestId("DeleteEventConfirmation")
    const [modalCloseButton, deleteButton, cancelButton] = getAllByRole("button")
    fireEvent.click(deleteButton, { button: 1 })
    await waitFor(() => {
      expect(deleteConfirmation).not.toBeVisible()
    })
    unmount()
  })
  it("Closes the modal when cancel is clicked", async () => {
    const { getAllByRole, getByTestId, unmount } = render(
      <DeleteEventModal eventInfo={eventListWithUserID[0]} />
    )
    const deleteEventIcon = getByTestId("DeleteEventIcon")
    fireEvent.click(deleteEventIcon, { button: 1 })
    const deleteConfirmation = getByTestId("DeleteEventConfirmation")
    const [modalCloseButton, deleteButton, cancelButton] = getAllByRole("button")
    fireEvent.click(cancelButton, { button: 1 })
    await waitFor(() => {
      expect(deleteConfirmation).not.toBeVisible()
    })
    unmount()
  })
})