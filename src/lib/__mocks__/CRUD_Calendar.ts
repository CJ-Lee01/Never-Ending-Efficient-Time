import { E } from "@fullcalendar/core/internal-common"
import { eventInformation } from "../types"
import { PostgrestError } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import DefaultEventList from "./DefaultEventList";
/*
addBulkEvent: returns {data: [], error: null}
addEvent: returns {data: [], error: null}
editEvent: returns {data: null, error: PostGrestError} if user_id is not defined or an empty string. Otherwise returns {data: null, error: null}
getEvent: returns {data: DefaultEventList, error: null}
removeNUSModsCalendar: returns null
removeEvent: returns error if there is no user_id or user_id is an empty string. Otherwise returns null.
*/
const calendarFunctions = jest.createMockFromModule<typeof import("../CRUD_Calendar")>("../CRUD_Calendar")

calendarFunctions.addBulkEvent = async (eventList: eventInformation[]) => {
  return {
    data: [],
    error: null
  }
}

calendarFunctions.addEvent = async (event: eventInformation) => {
  return {
    data: null,
    error: null
  }
}

calendarFunctions.editEvent = async (event: eventInformation) => {
  if (!event.user_id) {
    return {
      data: null,
      error: {
        message: "No user ID",
        details: "No user ID associated with event",
        hint: "IDK",
        code: "Test code"
      }
    }
  }
  return {
    data: null,
    error: null
  }
}

calendarFunctions.getEvent = async (setState: Dispatch<SetStateAction<
  {
    data: any,
    error: null | PostgrestError,
  }
>>) => {
  setState({
    data: DefaultEventList,
    error: null
  })
}

calendarFunctions.removeNUSModsCalendar = async (semesterData: string) => {
  //I am not able to simulate what happens without userID.
  return null
}

calendarFunctions.removeEvent = async (event: eventInformation) => {
  if (!event.user_id) {
    return {
      message: "No user ID",
      details: "No user ID associated with announcement",
      hint: "IDK",
      code: "Test code"
    }
  }
  return null
}

module.exports = calendarFunctions