import { CanvasAPICourse, CanvasAPIAnnoucement, CanvasAPIAssignment } from "./CanvasTypes";
import { AnnouncementData, TasksInformation } from "../types";
import { announcements, assignments } from "./MockCanvasData"
import { resolve } from "path";
import { access } from "fs";

const ROOT_CANVAS_URL = "https://canvas.nus.edu.sg";
const urlCourses = () => "/api/v1/users/self/courses?include[]=concluded";
const urlAssignments = (courseID: number) => `/api/v1/users/self/courses/${courseID}/assignments?include[]=submission`;
const urlAnnouncement = (courseID: number) => `/api/v1/courses/${courseID}/discussion_topics?only_announcements=true`;
const createCanvasAuthorizationHeader: (canvasToken: string) => { "Authorization": string } = (canvasToken: string) => {
  const header = new Headers();
  header.append("Authorization", `Bearer ${canvasToken}`);
  //return header;
  return { "Authorization": `Bearer ${canvasToken}` }
}
export const INVALID_CANVAS_TOKEN_ERROR = "Error 401: Invalid Canvas Authentication Token given";

export interface CourseInfo {
  // Should not use outside of the Canvas folder.
  courseName: string;
  courseID: number;
  courseCode: string;
}

async function getCanvasCourses(canvasToken: string, includeConcluded: boolean = false): Promise<{ courses: CourseInfo[]; error: string | null; }> {
  // By default, excludes courses that have already concluded.
  const header = createCanvasAuthorizationHeader(canvasToken);
  const result: { courses: CourseInfo[], error: string | null } = { courses: [], error: null };
  const response = await fetch(`${ROOT_CANVAS_URL}${urlCourses()}`, {
    method: "GET",
    headers: header
  });
  console.log(response.status)
  if (response.status == 401) {
    return {
      courses: [],
      error: "Error 401: Canvas Token given is not valid."
    }
  }

  if (!response.ok) {
    return {
      courses: [],
      error: "Error unknown. Please contact the developers with the details."
    }
  }

  const data = (await response.json());
  (data as CanvasAPICourse[]).filter(course => includeConcluded ? true : !course.concluded)
  .forEach(course => course.name
    ? result.courses.push({
      courseName: course.name,
      courseID: course.id,
      courseCode: course.course_code ?? "Unknown Course Code"
    })
    : 1 //Do nothing if not valid.
  )
  return result;

}

async function getCanvasAnnouncements(canvasToken: string, courseList: CourseInfo[], startDate?: Date): Promise<{ announcements: AnnouncementData[]; error: string | null; }> {
  const result: { announcements: AnnouncementData[], error: string | null } = { announcements: [], error: null }
  const header = createCanvasAuthorizationHeader(canvasToken);
  const fetchArray: Promise<any>[] = courseList
    .map(course => fetch(`${ROOT_CANVAS_URL}${urlAnnouncement(course.courseID)}`, {
      method: "GET",
      headers: header
    }).then(response => {
      if (response.status == 401) {
        result.error = INVALID_CANVAS_TOKEN_ERROR;
        return;
      }
      response.json()
        .then(announcementList => (announcementList as CanvasAPIAnnoucement[]))
        .then(announcementList => announcementList.filter(item => {
          const announcedDate = new Date(item.posted_at ?? Date.now())
            console.log(announcedDate.toLocaleString())
            return !(startDate && announcedDate < startDate)
        }))
        .then(announcementList => {
          announcementList.forEach(announcement => {
            const announcedDate = new Date(announcement.posted_at ?? Date.now())
            console.log(announcedDate.toLocaleString())
            if (startDate && announcedDate < startDate) {
              return
            }
            result.announcements.push({
              course_name: course.courseName,
              title: announcement.title,
              description: announcement.message,
              is_read: announcement.unread_count == 0,
              announced_at: announcedDate
            })
          })
        })
    }))

  return result;
}

async function getCanvasAssignments(canvasToken: string, courseList: CourseInfo[], includeComplete: boolean = false, startDate?: Date): Promise<{ assignments: TasksInformation[]; error: string | null; }> {
  const result: { assignments: TasksInformation[], error: string | null } = { assignments: [], error: null };
  const header = createCanvasAuthorizationHeader(canvasToken);
  const fetchArray: Promise<any>[] = courseList
    .map(course => fetch(`${ROOT_CANVAS_URL}${urlAssignments(course.courseID)}`, {
      method: "GET",
      headers: header
    }).then(response => {
      if (response.status == 401) {
        result.error = INVALID_CANVAS_TOKEN_ERROR;
        return;
      }
      response.json()
        .then(assignmentList => (assignmentList as CanvasAPIAssignment[]))
        .then(assignmentList => {
          assignmentList.forEach(assignment => {
            if (!includeComplete && assignment.submission) {
              return
            }
            const deadline = new Date(assignment.lock_info?.lock_at ?? "9999-12-12");
            if (startDate && startDate > deadline) {
              return
            }
            result.assignments.push({
              canvas_id: assignment.id,
              title: `${course.courseName}: ${assignment.name}`,
              description: assignment.description,
              is_complete: assignment.submission ? true : false,
              deadline: new Date(assignment.lock_info?.lock_at ?? "9999-12-12")
            })
          })
        })
    }))

  await Promise.all(fetchArray);
  return result;
}

export { getCanvasAnnouncements, getCanvasAssignments, getCanvasCourses }