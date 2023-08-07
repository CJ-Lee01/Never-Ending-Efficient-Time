"use client";

import {
  VStack,
  Stack,
  useColorModeValue,
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
import { TasksInformation } from "@/lib/types";
import { editTask, getTasks } from "@/lib/CRUD_Tasks";
import { PostgrestError } from "@supabase/supabase-js";
import defaultTask from "./DefaultTask";
import AddTaskModal from "./AddTaskModal";
import TaskComponent from "./TaskComponent";
import TaskList from "./List";

interface TasksProps {}

export const TaskInfoContext = createContext<{
  task: TasksInformation;
  pageUpdater: () => void;
}>({
  task: defaultTask,
  pageUpdater: () => {},
});

const Tasks: FC<TasksProps> = () => {
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

  return (
    <>
      <TaskInfoContext.Provider
        value={{ task: defaultTask, pageUpdater: pageUpdater }}
      >
        <Stack mb={16} align="center" spacing={16}>
          <AddTaskModal />
        </Stack>
      </TaskInfoContext.Provider>
      <TaskList taskList={taskList.data} pageUpdater={pageUpdater}/>
    </>
  );
};

export default Tasks;
