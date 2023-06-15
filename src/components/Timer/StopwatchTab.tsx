import { FC, useContext, useState } from "react";
import { Button, Stack, Spacer, useColorModeValue } from "@chakra-ui/react";
import { TimerDataContext } from "./TimerDataContextProvider";
import { LapDataType } from "@/lib/types";
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
        isDisabled={isTimerStart || !isStopwatchStart ? true : false}
        _focus={{
          outline: "none",
          bg: useColorModeValue("orange.300", "orange.400"),
        }}
        onClick={handleLapClick}
      >
        Lap
      </Button>
    </Stack>
  );
};

let LapList: LapDataType[] = [];

export default StopwatchTab;
