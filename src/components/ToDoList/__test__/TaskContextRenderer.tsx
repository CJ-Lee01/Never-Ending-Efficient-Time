import { TasksInformation } from "@/lib/types"
import EditTaskModal from "../EditTaskModal"
import { TaskInfoContext } from "../Tasks"
import { FC } from "react"

const TaskContextRenderer = (ReactComponent: FC) => {
  const WrappedComponent =  (task: TasksInformation) => {
    return <TaskInfoContext.Provider value={{ task: task, pageUpdater: () => { } }}>
      <ReactComponent />
    </TaskInfoContext.Provider>
  }
  WrappedComponent.displayName = `TaskContextRenderer(${ReactComponent.displayName})`
  return WrappedComponent
}

export default TaskContextRenderer