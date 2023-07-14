import {
  Stack,
  VStack,
  Grid,
  chakra,
  Button,
  Divider,
  Spacer,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { Dispatch, FC, Fragment, SetStateAction, useContext } from "react";
import AddTimerModal from "./AddTimerModal";
import DeleteTimerModal from "./DeleteTimerModal";
import EditTimerModal from "./EditTimerModal";
import { TimerDataType } from "@/lib/types";
import { TimerDataContext } from "./TimerDataContextProvider";

interface TimersProps {
  TimerList: TimerDataType[];
  handleTimerStart: (timer: TimerDataType) => void;
  handleContinueInterval: () => void;
  pageUpdater: () => void;
}

const Timers: FC<TimersProps> = ({
  TimerList,
  handleTimerStart,
  handleContinueInterval,
  pageUpdater,
}) => {
  const bgColorScheme = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const { isIntervalComplete, isStopwatchStart, isTimerStart, isPaused } =
    useContext(TimerDataContext);
  return (
    <Stack direction={"column"}>
      <Button
        onClick={() => handleContinueInterval()}
        bg={useColorModeValue("orange.300", "orange.400")}
        _hover={{ bg: useColorModeValue("orange.400", "orange.300") }}
        isDisabled={
          isIntervalComplete || isTimerStart || isPaused ? true : false
        }
        _focus={{ bg: useColorModeValue("orange.300", "orange.400") }}
        data-testid="nextIntervalButton"
      >
        Next Interval
      </Button>
      <VStack
        border="1px solid"
        borderColor="gray.400"
        rounded="md"
        overflow="auto"
        maxHeight="550px"
        spacing={0}
      >
        {TimerList.map((timer, index) => (
          <Fragment key={timer.id}>
            <Grid
              templateRows={{ base: "auto auto", md: "auto" }}
              w="100%"
              templateColumns={{ base: "1fr", sm: "5fr 1fr" }}
              p={{ base: 2, sm: 4 }}
              gap={3}
              _hover={{ bg: bgColorScheme }}
              data-testid="timerItem"
            >
              <Stack>
                <chakra.h3 fontWeight="bold" fontSize="lg">
                  {timer.title}
                </chakra.h3>
                <chakra.p fontWeight="medium" fontSize="sm" color={textColor}>
                  {timer.intervals}{" "}
                  {timer.intervals == 1 ? "Interval" : "Intervals"}
                </chakra.p>
              </Stack>
              <Stack
                spacing={{ base: 5, sm: 4 }}
                direction="row"
                fontSize={{ base: "sm", sm: "md" }}
                justifySelf="flex-end"
                alignItems="center"
              >
                <Button
                  bg={"green.400"}
                  color={"white"}
                  onClick={() => handleTimerStart(timer)}
                  isDisabled={
                    !isIntervalComplete || isStopwatchStart ? true : false
                  }
                >
                  Start
                </Button>
                <EditTimerModal timer={timer} />
                <DeleteTimerModal timer={timer} />
              </Stack>
            </Grid>
            {TimerList.length - 1 !== index && <Divider m={0} />}
          </Fragment>
        ))}
      </VStack>
      <Spacer />
      <Center>
        <AddTimerModal pageUpdater={pageUpdater} />
      </Center>
    </Stack>
  );
};

export default Timers;
