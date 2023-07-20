import { TasksInformation } from "@/lib/types";

const defaultTask: TasksInformation = {
  canvas_id: -1,
  title: "",
  description: "",
  deadline: new Date(),
  is_complete: false,
}

export default defaultTask;