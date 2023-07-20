import { AnnouncementData, TasksInformation } from "../types";

const announcements: AnnouncementData[] = [
  {
    canvas_id: 1,
    course_name: "CP2106",
    title: "Announcement for CP2106",
    description: "<div>Remember to rate our project :)</div>",
    is_read: false,
    announced_at: new Date()
  },
  {
    canvas_id: 2,
    course_name: "CS1101S",
    title: "Announcement for CS1101S",
    description: "<div>I have nothing to announce</div>",
    is_read: false,
    announced_at: new Date()
  },
  {
    canvas_id: 3,
    course_name: "CS2030S",
    title: "Announcement for CS2030S",
    description: "<div>Lab 4 due on Friday</div>",
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
    deadline: (new Date(2023, 4, 29))
  },
  {
    canvas_id: 2,
    title: "Milestone 2 submission",
    description: "Submit relevant documents",
    is_complete: false,
    deadline: (new Date(2023, 5, 26))
  },
  {
    canvas_id: 3,
    title: "Milestone 3 submission",
    description: "Submit relevant documents",
    is_complete: false,
    deadline: (new Date(2023, 6, 24))
  }
]

export {announcements, assignments}