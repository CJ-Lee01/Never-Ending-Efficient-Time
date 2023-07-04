import { announcements, assignments } from "./MockCanvasData"

const ROOT_CANVAS_URL = "https://canvas.nus.edu.sg/api";
const urlCourses = () => "/api/v1/users/self/courses?include[]=concluded";
const urlAssignments = (courseID: string) => `/api/v1/users/self/courses/${courseID}/assignments`;
const announcement = () => "api/v1/announcements";
const createCanvasAuthorizationHeader: (canvasToken: string) => Headers = (canvasToken: string) => {
  const header = new Headers();
  header.append("Authorization", `Bearer ${canvasToken}`);
  return header;
}

interface CanvasCourse {
  courseName: string;
  courseID: number;
  courseCode: string;
}

/* function getCanvasCourses(canvasToken: string, includeConcluded: boolean = false): (canvasToken: string) => { courses: CanvasCourse[], error: string | null } {
  const header = createCanvasAuthorizationHeader(canvasToken);
  const response = fetch(`${ROOT_CANVAS_URL}${urlCourses()}`, {
    method: "GET",
    headers: header
  }).then((response) => {
    //if fulfilled
    console.log(response)
  })

} */

function getCanvasAnnouncements(canvasToken: string, startDate: Date, courseList: CanvasCourse[]) {
  const header = new Headers();
  header.append("Authorization", `Bearer ${canvasToken}`);
  const urlParams = new URLSearchParams();
  courseList.forEach(course => urlParams.append("contextcodes[]", `course_${course.courseID}`))

  return announcements;
}

function getCanvasAssignments(canvasToken: string) {
  return assignments;
}

export { getCanvasAnnouncements, getCanvasAssignments }