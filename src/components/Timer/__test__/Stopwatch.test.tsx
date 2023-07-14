import {
  fireEvent,
  getAllByTestId,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import StopwatchTab from "../StopwatchTab";
import Clock from "../Clock";
import TimerDataContextProvider from "../TimerDataContextProvider";
import Laps from "../Laps";

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

// describe("Stopwatch functionality testing", () => {
//   jest.useFakeTimers();
//   it("should start the clock when start button pressed", () => {
//     render(<TimerDataContextProvider />);
//     const stopwatchStartButton = screen.getByTestId("stopwatchStartButton");
//     const secondText = screen.getByTestId("secondText");
//     fireEvent.click(stopwatchStartButton);
//     jest.advanceTimersByTime(2000);
//     expect(secondText).not.toHaveTextContent("00");
//     expect(secondText).toBeInTheDocument();
//   });
// });
