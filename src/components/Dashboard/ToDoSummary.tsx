import { useEffect, useState } from "react";
import {
  Container,
  chakra,
  Flex,
  Stack,
  CircularProgress,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { TasksInformation } from "@/lib/types";
import { PostgrestError } from "@supabase/supabase-js";
import { getTasks } from "@/lib/CRUD_Tasks";

// Returns an Array of 3 items (number of Tasks, Completed tasks, incomplete tasks)
function getTasksSummary(tasks: TasksInformation[] | null): number[] {
  let completedCounter = 0;
  let incompleteCounter = 0;

  if (tasks == null) {
    return [0, 0, 0];
  }
  let len = tasks?.length;

  for (let i = 0; i < len; i++) {
    if (tasks[i].is_complete) {
      completedCounter++;
    } else {
      incompleteCounter++;
    }
  }
  return [len, completedCounter, incompleteCounter];
}

// Calculates the value for the CircularProgress
export function calculateTaskPercentage(taskSummaryArray: number[]): number {
  const len = taskSummaryArray[0];
  const completedCounter = taskSummaryArray[1];

  const percentage = (completedCounter / len) * 100;
  return percentage;
}

const ToDoSummary = () => {
  const [taskList, setTaskList] = useState<{
    data: TasksInformation[];
    error: PostgrestError | null;
  }>({
    data: [],
    error: null,
  });

  useEffect(() => {
    getTasks(setTaskList);
  }, []);

  const taskSummaryArray = getTasksSummary(taskList.data);
  const percentage = calculateTaskPercentage(taskSummaryArray);

  return (
    <Container maxW="5xl" p={{ base: 2, md: 10 }}>
      <Flex justify="center" mb={3} gap={16}>
        <chakra.h3 fontSize="2xl" fontWeight="bold">
          Tasks Summary
        </chakra.h3>
      </Flex>
      <Stack
        bg={useColorModeValue("gray.50", "gray.700")}
        direction={"row"}
        align={"center"}
        borderRadius={10}
        borderWidth={2}
        p={4}
        justify={"center"}
      >
        <CircularProgress
          value={percentage}
          size={64}
          color="green.400"
          trackColor="gray.300"
          thickness={12}
        />
        <Stack direction={"column"} pl={{ base: 5, md: 10 }}>
          <Text
            fontSize={{ base: "lg", sm: "xl" }}
            fontWeight={"bold"}
            data-testid="totalTasksText"
          >
            You have {taskSummaryArray[0]} tasks :
          </Text>
          <Text fontSize={{ base: "md", sm: "lg" }}>
            <Text
              as="span"
              color={"green.300"}
              fontSize={"2xl"}
              pr={2}
              data-testid="completedTasksText"
            >
              {taskSummaryArray[1]}
            </Text>
            Tasks Completed
          </Text>
          <Text fontSize={{ base: "md", sm: "lg" }}>
            <Text
              as="span"
              color={"red.400"}
              fontSize={"2xl"}
              pr={2}
              data-testid="incompleteTasksText"
            >
              {taskSummaryArray[2]}
            </Text>
            Tasks Incomplete
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ToDoSummary;
