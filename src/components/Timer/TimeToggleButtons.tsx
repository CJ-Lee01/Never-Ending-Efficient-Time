import { Stack, Button } from "@chakra-ui/react";
import { FC, useContext, useState } from "react";
import { TimerDataContext } from "@/app/(User supposed to see if logged in)/timer/page";

interface TimeToggleButtonsProps {}

const TimeToggleButtons: FC<TimeToggleButtonsProps> = ({}) => {
  const [resumeState, setResumeState] = useState<"stopwatch" | "timer" | null>(
    null
  );
  const [buttonLabel, setButtonLabel] = useState<"Pause" | "Resume">("Pause");

  const {
    isStopwatchStart,
    setStopwatchStart,
    setTimerStart,
    isTimerStart,
    setCounterSeconds,
    setCounterIntervals,
    setIntervalComplete,
    timerData,
    setTimerData,
  } = useContext(TimerDataContext);

  const handleClockStop = () => {
    if (isStopwatchStart) {
      setResumeState("stopwatch");
      setButtonLabel("Resume");
      setStopwatchStart(false);
    } else if (isTimerStart) {
      console.log(isTimerStart);
      setResumeState("timer");
      setButtonLabel("Resume");
      setTimerStart(false);
    } else if (resumeState == "stopwatch") {
      setStopwatchStart(true);
      setButtonLabel("Pause");
    } else if (resumeState == "timer") {
      setTimerStart(true);
      setButtonLabel("Pause");
    }
  };

  const handleClockReset = () => {
    setResumeState(null);
    setStopwatchStart(false);
    setTimerStart(false);
    setCounterSeconds(0);
    setCounterIntervals(0);
    setIntervalComplete(true);
    setTimerData({
      title: "No Timer Selected",
      intervals: 0,
      totalSeconds: 0,
    });
  };

  return (
    <Stack align={"center"} spacing={5} pt={8}>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justifyContent={"right"}
      >
        <Button
          width={"300px"}
          onClick={handleClockStop}
          bg="grey"
          color="white"
          _hover={{ bg: "gray.500" }}
          isDisabled={
            !isStopwatchStart && !isTimerStart && resumeState == null
              ? true
              : false
          }
        >
          {buttonLabel}
        </Button>
        <Button
          bg={"red.500"}
          _hover={{ bg: "red.600" }}
          color={"white"}
          width={"300px"}
          justifyContent={"center"}
          onClick={handleClockReset}
        >
          Reset
        </Button>
      </Stack>
    </Stack>
  );
};

export default TimeToggleButtons;
