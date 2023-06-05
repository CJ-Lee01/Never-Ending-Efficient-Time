"use client";

import { Stack } from "@chakra-ui/react";
import Clock from "@/components/Timer/Clock";
import TimerSettings from "@/components/Timer/TimerSettings";
import { useState, useEffect, useContext, createContext } from "react";
import { TimerDataType } from "@/lib/types";

const dummyTime: TimerDataType = {
  title: "No Timer Selected",
  intervals: 0,
  totalSeconds: 0,
  intervalName: "-",
};

export const TimerDataContext = createContext<{
  isStopwatchStart: boolean;
  setStopwatchStart: (isStopwatchStart: boolean) => void;
  setTimerStart: (isTimerStart: boolean) => void;
  isTimerStart: boolean;
  setCounterSeconds: (seconds: number) => void;
  timerData: TimerDataType;
  setTimerData: (timerData: TimerDataType) => void;
  counterIntervals: number;
  setCounterIntervals: (intervals: number) => void;
  isIntervalComplete: boolean;
  setIntervalComplete: (bool: boolean) => void;
  setIntervalTitle: (str: string) => void;
}>({
  isStopwatchStart: false,
  setStopwatchStart: () => {},
  setTimerStart: () => {},
  isTimerStart: false,
  setCounterSeconds: () => {},
  timerData: dummyTime,
  setTimerData: () => {},
  counterIntervals: 0,
  setCounterIntervals: () => {},
  isIntervalComplete: false,
  setIntervalComplete: () => {},
  setIntervalTitle: () => {},
});

export default function TimerPage() {
  const [isStopwatchStart, setStopwatchStart] = useState<boolean>(false);
  const [isTimerStart, setTimerStart] = useState<boolean>(false);
  const [timerData, setTimerData] = useState<TimerDataType>(dummyTime);
  const [counterSeconds, setCounterSeconds] = useState<number>(
    timerData.totalSeconds
  );
  const [counterIntervals, setCounterIntervals] = useState<number>(0);
  const [isIntervalComplete, setIntervalComplete] = useState<boolean>(true);
  const [intervalTitle, setIntervalTitle] = useState<string>("-");

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
        setCounterSeconds: setCounterSeconds,
        timerData: timerData,
        setTimerData: setTimerData,
        counterIntervals: counterIntervals,
        setCounterIntervals: setCounterIntervals,
        isIntervalComplete: isIntervalComplete,
        setIntervalComplete: setIntervalComplete,
        setIntervalTitle: setIntervalTitle,
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
}
