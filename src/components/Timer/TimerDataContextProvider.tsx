import { TimerDataType } from "@/lib/types";
import { FC, createContext, useEffect, useState } from "react";
import { dummyTimer } from "./DummyTimer";
import { Stack } from "@chakra-ui/react";
import Clock from "./Clock";
import TimerSettings from "./TimerSettings";

// Context to share with the rest of the Components
export const TimerDataContext = createContext<{
  isStopwatchStart: boolean;
  setStopwatchStart: React.Dispatch<React.SetStateAction<boolean>>;
  setTimerStart: React.Dispatch<React.SetStateAction<boolean>>;
  isTimerStart: boolean;
  counterSeconds: number;
  setCounterSeconds: React.Dispatch<React.SetStateAction<number>>;
  timerData: TimerDataType;
  setTimerData: React.Dispatch<React.SetStateAction<TimerDataType>>;
  counterIntervals: number;
  setCounterIntervals: React.Dispatch<React.SetStateAction<number>>;
  isIntervalComplete: boolean;
  setIntervalComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setIntervalTitle: React.Dispatch<React.SetStateAction<string>>;
  intervalTitle: string;
}>({
  isStopwatchStart: false,
  setStopwatchStart: () => {},
  setTimerStart: () => {},
  isTimerStart: false,
  counterSeconds: 0,
  setCounterSeconds: () => {},
  timerData: dummyTimer,
  setTimerData: () => {},
  counterIntervals: 0,
  setCounterIntervals: () => {},
  isIntervalComplete: false,
  setIntervalComplete: () => {},
  setIntervalTitle: () => {},
  intervalTitle: "",
});

interface TimerDataContextProviderProps {}

const TimerDataContextProvider: FC<TimerDataContextProviderProps> = ({}) => {
  // Declaring the States for the Context
  const [isStopwatchStart, setStopwatchStart] = useState<boolean>(false);
  const [isTimerStart, setTimerStart] = useState<boolean>(false);
  const [timerData, setTimerData] = useState<TimerDataType>(dummyTimer);
  const [counterSeconds, setCounterSeconds] = useState<number>(
    timerData.totalSeconds
  );
  const [counterIntervals, setCounterIntervals] = useState<number>(0);
  const [isIntervalComplete, setIntervalComplete] = useState<boolean>(true);
  const [intervalTitle, setIntervalTitle] = useState<string>("-");

  //Implementing the Clock Functionality to decrease and increase the time
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
      alert("Time's up!");
      if (counterIntervals < timerData.intervals) {
        setCounterIntervals(counterIntervals + 1);
        setIntervalTitle("Press Next to continue");
      } else {
        setIntervalComplete(true);
      }
    }

    return () => clearInterval(interval);
  }, [isStopwatchStart, isTimerStart, counterSeconds, counterIntervals]);

  return (
    <TimerDataContext.Provider
      value={{
        isStopwatchStart: isStopwatchStart,
        setStopwatchStart: setStopwatchStart,
        setTimerStart: setTimerStart,
        isTimerStart: isTimerStart,
        counterSeconds: counterSeconds,
        setCounterSeconds: setCounterSeconds,
        timerData: timerData,
        setTimerData: setTimerData,
        counterIntervals: counterIntervals,
        setCounterIntervals: setCounterIntervals,
        isIntervalComplete: isIntervalComplete,
        setIntervalComplete: setIntervalComplete,
        setIntervalTitle: setIntervalTitle,
        intervalTitle: intervalTitle,
      }}
    >
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
    </TimerDataContext.Provider>
  );
};

export default TimerDataContextProvider;
