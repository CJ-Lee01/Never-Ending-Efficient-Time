import { FC, useContext } from "react";
import { Button, Stack } from "@chakra-ui/react";
import { TimerDataContext } from "@/app/(User supposed to see if logged in)/timer/page";

interface StopwatchTabProps {}

const StopwatchTab: FC<StopwatchTabProps> = ({}) => {
  const {
    isStopwatchStart,
    setStopwatchStart,
    setCounterSeconds,
    isTimerStart,
    timerData,
    setTimerData,
  } = useContext(TimerDataContext);

  const handleStopwatchStart = () => {
    if (isTimerStart) {
      alert("Timer is running!");
      return;
    }
    if (!isStopwatchStart) {
      setTimerData({ title: "Stopwatch", totalSeconds: 0 });
      setCounterSeconds(0);
      setStopwatchStart(true);
    } else {
      alert("Stopwatch is running!");
    }
  };

  return (
    <Stack>
      <Button bg={"green.400"} color={"white"} onClick={handleStopwatchStart}>
        Start
      </Button>
      <Button bg="orange.300" color="white">
        Lap
      </Button>
    </Stack>
  );
};

export default StopwatchTab;
