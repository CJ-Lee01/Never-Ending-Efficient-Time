import { FC, useContext, useState } from "react";
import { Button, Stack, Spacer } from "@chakra-ui/react";
import { TimerDataContext } from "@/app/(User supposed to see if logged in)/timer/page";
import { TimerDataType, LapDataType } from "@/lib/types";
import Laps from "./Laps";

interface StopwatchTabProps {}

const StopwatchTab: FC<StopwatchTabProps> = ({}) => {
  const {
    isStopwatchStart,
    setStopwatchStart,
    counterSeconds,
    setCounterSeconds,
    setCounterIntervals,
    isTimerStart,
    timerData,
    setTimerData,
  } = useContext(TimerDataContext);

  const [LapsList, setLapsList] = useState(LapList);

  const handleStopwatchStart = () => {
    if (!isStopwatchStart) {
      setTimerData({
        title: "Stopwatch",
        intervals: 1,
        totalSeconds: 0,
        intervalName: "-",
      });
      setCounterIntervals(1);
      setCounterSeconds(0);
      setStopwatchStart(true);
      LapList = [];
      setLapsList((prev) => []);
    }
  };

  const handleLapClick = () => {
    LapList.push({ totalSeconds: counterSeconds });
    setLapsList((prev) => LapList);
  };

  return (
    <Stack direction="column">
      <Laps LapsList={LapsList} />
      <Spacer></Spacer>

      <Button
        bg={"green.400"}
        color={"white"}
        onClick={handleStopwatchStart}
        isDisabled={isStopwatchStart || isTimerStart ? true : false}
      >
        Start
      </Button>
      <Button
        bg="orange.300"
        color="white"
        isDisabled={isTimerStart ? true : false}
        onClick={handleLapClick}
      >
        Lap
      </Button>
    </Stack>
  );
};

let LapList: LapDataType[] = [];

export default StopwatchTab;
