import { Stack, Button } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { TimerDataContext } from "@/app/(User supposed to see if logged in)/timer/page";

interface TimeToggleButtonsProps {}

const TimeToggleButtons: FC<TimeToggleButtonsProps> = ({}) => {
  const {
    isStopwatchStart,
    setStopwatchStart,
    setTimerStart,
    isTimerStart,
    setCounterSeconds,
    timerData,
    setTimerData,
  } = useContext(TimerDataContext);

  const handleClockStop = () => {
    setStopwatchStart(false);
    setTimerStart(false);
  };

  const handleClockReset = () => {
    setStopwatchStart(false);
    setTimerStart(false);
    setCounterSeconds(0);
    setTimerData({
      title: "Select a Timer",
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
        <Button width={"300px"} onClick={handleClockStop}>
          Stop
        </Button>
        <Button
          bg={"red.500"}
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
