import { VStack, Divider, Checkbox } from "@chakra-ui/react"
import { ChangeEvent, Fragment, useState } from "react"
import TaskComponent from "./TaskComponent"
import { TaskInfoContext } from "./Tasks"
import { TasksInformation } from "@/lib/types"

const TaskList = ({ taskList, pageUpdater }: { taskList: TasksInformation[], pageUpdater: () => void }) => {

  const [filterCompleted, setFilter] = useState<boolean>(false)
  
  if (taskList.length == 0) {
    return <>You have no tasks.</>
  }
  const filterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(x => !x)
  }

  return <VStack
    border="1px solid"
    borderColor="gray.400"
    rounded="md"
    overflow="hidden"
    spacing={0}
  >
    <Checkbox onChange={filterHandler}>Hide completed</Checkbox>
    {taskList.filter(x => filterCompleted ? !x.is_complete : true).map((item, index) => (
      <Fragment key={item.id}>
        <TaskInfoContext.Provider
          value={{ task: item, pageUpdater: pageUpdater }}
        >
          <TaskComponent />
        </TaskInfoContext.Provider>
        {taskList != null && taskList.length - 1 !== index && (
          <Divider m={0} />
        )}
      </Fragment>
    ))}
  </VStack>
}

export default TaskList