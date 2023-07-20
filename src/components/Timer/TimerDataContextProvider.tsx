"use client";

import { TimerDataType } from "@/lib/types";
import { FC, createContext, useState } from "react";
import { dummyTimer } from "./DummyTimer";

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
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
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
  isPaused: false,
  setIsPaused: () => {},
});

interface TimerDataContextProviderProps {
  children: React.ReactNode;
}

const TimerDataContextProvider: FC<TimerDataContextProviderProps> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
  const [isPaused, setIsPaused] = useState<boolean>(false);

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
        isPaused: isPaused,
        setIsPaused: setIsPaused,
      }}
    >
      {children}
    </TimerDataContext.Provider>
  );
};

export default TimerDataContextProvider;
