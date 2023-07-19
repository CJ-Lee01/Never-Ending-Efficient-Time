import { TasksInformation } from "@/lib/types"
import EditTaskModal from "../EditTaskModal"
import { TaskInfoContext } from "../Tasks"
import { FC } from "react"

const TaskContextRenderer = (ReactComponent: FC) => (task: TasksInformation) => {
  return <TaskInfoContext.Provider value={{ task: task, pageUpdater: () => { } }}>
    <ReactComponent />
  </TaskInfoContext.Provider>
}

export default TaskContextRenderer