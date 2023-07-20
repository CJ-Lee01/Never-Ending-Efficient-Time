"use client"

import {
  VStack,
  Grid,
  Stack,
  chakra,
  useColorModeValue,
  Checkbox,
  Divider,
} from "@chakra-ui/react";
import { ChangeEvent, Dispatch, FC, Fragment, SetStateAction, createContext, useEffect, useState } from "react";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import { TasksInformation } from "@/lib/types";
import { editTask, getTasks } from "@/lib/CRUD_Tasks";
import { PostgrestError } from "@supabase/supabase-js";
import defaultTask from "./DefaultTask";
import AddTaskModal from "./AddTaskModal";

interface TasksProps { }

export const TaskInfoContext = createContext<{
  task: TasksInformation,
  pageUpdater: () => void
}>({
  task: defaultTask,
  pageUpdater: () => {},
});

const Tasks: FC<TasksProps> = ({ }) => {
  const bgColorScheme = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const [taskList, setTaskList] = useState<{
    data: TasksInformation[] | null,
    error: PostgrestError | null
  }>({
    data: null,
    error: null
  });
  const [dummy, updateList] = useState<boolean>(false); //just a gimmick to ensure that the page is rerendered.
  const pageUpdater = () => updateList(prevBool => !prevBool);

  useEffect(() => {
    getTasks(setTaskList);
  }, [dummy])

  const checkHandler = (item: TasksInformation) => (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    editTask({
      ...item,
      is_complete: !item.is_complete
    })
  }

  return (
    <>
      <TaskInfoContext.Provider value={{ task: defaultTask, pageUpdater: pageUpdater }}>
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
            <Grid
              templateRows={{ base: "auto auto", md: "auto" }}
              w="100%"
              templateColumns={{ base: "5fr 2fr", md: "5fr 2fr" }}
              p={{ base: 2, sm: 4 }}
              gap={3}
              alignItems="center"
              _hover={{ bg: bgColorScheme }}
            >
              <Stack>
                <chakra.h3 fontWeight="bold" fontSize="lg">
                  {item.title}
                </chakra.h3>
                <chakra.p fontWeight="medium" fontSize="sm" color={textColor}>
                  Deadline: {item.deadline}
                </chakra.p>
              </Stack>
              <Stack
                spacing={{ base: 5, md: 4 }}
                direction="row"
                fontSize={{ base: "sm", sm: "md" }}
                justifySelf="flex-end"
                alignItems="center"
              >
                <TaskInfoContext.Provider value={{ task: item, pageUpdater: pageUpdater }}>
                  <ViewTaskModal />
                  <Checkbox colorScheme="green" defaultChecked={item.is_complete} onChange={checkHandler(item)}/>
                  <EditTaskModal />
                  <DeleteTaskModal />
                </TaskInfoContext.Provider>
              </Stack>
            </Grid>
            {items.length - 1 !== index && <Divider m={0} />}
          </Fragment>
        ))}
      </VStack>


    </>
  );
};

interface ItemAttributes {
  title: string;
  deadline: string;
}

const items: ItemAttributes[] = [
  {
    title: "Task 1",
    deadline: "21 Jan 2022",
  },
  {
    title: "Create professional Web Application with Nextjs and ChakraUI",
    deadline: "20 Jun 2021",
  },
  {
    title: `Get Good Grades for University`,
    deadline: "31 Sept 2022",
  },
];

export default Tasks;
