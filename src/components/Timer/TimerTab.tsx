import { FC, useContext, useEffect, useState, createContext } from "react";
import { TimerDataContext } from "@/app/(User supposed to see if logged in)/timer/page";
import { TimerDataType } from "@/lib/types";
import Timers from "./Timers";
import { getTimers } from "@/lib/CRUD_Timers";
import { PostgrestError } from "@supabase/supabase-js";

interface TimerTabProps {}

const TimerTab: FC<TimerTabProps> = ({}) => {
  const [timerList, setTimerList] = useState<{
    data: TimerDataType[] | null;
    error: PostgrestError | null;
  }>({
    data: null,
    error: null,
  });

  useEffect(() => {
    getTimers(setTimerList);
  }, [timerList]);

  const {
    isStopwatchStart,
    setStopwatchStart,
    setTimerStart,
    isTimerStart,
    setCounterSeconds,
    counterIntervals,
    setCounterIntervals,
    timerData,
    setTimerData,
    isIntervalComplete,
    setIntervalComplete,
    setIntervalTitle,
  } = useContext(TimerDataContext);

  const handleTimerStart = (timer: TimerDataType) => {
    if (!isStopwatchStart) {
      setIntervalComplete(false);
      setTimerData(timer);
      setTimerStart(true);
      setCounterSeconds(timer.totalSeconds);
      setCounterIntervals(1);
      setIntervalTitle(timer.intervalName ?? "-");
    } else {
      alert("Please Stop the Stopwatch First!");
    }
  };

  const handleContinueInterval = () => {
    if (isIntervalComplete) {
      return;
    }

    if (counterIntervals % 2 == 0 && timerData.totalSecondsTwo != null) {
      setCounterSeconds(timerData.totalSecondsTwo);
      setTimerStart(true);
      setIntervalTitle(timerData.intervalNameTwo ?? "-");
    } else {
      setCounterSeconds(timerData.totalSeconds);
      setTimerStart(true);
      setIntervalTitle(timerData.intervalName ?? "-");
    }
  };

  return (
    <Timers
      TimerList={timerList.data ?? []}
      handleTimerStart={handleTimerStart}
      handleContinueInterval={handleContinueInterval}
    />
  );
};

export default TimerTab;
