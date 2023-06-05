import { FC, useContext } from "react";
import { Button, Stack, Spacer } from "@chakra-ui/react";
import { TimerDataContext } from "@/app/(User supposed to see if logged in)/timer/page";
import { TimerDataType } from "@/lib/types";
import Laps from "./Laps";

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
      setTimerData({
        title: "Stopwatch",
        intervals: 1,
        totalSeconds: 0,
        intervalName: "-",
      });
      setCounterSeconds(0);
      setStopwatchStart(true);
    } else {
      alert("Stopwatch is running!");
    }
  };

  return (
    <Stack direction="column">
      <Laps LapList={LapList} />
      <Spacer></Spacer>

      <Button bg={"green.400"} color={"white"} onClick={handleStopwatchStart}>
        Start
      </Button>
      <Button bg="orange.300" color="white">
        Lap
      </Button>
    </Stack>
  );
};

const LapList: TimerDataType[] = [
  {
    title: "Pomodoro Timer",
    intervals: 4,
    totalSeconds: 36210,
  },
];

export default StopwatchTab;
