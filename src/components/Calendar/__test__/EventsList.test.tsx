import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import DefaultEventList from '@/lib/__mocks__/DefaultEventList';
import EventsList from '../EventsList';
import { EventListInfoContext } from '@/lib/PageUpdaters/CalendarPageUpdater';
import { eventInformation } from '@/lib/types';
import { defaultEvent } from '@/lib/CRUD_Calendar';

const eventListWithUserID = DefaultEventList.map(x => {
  return {
    ...x,
    user_id: "1"
  }
})

jest.mock("../../../lib/CRUD_Calendar");

const EventListContext = () => {
  return <EventListInfoContext.Provider value={{ events: eventListWithUserID, pageUpdater: () => { } }}>
    <EventsList />
  </EventListInfoContext.Provider>
}

describe("Renders list of events correctly with edit and delete", () => {
  it("Renders correct values with edit and delete button", () => {
    const {unmount, getAllByTestId} = render(EventListContext())
    const htmlArr = getAllByTestId("eventCardComponent")
    htmlArr.forEach((elem, index) => {
      expect(elem).toHaveTextContent(DefaultEventList[index].event_name)
      expect(elem).toHaveTextContent(`Start Date/Time: ${DefaultEventList[index].start_time.toLocaleString()}`)
      expect(elem).toHaveTextContent(`End Date/Time: ${DefaultEventList[index].end_time.toLocaleString()}`)
    })
    const deleteButtonArr = getAllByTestId("DeleteEventIcon")
    expect(deleteButtonArr.length).toBe(DefaultEventList.length)
    const editButtonArr = getAllByTestId("EditEventIcon")
    expect(editButtonArr.length).toBe(DefaultEventList.length)
  })
})