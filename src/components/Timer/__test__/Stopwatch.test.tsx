import {
  fireEvent,
  getAllByTestId,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import StopwatchTab from "../StopwatchTab";
import Clock from "../Clock";
import TimerDataContextProvider, {
  TimerDataContext,
} from "../TimerDataContextProvider";
import Laps from "../Laps";
import ClockPage from "../ClockPage";
import { act } from "react-dom/test-utils";

// Unit Testing

describe("Stopwatch Tab Rendering", () => {
  it("should render the stopwatch start button", () => {
    render(<StopwatchTab />);
    const stopwatchStartButton = screen.getByTestId("stopwatchStartButton");
    expect(stopwatchStartButton).toBeInTheDocument();
  });

  it("should render the lap button as disabled", () => {
    render(<StopwatchTab />);
    const lapButton = screen.getByTestId("lapButton");
    expect(lapButton).toBeDisabled();
  });
});

const MockLapList = [{ totalSeconds: 3700 }, { totalSeconds: 3880 }];

describe("Lap Rendering", () => {
  it("should render added laps", () => {
    render(<Laps LapsList={MockLapList}></Laps>);
    const LapArray = screen.getAllByTestId("lapItem");
    expect(LapArray.length).toBe(2);
  });
});

// Integration Testing

// Gives this error when run using normal jest, most possibly due to tests running in parallel. Error disappears when run with --detectOpenHandles which run tests sequentially.
// A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles
// to find leaks. Active timers can also cause this, ensure that .unref() was called on them.

describe("Stopwatch functionality testing", () => {
  it("should disable and enable respective buttons when the start button is pressed", () => {
    const pauseMock = jest.fn();
    HTMLAudioElement.prototype.pause = pauseMock;
    render(
      <TimerDataContextProvider>
        <ClockPage />
      </TimerDataContextProvider>
    );

    const stopwatchStartButton = screen.getByTestId("stopwatchStartButton");
    const pauseButton = screen.getByTestId("pauseButton");
    const lapButton = screen.getByTestId("lapButton");
    expect(lapButton).toBeDisabled();
    expect(pauseButton).toBeDisabled();
    expect(stopwatchStartButton).not.toBeDisabled();
    fireEvent.click(stopwatchStartButton);
    expect(stopwatchStartButton).toBeDisabled();
    expect(lapButton).not.toBeDisabled();
    fireEvent.click(pauseButton);
    expect(stopwatchStartButton).not.toBeDisabled();
    expect(pauseButton).toHaveTextContent("Resume");
  });

  it("should start the stopwatch when the start button is pressed and reset when reset button is pressed", () => {
    const pauseMock = jest.fn();
    HTMLAudioElement.prototype.pause = pauseMock;
    render(
      <TimerDataContextProvider>
        <ClockPage />
      </TimerDataContextProvider>
    );

    const stopwatchStartButton = screen.getByTestId("stopwatchStartButton");
    const resetButton = screen.getByTestId("resetButton");
    const timerTitle = screen.getByTestId("timerTitle");
    expect(resetButton).not.toBeDisabled();
    expect(stopwatchStartButton).not.toBeDisabled();
    expect(timerTitle).toHaveTextContent("No Timer Selected");
    fireEvent.click(stopwatchStartButton);
    expect(stopwatchStartButton).toBeDisabled();
    expect(resetButton).not.toBeDisabled();
    expect(timerTitle).toHaveTextContent("Stopwatch");
    fireEvent.click(resetButton);
    expect(stopwatchStartButton).not.toBeDisabled();
    expect(resetButton).not.toBeDisabled();
  });
});
