import { Grid, Stack, chakra, Checkbox, useColorModeValue } from "@chakra-ui/react";
import { ChangeEvent, FC, useContext } from "react";
import DeleteTaskModal from "./DeleteTaskModal";
import EditTaskModal from "./EditTaskModal";
import { TaskInfoContext } from "./Tasks";
import ViewTaskModal from "./ViewTaskModal";
import { TasksInformation } from "@/lib/types";
import { editTask } from "@/lib/CRUD_Tasks";

const TaskComponent: FC<{ }> = ({ }) => {
  const { task, pageUpdater } = useContext(TaskInfoContext)
  const bgColorScheme = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const displayDate = task.deadline.valueOf() == (new Date("9999-12-12").valueOf())
    ? "No deadline"
    : task.deadline.toLocaleString();

  const checkHandler = (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      editTask({
        ...task,
        is_complete: !task.is_complete,
      });
    };


  return <Grid
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
        {task.title}
      </chakra.h3>
      <chakra.p fontWeight="medium" fontSize="sm" color={textColor}>
        Deadline: {displayDate}
      </chakra.p>
    </Stack>
    <Stack
      spacing={{ base: 5, md: 4 }}
      direction="row"
      fontSize={{ base: "sm", sm: "md" }}
      justifySelf="flex-end"
      alignItems="center"
    >
        <ViewTaskModal />
        <Checkbox
          colorScheme="green"
          defaultChecked={task.is_complete}
          onChange={checkHandler}
        />
        <EditTaskModal />
        <DeleteTaskModal />
    </Stack>
  </Grid>
}

export default TaskComponent;