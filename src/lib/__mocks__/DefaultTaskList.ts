import { TasksInformation } from "../types";

const tasks: TasksInformation[] = [
  {
    canvas_id: -1,
    id: 1,
    title: "Title 1",
    description: "Description 1",
    is_complete: true,
    deadline: new Date("2023-12-12"),
  },
  {
    canvas_id: -1,
    id: 2,
    title: "Title 2",
    description: "Description 2",
    is_complete: false,
    deadline: new Date("2023-12-12"),
  },
  {
    canvas_id: -1,
    id: 3,
    title: "Title 3",
    description: "Description 3",
    is_complete: true,
    deadline: new Date("9999-12-12"),
  },
  {
    canvas_id: -1,
    id: 4,
    title: "Title 4",
    description: "Description 4",
    is_complete: true,
    deadline: new Date("9999-12-12"),
  },
];

export default tasks;
