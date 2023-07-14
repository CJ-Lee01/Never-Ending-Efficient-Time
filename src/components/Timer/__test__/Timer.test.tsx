import {
  fireEvent,
  getAllByTestId,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import StopwatchTab from "../StopwatchTab";
import Timers from "../Timers";

// Unit Testing

// export interface TimerDataType {
// id?: number;
// user_id?: string;
// title: string;
// intervals: number;
// totalSeconds: number;
// totalSecondsTwo?: number;
// intervalName?: string;
// intervalNameTwo?: string;
//   }

const timer1 = { id: 1, title: "string", intervals: 1, totalSeconds: 3700 };
const timer2 = { id: 1, title: "string", intervals: 1, totalSeconds: 3600 };

const mockTimerData = [timer1, timer2];

describe("Timer Tab Rendering", () => {
  it("should render the add interval button", () => {
    render(
      <Timers
        TimerList={mockTimerData}
        handleTimerStart={() => {}}
        handleContinueInterval={() => {}}
        pageUpdater={() => {}}
      />
    );
    const addIntervalButton = screen.getByTestId("addIntervalButton");
    expect(addIntervalButton).toBeInTheDocument();
  });

  // Depends on context. Need to find out out to test useContext
  //   it("should render the next interval button as disabled", () => {
  //     render(
  //       <Timers
  //         TimerList={mockTimerData}
  //         handleTimerStart={() => {}}
  //         handleContinueInterval={() => {}}
  //         pageUpdater={() => {}}
  //       />
  //     );
  //     const nextIntervalButton = screen.getByTestId("nextIntervalButton");
  //     expect(nextIntervalButton).toBeDisabled();
  //   });

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
});
