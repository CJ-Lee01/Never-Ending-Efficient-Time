import { Stack } from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import Clock from "./Clock";
import TimeUpModal from "./TimeUpModal";
import { TimerDataContext } from "./TimerDataContextProvider";
import TimerSettings from "./TimerSettings";

interface ClockPageProps {}

const ClockPage: FC<ClockPageProps> = ({}) => {
  const {
    isIntervalComplete,
    setIntervalComplete,
    isStopwatchStart,
    isTimerStart,
    setTimerStart,
    timerData,
    setTimerData,
    isPaused,
    intervalTitle,
    counterSeconds,
    setCounterSeconds,
    counterIntervals,
    setCounterIntervals,
    setIntervalTitle,
  } = useContext(TimerDataContext);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  // Use Effect to render the time change for the Clock
  useEffect(() => {
    const interval = setInterval(() => {
      if (isStopwatchStart) {
        setCounterSeconds((prev) => prev + 1);
      }

      if (isTimerStart && counterSeconds != 0) {
        setCounterSeconds((prev) => prev - 1);
      }
    }, 1000);

    if (isTimerStart && counterSeconds == 0) {
      setTimerStart(false);

      setIsTimeUp(true);
      if (counterIntervals < timerData.intervals) {
        setCounterIntervals(counterIntervals + 1);
        // setIntervalTitle("Press Next to continue");
      } else {
        setIntervalComplete(true);
      }
    }

    return () => clearInterval(interval);
  }, [isStopwatchStart, isTimerStart, counterSeconds, counterIntervals]);

  return (
    <>
      <TimeUpModal
        isTimeUp={isTimeUp}
        setIsTimeUp={setIsTimeUp}
        intervalTitle={intervalTitle}
        isIntervalComplete={isIntervalComplete}
      ></TimeUpModal>
      <Stack
        justify={"center"}
        spacing={{ base: 20, xl: 36 }}
        py={{ base: 20, md: 28 }}
        px={{ base: 5, xl: 8 }}
        direction={{ base: "column", xl: "row" }}
      >
        <Clock
          counterSeconds={counterSeconds}
          counterIntervals={counterIntervals}
          intervalTitle={intervalTitle}
        />
        <TimerSettings />
      </Stack>
    </>
  );
};

export default ClockPage;
