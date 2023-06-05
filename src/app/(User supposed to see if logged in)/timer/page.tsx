"use client";

import { Stack } from "@chakra-ui/react";
import Clock from "@/components/Timer/Clock";
import TimerSettings from "@/components/Timer/TimerSettings";
import { useState, useEffect, useContext, createContext } from "react";
import { TimerDataType } from "@/lib/types";

const dummyTime: TimerDataType = {
  title: "Default Timer",
  totalSeconds: 36210,
};

export const TimerDataContext = createContext<{
  isStopwatchStart: boolean;
  setStopwatchStart: (isStopwatchStart: boolean) => void;
  setTimerStart: (isTimerStart: boolean) => void;
  isTimerStart: boolean;
  setCounterSeconds: (seconds: number) => void;
  timerData: TimerDataType;
  setTimerData: (timerData: TimerDataType) => void;
}>({
  isStopwatchStart: false,
  setStopwatchStart: () => {},
  setTimerStart: () => {},
  isTimerStart: false,
  setCounterSeconds: () => {},
  timerData: dummyTime,
  setTimerData: () => {},
});

export default function TimerPage() {
  const [isStopwatchStart, setStopwatchStart] = useState<boolean>(false);
  const [isTimerStart, setTimerStart] = useState<boolean>(false);
  const [timerData, setTimerData] = useState<TimerDataType>(dummyTime);
  const [counterSeconds, setCounterSeconds] = useState<number>(
    timerData.totalSeconds
  );

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
    }

    return () => clearInterval(interval);
  }, [isStopwatchStart, isTimerStart, counterSeconds]);

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
      }}
    >
      <Stack
        justify={"center"}
        spacing={{ base: 20, xl: 36 }}
        py={{ base: 20, md: 28 }}
        px={{ base: 5, xl: 10 }}
        direction={{ base: "column", xl: "row" }}
      >
        <Clock counterSeconds={counterSeconds} />
        <TimerSettings />
      </Stack>
    </TimerDataContext.Provider>
  );
}
