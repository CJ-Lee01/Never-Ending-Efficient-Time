import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StopwatchTab from "../StopwatchTab";
import Timers from "../Timers";
import TimerDataContextProvider from "../TimerDataContextProvider";
import Clock from "../Clock";
import ClockPage from "../ClockPage";
import AddTimerModal from "../AddTimerModal";

// Unit Testing

const timer1 = { id: 1, title: "string", intervals: 1, totalSeconds: 3700 };
const timer2 = { id: 2, title: "string", intervals: 1, totalSeconds: 3600 };

const mockTimerData = [timer1, timer2];

describe("Timer Tab Rendering", () => {
  it("should render the add timer button", () => {
    render(
      <Timers
        TimerList={mockTimerData}
        handleTimerStart={() => {}}
        handleContinueInterval={() => {}}
        pageUpdater={() => {}}
      />
    );
    const addTimerButton = screen.getByTestId("addTimerButton");
    expect(addTimerButton).toBeInTheDocument();
  });

  it("should render the timers", () => {
    render(
      <Timers
        TimerList={mockTimerData}
        handleTimerStart={() => {}}
        handleContinueInterval={() => {}}
        pageUpdater={() => {}}
      />
    );
    const timerArray = screen.getAllByTestId("timerItem");
    expect(timerArray.length).toBe(2);
  });

  it("should render the next interval button as disabled", () => {
    const pauseMock = jest.fn();
    HTMLAudioElement.prototype.pause = pauseMock;
    render(
      <TimerDataContextProvider>
        <Timers
          TimerList={mockTimerData}
          handleTimerStart={() => {}}
          handleContinueInterval={() => {}}
          pageUpdater={() => {}}
        />
      </TimerDataContextProvider>
    );

    const nextIntervalButton = screen.getByTestId("nextIntervalButton");
    expect(nextIntervalButton).toBeDisabled();
  });

  // Gives this error when run using normal jest, most possibly due to tests running in parallel. Error disappears when run with --detectOpenHandles which run tests sequentially.
  // A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles
  // to find leaks. Active timers can also cause this, ensure that .unref() was called on them.

  it("should render Add Timer Modal properly when add Timer Button clicked", () => {
    render(
      <Timers
        TimerList={mockTimerData}
        handleTimerStart={() => {}}
        handleContinueInterval={() => {}}
        pageUpdater={() => {}}
      />
    );
    const addTimerButton = screen.getByTestId("addTimerButton");
    expect(addTimerButton).toBeInTheDocument();
    fireEvent.click(addTimerButton);
    const addTimerTitle = screen.getByTestId("addTimerTitle");
    expect(addTimerTitle).toBeInTheDocument();
    const addTimerIntervalTitle = screen.getByTestId("addTimerIntervalTitle");
    expect(addTimerIntervalTitle).toBeInTheDocument();
    const addTimerIntervalSec = screen.getByLabelText("Seconds");
    expect(addTimerIntervalSec).toBeInTheDocument();
    const addTimerSave = screen.getByTestId("addTimerSave");
    expect(addTimerSave).toBeInTheDocument();
  });

  // it("should add timer properly when add Timer Button clicked", () => {
  //   render(
  //     <TimerDataContextProvider>
  //       <ClockPage />
  //     </TimerDataContextProvider>
  //   );
  //   const addTimerButton = screen.getByTestId("addTimerButton");
  //   expect(addTimerButton).toBeInTheDocument();
  //   fireEvent.click(addTimerButton);
  //   const addTimerTitle = screen.getByTestId("addTimerTitle");
  //   expect(addTimerTitle).toBeInTheDocument();
  //   fireEvent.change(addTimerTitle, { target: { value: "Test" } });
  //   const addTimerIntervalTitle = screen.getByTestId("addTimerIntervalTitle");
  //   expect(addTimerIntervalTitle).toBeInTheDocument();
  //   fireEvent.change(addTimerIntervalTitle, { target: { value: "Tester" } });
  //   const addTimerIntervalSec = screen.getByLabelText("Seconds");
  //   expect(addTimerIntervalSec).toBeInTheDocument();
  //   fireEvent.change(addTimerIntervalSec, { target: { value: 1 } });
  //   const addTimerSave = screen.getByTestId("addTimerSave");
  //   expect(addTimerSave).toBeInTheDocument();
  //   fireEvent.click(addTimerSave);
  // });
});
