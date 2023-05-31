"use client"

import {
  VStack,
  Grid,
  Stack,
  chakra,
  useColorModeValue,
  Checkbox,
  Divider,
  Link,
} from "@chakra-ui/react";
import { FC, Fragment, createContext, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import { TasksInformation } from "@/lib/types";
import { getTasks } from "@/lib/CRUD_Tasks";
import { PostgrestError } from "@supabase/supabase-js";

interface TasksProps { }

const TaskInfoContext = createContext<TasksInformation>({
  canvas_id: -1,
  title: "",
  description: "",
  is_complete: false,
  deadline: "",
})

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

  getTasks(setTaskList);

  return (
    <VStack
      border="1px solid"
      borderColor="gray.400"
      rounded="md"
      overflow="hidden"
      spacing={0}
    >
      {taskList.data?.map((item, index) => (
        <Fragment key={index}>
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
              <TaskInfoContext.Provider value={item}>
                <ViewTaskModal />
                <Checkbox colorScheme="green" />
                <EditTaskModal />
                <DeleteTaskModal />
              </TaskInfoContext.Provider>
            </Stack>
          </Grid>
          {items.length - 1 !== index && <Divider m={0} />}
        </Fragment>
      ))}
    </VStack>
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
