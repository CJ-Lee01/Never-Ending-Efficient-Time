import { FC, useContext, useEffect, useState } from "react";
import { TimerDataContext } from "./TimerDataContextProvider";
import { TimerDataType } from "@/lib/types";
import Timers from "./Timers";
import { getTimers } from "@/lib/CRUD_Timers";
import { PostgrestError } from "@supabase/supabase-js";

interface TimerTabProps {}

const TimerTab: FC<TimerTabProps> = () => {
  const [timerList, setTimerList] = useState<{
    data: TimerDataType[] | null;
    error: PostgrestError | null;
  }>({
    data: null,
    error: null,
  });

  const [dummy, updateList] = useState<boolean>(false); //just a gimmick to ensure that the page is rerendered.
  const pageUpdater = () => updateList(x => !x);

  // Triggers when timerList changes.
  useEffect(() => {
    getTimers(setTimerList);
  }, [dummy]);

  const {
    isStopwatchStart,
    setTimerStart,
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
      pageUpdater={pageUpdater}
    />
  );
};

export default TimerTab;
