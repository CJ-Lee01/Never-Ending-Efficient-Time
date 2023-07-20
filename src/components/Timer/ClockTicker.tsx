import { Dispatch, FC, SetStateAction, useContext, useEffect } from "react";
import { TimerDataContext } from "./TimerDataContextProvider";
import Clock from "./Clock";

interface ClockTickerProps {
  setIsTimeUp: Dispatch<SetStateAction<boolean>>;
}

const ClockTicker: FC<ClockTickerProps> = ({ setIsTimeUp }) => {
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
    <Clock
      counterSeconds={counterSeconds}
      counterIntervals={counterIntervals}
      intervalTitle={intervalTitle}
    />
  );
};

export default ClockTicker;
