import { AnnouncementData, TasksInformation, eventInformation } from "../types";

const announcements: AnnouncementData[] = [
  {
    course_name: "CP2106",
    title: "Announcement for CP2106",
    description: "Remember to rate our project :)",
    is_read: false,
    announced_at: new Date()
  },
  {
    course_name: "CS1101S",
    title: "Announcement for CS1101S",
    description: "I have nothing to announce",
    is_read: false,
    announced_at: new Date()
  },
  {
    course_name: "CS2030S",
    title: "Announcement for CS2030S",
    description: "Lab 4 due on Friday",
    is_read: false,
    announced_at: new Date()
  }
]

const assignments: TasksInformation[] = [
  {
    canvas_id: 1,
    title: "Milestone 1 submission",
    description: "Submit relevant documents",
    is_complete: false,
    deadline: (new Date(2023, 4, 29)).toISOString()
  },
  {
    canvas_id: 2,
    title: "Milestone 2 submission",
    description: "Submit relevant documents",
    is_complete: false,
    deadline: (new Date(2023, 5, 26)).toISOString()
  },
  {
    canvas_id: 3,
    title: "Milestone 3 submission",
    description: "Submit relevant documents",
    is_complete: false,
    deadline: (new Date(2023, 6, 24)).toISOString()
  }
]

export {announcements, assignments}