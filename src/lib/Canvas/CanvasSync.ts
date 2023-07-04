import { getCanvasAnnouncements, getCanvasAssignments, getCanvasCourses, CourseInfo } from "./CanvasAPI";
import { AnnouncementData, TasksInformation, } from "../types";

async function syncWithCanvas(canvasToken: string, includeConcludedCourses: boolean = false): Promise<{
  announcements: AnnouncementData[];
  assignments: TasksInformation[];
  error: string | null;
}> {
  const data: {
    announcements: AnnouncementData[];
    assignments: TasksInformation[];
    error: string | null;
  } = await getCanvasCourses(canvasToken, includeConcludedCourses)
    .then(async data => {
      return data.error
        ? {
          announcements: new Array<AnnouncementData>(),
          assignments: new Array<TasksInformation>(),
          error: data.error
        }
        : {
          announcements: (await getCanvasAnnouncements(canvasToken, data.courses)).announcements,
          assignments: (await getCanvasAssignments(canvasToken, data.courses)).assignments,
          error: null
        }
    });
    
    return data;
}