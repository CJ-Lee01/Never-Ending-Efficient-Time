import NUSModsEventList from "@/lib/NUSMods/NUSModsEventList";
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import DefaultEventList from '@/lib/__mocks__/DefaultEventList';
import { SemClassesDeleteHandler } from "../SemClassesDeleteHandler";
import { eventInformation } from "@/lib/types";
import { EventListInfoContext } from "@/lib/PageUpdaters/CalendarPageUpdater";

jest.mock("../../../lib/CRUD_Calendar");

const EventListContext = (eventList: eventInformation[]) => {
  return <EventListInfoContext.Provider value={{ events: eventList, pageUpdater: () => { } }}>
    <SemClassesDeleteHandler />
  </EventListInfoContext.Provider>
}
describe("Delete by semester handler", () => {
  describe("Shows the correct number of distinct semesters", () => {
    it("Shows 0 semesters for list of events with 0 semesters.", () => {
      const { unmount, getByText, queryAllByRole, getByPlaceholderText } = render(EventListContext([]))
      const selectionArr = queryAllByRole("option")
      expect(selectionArr.length).toBe(0)
      const msg = getByText("You have no NUSMods classes to delete.")
      expect(msg).toBeInTheDocument()
      unmount()
    })
    it("Shows 1 semesters for list of events with 1 semesters.", () => {
      const { unmount, getByRole, queryAllByRole, getByPlaceholderText } = render(EventListContext(DefaultEventList))
      const selectionArr = queryAllByRole("option")
      expect(selectionArr.length).toBe(2)
      unmount()
    })
    it("Shows 2 semesters for list of events with 2 semesters.", () => {
      const { unmount, getByRole, queryAllByRole, getByPlaceholderText } = render(EventListContext(NUSModsEventList))
      const selectionArr = queryAllByRole("option")
      expect(selectionArr.length).toBe(3)
      unmount()
    })
  })
})