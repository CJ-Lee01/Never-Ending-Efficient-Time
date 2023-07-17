import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import { AnnouncementData } from "../../types";
import { addBulkAnnoucement, getAnnouncements, removeAnnouncement } from "../../CRUD_Announcements";
import { announcements } from "@/lib/Canvas/MockCanvasData";
import { FC, useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";


jest.mock("../../CRUD_Announcements");

const AnnouncementComponent: FC = () => {
  const [announcements, setAnnouncements] = useState<{
    data: AnnouncementData[] | null;
    error: PostgrestError | null
  }>({
    data: null, error: null
  })

  useEffect(() => {
    getAnnouncements(setAnnouncements)
  }, [])

  const display = () => {
    if (announcements.error) {
      return <div>Error: {announcements.error.message}</div>
    }
    if (announcements.data) {
      return <>
        {announcements.data.map(x => <div key={x.canvas_id}>Title: {x.title}</div>)}
      </>
    }
    return <div>Nothing</div>
  }
  return display()
}

describe("Mock", () => {
  describe("Add bulk announcements", () => {
    it("Returns successful if input is empty list.", async () => {
      const result = await addBulkAnnoucement([])
      expect(result).toEqual({
        data: [],
        error: null
      })
    })
    it("Returns successfully if input list has userID", async () => {
      const announcementList = announcements.map(x => {
        return {
          ...x,
          user_id: "1"
        }
      })
      const result = await addBulkAnnoucement(announcementList)
      expect(result).toEqual({
        data: [],
        error: null
      })
    })
    it("Returns an error if input list has no userID", async () => {
      const result = await addBulkAnnoucement(announcements)
      expect(result).toEqual({
        data: null,
        error: {
          message: "No user ID",
          details: "No user ID associated with announcement",
          hint: "IDK",
          code: "Test code"
        }
      })
    })
  })
  describe("Removes Announcements", () => {
    it("Gives an error if announcement has no userID", async () => {
      const result = await removeAnnouncement(announcements[0])
      expect(result).toEqual({
        message: "No user ID",
        details: "No user ID associated with announcement",
        hint: "IDK",
        code: "Test code"
      })
    })
    it("Does not give error if announcement has userID", async () => {
      const announcement = { ...announcements[0], user_id: "1" }
      const result = await removeAnnouncement(announcement)
      expect(result).toBe(null)
    })
  })
  describe("Gets announcements", () => {
    it("Successfully renders a list of announcements.", async () => {
      const { findAllByText } = render(<AnnouncementComponent />)
      const expectedArray = announcements.map(x => `Title: ${x.title}`)
      const htmlArray = await findAllByText(/Title:/)
      htmlArray.forEach((element, i) => {
        expect(element).toHaveTextContent(expectedArray[i])
      })
    });
  })
})
