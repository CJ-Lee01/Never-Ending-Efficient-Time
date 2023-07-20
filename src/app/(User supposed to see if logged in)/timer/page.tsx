"use client";
import TimerDataContextProvider from "@/components/Timer/TimerDataContextProvider";
import ClockPage from "@/components/Timer/ClockPage";

export default function TimerPage() {
  return (
    <TimerDataContextProvider>
      <ClockPage></ClockPage>
    </TimerDataContextProvider>
  );
}
