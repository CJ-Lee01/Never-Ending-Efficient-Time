import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import { eventInformation } from "@/lib/types";
import { addBulkEvent, addEvent, editEvent, getEvent, removeNUSModsCalendar, removeEvent, defaultEvent } from "@/lib/CRUD_Calendar";
import { FC, useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import DefaultEventList from "../DefaultEventList";

jest.mock("../../CRUD_Calendar")

const TaskComponent: FC = () => {
  const [event, setEvent] = useState<{
    data: eventInformation[] | null;
    error: PostgrestError | null
  }>({
    data: null,
    error: null
  })

  useEffect(() => {
    getEvent(setEvent)
  }, [])

  const display = () => {
    if (event.error) {
      return <div>Error: {event.error.message}</div>
    }
    if (event.data) {
      return <>
        {event.data.map(event => <div key={event.id}>
          Event: {event.event_name} at {event.start_time.toISOString()}
        </div>)}
      </>
    }
    return <>Nothing</>
  }
  return display()
}

describe("Mock", () => {
  describe("Add Bulk Event", () => {
    it("Adds array of events successfully", async () => {
      const result = await addBulkEvent(DefaultEventList)
      expect(result).toEqual({
        data: [],
        error: null
      })
    })
    describe("Add event", () => {
      it("Adds events successfully", async () => {
        const result = await addEvent(DefaultEventList[0])
        expect(result).toEqual({
          data: null,
          error: null
        })
      })
    })
    describe("Edit event", () => {
      it("Successfully edits if there is a valid user_id", async () => {
        const event: eventInformation = DefaultEventList[0]
        event.user_id = "1"
        const result = await editEvent(event)
        expect(result).toEqual({
          data: null,
          error: null
        })
      })
      it("Rejects edits if user_id is empty string", async () => {
        const event: eventInformation = DefaultEventList[0]
        event.user_id = ""
        const result = await editEvent(event)
        expect(result).toEqual({
          data: null,
          error: {
            message: "No user ID",
            details: "No user ID associated with event",
            hint: "IDK",
            code: "Test code"
          }
        })
      })
      it("Rejects edits if user_id is not defined", async () => {
        const event: eventInformation = DefaultEventList[0]
        event.user_id = undefined
        const result = await editEvent(event)
        expect(result).toEqual({
          data: null,
          error: {
            message: "No user ID",
            details: "No user ID associated with event",
            hint: "IDK",
            code: "Test code"
          }
        })
      })
    })
    describe("Remove NUSMods Calendar", () => {
      it("Removes successfully.", async () => {
        const result = await removeNUSModsCalendar("")
        expect(result).toBe(null)
      })
    })
    describe("Remove Event", () => {
      it("Removes successfully with valid user_id", async () => {
        const event: eventInformation = DefaultEventList[0]
        event.user_id = "1"
        const result = await removeEvent(event)
        expect(result).toBe(null)
      })
      it("Gives error if user_id is empty string", async () => {
        const event: eventInformation = DefaultEventList[0]
        event.user_id = ""
        const result = await removeEvent(event)
        expect(result).toEqual({
          message: "No user ID",
          details: "No user ID associated with announcement",
          hint: "IDK",
          code: "Test code"
        })
      })
      it("Gives error if user_id is not defined", async () => {
        const event: eventInformation = DefaultEventList[0]
        event.user_id = undefined
        const result = await removeEvent(event)
        expect(result).toEqual({
          message: "No user ID",
          details: "No user ID associated with announcement",
          hint: "IDK",
          code: "Test code"
        })
      })
    })
    describe("Getting and setting events", () => {
      it("Gets events and sets events successfully", async () => {
        const { unmount, findAllByText } = render(<TaskComponent />)
        const htmlArray = await findAllByText(/Event:/)
        unmount()
        htmlArray.forEach((elem, index) => {
          const matchEvent = DefaultEventList[index]
          const expectedString = `Event: ${matchEvent.event_name} at ${matchEvent.start_time.toISOString()}`
          expect(elem).toHaveTextContent(expectedString)
        })
      })
    })
  })
})