import { PostgrestError } from "@supabase/supabase-js";
import { AnnouncementData } from "../types";
import { Dispatch, SetStateAction } from "react";
import { announcements } from "../Canvas/MockCanvasData";
/*
addBulkAnnoucement: Returns an error if list is empty. Otherwise, will return null.
getAnnouncements: setState a list of announcements.
removeAnnouncement: Returns an error if there is no user_id or user_id is empty string. Otherwise returns null
*/

const announcementFunctions = jest.createMockFromModule<typeof import("../CRUD_Announcements")>("../CRUD_Announcements")

announcementFunctions.addBulkAnnoucement = async (announcementList: AnnouncementData[]) => {
  console.log("Mock being run")
  if (announcementList.length == 0) {
    return {
      data: [],
      error: null
    }
  }
  if (!announcementList[0].user_id) {
    return {
      data: null,
      error: {
        message: "No user ID",
        details: "No user ID associated with announcement",
        hint: "IDK",
        code: "Test code"
      }
    }
  }
  return {
    data: [],
    error: null
  }
}

announcementFunctions.getAnnouncements = async (setter: Dispatch<SetStateAction<
  {
    data: any,
    error: null | PostgrestError,
  }
>>) => {
  setter({
    data: announcements,
    error: null
  })
}

announcementFunctions.removeAnnouncement = async (announcement: AnnouncementData) => {
  if (!announcement.user_id) {
    return {
      message: "No user ID",
      details: "No user ID associated with announcement",
      hint: "IDK",
      code: "Test code"
    }
  }
  return null
}

module.exports = announcementFunctions