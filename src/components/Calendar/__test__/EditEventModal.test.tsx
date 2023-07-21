import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import DefaultEventList from '@/lib/__mocks__/DefaultEventList';
import EditEventModal from '../EditEventModal';
import { toDateTimeLocalHTMLString } from '@/lib/GenericHelper';
import { eventInformation } from '@/lib/types';
import { EventListInfoContext } from '@/lib/PageUpdaters/CalendarPageUpdater';

const eventListWithUserID = DefaultEventList.map(x => {
  return {
    ...x,
    user_id: "1"
  }
})

jest.mock("../../../lib/CRUD_Calendar");

const editEventContext = (event: eventInformation) => {
  return <EventListInfoContext.Provider value={{ events: eventListWithUserID, pageUpdater: () => { } }}>
    <EditEventModal eventInfo={event} />
  </EventListInfoContext.Provider>
}

describe("Edit event modal", () => {
  afterEach(() => {
    cleanup()
  })
  it("Opens edit event form after clicking on the icon", () => {
    const { getByTestId, queryByTestId, unmount } = render(
      editEventContext(eventListWithUserID[0])
    )
    const editEventButton = getByTestId("EditEventIcon")
    fireEvent.click(editEventButton, { button: 1 })
    const editEventForm = queryByTestId("EditEventForm")
    expect(editEventForm).not.toBeNull()
    unmount()
  })
  it("Closes the form after clicking on modal close button", async () => {
    //Not sure why this fails. Manual testing shows that it works.
    const { getAllByRole, getByTestId, unmount } = render(
      editEventContext(eventListWithUserID[0])
    )
    const editEventButton = getByTestId("EditEventIcon")
    fireEvent.click(editEventButton, { button: 1 })
    const editEventForm = getByTestId("EditEventForm")
    const [modalCloseButton, editButton, cancelButton] = getAllByRole("button")
    fireEvent.click(modalCloseButton, { button: 1 })
    await waitFor(() => {
      expect(editEventForm).not.toBeVisible()
    })
    unmount()
  })
  it("Closes the form after submitting the edit", async () => {
    const { getAllByRole, getByTestId, unmount } = render(
      editEventContext(eventListWithUserID[0])
    )
    const editEventButton = getByTestId("EditEventIcon")
    fireEvent.click(editEventButton, { button: 1 })
    const editEventForm = getByTestId("EditEventForm")
    const [modalCloseButton, editButton, cancelButton] = getAllByRole("button")
    fireEvent.click(editButton, { button: 1 })
    fireEvent.submit(editEventForm)
    await waitFor(() => {
      expect(editEventForm).not.toBeVisible()
    })
    unmount()
  })
  it("Closes the form after clicking on cancel button", async () => {
    const { getAllByRole, getByTestId, unmount } = render(
      editEventContext(eventListWithUserID[0])
    )
    const editEventButton = getByTestId("EditEventIcon")
    fireEvent.click(editEventButton, { button: 1 })
    const editEventForm = getByTestId("EditEventForm")
    const [modalCloseButton, editButton, cancelButton] = getAllByRole("button")
    fireEvent.click(cancelButton, { button: 1 })
    await waitFor(() => {
      expect(editEventForm).not.toBeVisible()
    })
    unmount()
  })
  describe("Allows values to be updated", () => {
    it("Allows title to be updated", () => {
      const event = eventListWithUserID[0]
      const { getByDisplayValue, getByTestId, unmount } = render(
        editEventContext(event)
      )
      const editEventButton = getByTestId("EditEventIcon")
      fireEvent.click(editEventButton, { button: 1 })
      const editEventForm = getByTestId("EditEventForm")
      const titleHTML = getByDisplayValue(event.event_name)
      fireEvent.change(titleHTML, { target: { value: "Testing Title" } })
      expect(editEventForm).toHaveFormValues({
        "title": "Testing Title",
        "Start-DateTime": toDateTimeLocalHTMLString(event.start_time),
        "End-DateTime": toDateTimeLocalHTMLString(event.end_time),
        "Description": event.event_description
      })
      unmount()
    })
    it("Allows start date to be updated", () => {
      const event = eventListWithUserID[0]
      const { getByDisplayValue, getByTestId, unmount } = render(
        editEventContext(event)
      )
      const editEventButton = getByTestId("EditEventIcon")
      fireEvent.click(editEventButton, { button: 1 })
      const editEventForm = getByTestId("EditEventForm")
      const startDateHTML = getByDisplayValue(toDateTimeLocalHTMLString(event.start_time))
      fireEvent.change(startDateHTML, { target: { value: toDateTimeLocalHTMLString(new Date("2022-12-12")) } })
      expect(editEventForm).toHaveFormValues({
        "title": event.event_name,
        "Start-DateTime": toDateTimeLocalHTMLString(new Date("2022-12-12")),
        "End-DateTime": toDateTimeLocalHTMLString(event.end_time),
        "Description": event.event_description
      })
      unmount()
    })
    it("Allows end date to be updated", () => {
      const event = eventListWithUserID[0]
      const { getByDisplayValue, getByTestId, unmount } = render(
        editEventContext(event)
      )
      const editEventButton = getByTestId("EditEventIcon")
      fireEvent.click(editEventButton, { button: 1 })
      const editEventForm = getByTestId("EditEventForm")
      const endDateHTML = getByDisplayValue(toDateTimeLocalHTMLString(event.end_time))
      fireEvent.change(endDateHTML, { target: { value: toDateTimeLocalHTMLString(new Date("2025-12-12")) } })
      expect(editEventForm).toHaveFormValues({
        "title": event.event_name,
        "Start-DateTime": toDateTimeLocalHTMLString(event.start_time),
        "End-DateTime": toDateTimeLocalHTMLString(new Date("2025-12-12")),
        "Description": event.event_description
      })
      unmount()
    })
    it("Allows description to be updated", () => {
      const event = eventListWithUserID[0]
      const { getByDisplayValue, getByTestId, unmount } = render(
        editEventContext(event)
      )
      const editEventButton = getByTestId("EditEventIcon")
      fireEvent.click(editEventButton, { button: 1 })
      const editEventForm = getByTestId("EditEventForm")
      const titleHTML = getByDisplayValue(event.event_description)
      fireEvent.change(titleHTML, { target: { value: "Testing description" } })
      expect(editEventForm).toHaveFormValues({
        "title": event.event_name,
        "Start-DateTime": toDateTimeLocalHTMLString(event.start_time),
        "End-DateTime": toDateTimeLocalHTMLString(event.end_time),
        "Description": "Testing description"
      })
      unmount()
    })
  })
  describe.each(eventListWithUserID)("Shows correct form values", (event) => {
    it(`Current value: \nTitle: ${event.event_name}, \nstart: ${event.start_time.toISOString()}, end: ${event.end_time.toISOString()}, \ndescription: ${event.event_description}`, () => {
      const { getByTestId, queryByTestId, unmount } = render(
        editEventContext(event)
      )
      const editEventButton = getByTestId("EditEventIcon")
      fireEvent.click(editEventButton, { button: 1 })
      const editEventForm = getByTestId("EditEventForm")
      expect(editEventForm).toHaveFormValues({
        "title": event.event_name,
        "Start-DateTime": toDateTimeLocalHTMLString(event.start_time),
        "End-DateTime": toDateTimeLocalHTMLString(event.end_time),
        "Description": event.event_description
      })
      unmount()
    })
  })
})