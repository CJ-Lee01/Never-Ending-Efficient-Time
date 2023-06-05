import { FC, Fragment, useContext } from "react";
import {
  chakra,
  VStack,
  Text,
  Divider,
  Button,
  Checkbox,
  Grid,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { TimerDataContext } from "@/app/(User supposed to see if logged in)/timer/page";
import { TimerDataType } from "@/lib/types";
import DeleteTaskModal from "../ToDoList/DeleteTaskModal";
import EditTaskModal from "../ToDoList/EditTaskModal";
import { TaskInfoContext } from "../ToDoList/Tasks";
import ViewTaskModal from "../ToDoList/ViewTaskModal";
import {
  calculateHours,
  calculateMinutes,
  calculateSeconds,
} from "@/lib/timerFunctions";

interface TimerTabProps {}

const TimerTab: FC<TimerTabProps> = ({}) => {
  const bgColorScheme = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const {
    isStopwatchStart,
    setStopwatchStart,
    setTimerStart,
    isTimerStart,
    setCounterSeconds,
    timerData,
    setTimerData,
  } = useContext(TimerDataContext);

  const handleTimerStart = (timerTitle: string, totalSeconds: number) => {
    if (!isStopwatchStart) {
      setTimerData({ title: timerTitle, totalSeconds: totalSeconds });
      setTimerStart(true);
      setCounterSeconds(totalSeconds);
    } else {
      alert("Please Stop the Stopwatch First!");
    }
  };
  return (
    <VStack
      border="1px solid"
      borderColor="gray.400"
      rounded="md"
      overflow="hidden"
      spacing={0}
    >
      {TimerList.map((timer, index) => (
        <Fragment key={timer.title}>
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
                {timer.title}
              </chakra.h3>
              <chakra.p fontWeight="medium" fontSize="sm" color={textColor}>
                2 Cycles, {calculateHours(timer.totalSeconds)} :{" "}
                {calculateMinutes(timer.totalSeconds)} :{" "}
                {calculateSeconds(timer.totalSeconds)}
              </chakra.p>
            </Stack>
            <Stack
              spacing={{ base: 5, md: 4 }}
              direction="row"
              fontSize={{ base: "sm", sm: "md" }}
              justifySelf="flex-end"
              alignItems="center"
            >
              <Button
                bg={"green.400"}
                color={"white"}
                onClick={() =>
                  handleTimerStart(timer.title, timer.totalSeconds)
                }
              >
                Start
              </Button>
            </Stack>
          </Grid>
          {TimerList.length - 1 !== index && <Divider m={0} />}
        </Fragment>
      ))}
    </VStack>
  );
};

const TimerList: TimerDataType[] = [
  {
    title: "Pomodoro Timer",
    totalSeconds: 36210,
  },
];

export default TimerTab;
