"use client";

import {
  VStack,
  Grid,
  Stack,
  chakra,
  useColorModeValue,
  Checkbox,
  Divider,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  FC,
  Fragment,
  createContext,
  useEffect,
  useState,
} from "react";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import { TasksInformation } from "@/lib/types";
import { editTask, getTasks } from "@/lib/CRUD_Tasks";
import { PostgrestError } from "@supabase/supabase-js";
import defaultTask from "./DefaultTask";
import AddTaskModal from "./AddTaskModal";
import formatDateString from "@/lib/dateFunctions";
import TaskComponent from "./TaskComponent";

interface TasksProps {}

export const TaskInfoContext = createContext<{
  task: TasksInformation;
  pageUpdater: () => void;
}>({
  task: defaultTask,
  pageUpdater: () => {},
});

const Tasks: FC<TasksProps> = ({}) => {
  const bgColorScheme = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const [taskList, setTaskList] = useState<{
    data: TasksInformation[];
    error: PostgrestError | null;
  }>({
    data: [],
    error: null,
  });
  const [dummy, updateList] = useState<boolean>(false); //just a gimmick to ensure that the page is rerendered.
  const pageUpdater = () => updateList((prevBool) => !prevBool);

  useEffect(() => {
    getTasks(setTaskList);
  }, [dummy]);

  const checkHandler =
    (item: TasksInformation) => (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      editTask({
        ...item,
        is_complete: !item.is_complete,
      });
    };

  return (
    <>
      <TaskInfoContext.Provider
        value={{ task: defaultTask, pageUpdater: pageUpdater }}
      >
        <Stack mb={16} align="center" spacing={16}>
          <AddTaskModal />
        </Stack>
      </TaskInfoContext.Provider>
      <VStack
        border="1px solid"
        borderColor="gray.400"
        rounded="md"
        overflow="hidden"
        spacing={0}
      >
        {taskList.data?.map((item, index) => (
          <Fragment key={item.id}>
            <TaskInfoContext.Provider
                  value={{ task: item, pageUpdater: pageUpdater }}
                >
                  <TaskComponent />
                </TaskInfoContext.Provider>
            {taskList.data != null && taskList.data.length - 1 !== index && (
              <Divider m={0} />
            )}
          </Fragment>
        ))}
      </VStack>
    </>
  );
};

export default Tasks;
