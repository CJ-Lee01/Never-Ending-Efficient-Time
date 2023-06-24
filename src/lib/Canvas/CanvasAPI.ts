import { announcements, assignments } from "./MockCanvasData"

function getCanvasAnnouncements(canvasToken: string) {
  return announcements;
} 

function getCanvasAssignments(canvasToken: string) {
  return assignments;
}

export {getCanvasAnnouncements, getCanvasAssignments}