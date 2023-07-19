import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import StopwatchTab from "../StopwatchTab";
import Timers from "../Timers";
import TimerDataContextProvider from "../TimerDataContextProvider";
import Clock from "../Clock";
import ClockPage from "../ClockPage";
import AddTimerModal from "../AddTimerModal";
import TimerTab from "../TimerTab";
import ClockTicker from "../ClockTicker";

jest.mock("../../../lib/CRUD_Timers.ts");

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

  it("should render the with the API call", () => {
    render(
      <TimerDataContextProvider>
        <TimerTab></TimerTab>
      </TimerDataContextProvider>
    );
    const timerArray = screen.getAllByTestId("timerItem");
    expect(timerArray.length).toBe(3);
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

  it("should add timer properly when add Timer Button clicked", async () => {
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

    const addTimerButton = screen.getByTestId("addTimerButton");
    expect(addTimerButton).toBeInTheDocument();
    fireEvent.click(addTimerButton);
    const addTimerTitle = screen.getByTestId("addTimerTitle");
    expect(addTimerTitle).toBeInTheDocument();
    fireEvent.change(addTimerTitle, { target: { value: "Test" } });
    const addTimerIntervalTitle = screen.getByTestId("addTimerIntervalTitle");
    expect(addTimerIntervalTitle).toBeInTheDocument();
    fireEvent.change(addTimerIntervalTitle, { target: { value: "Tester" } });
    const addTimerIntervalSec = screen.getByLabelText("Seconds");
    expect(addTimerIntervalSec).toBeInTheDocument();
    fireEvent.change(addTimerIntervalSec, { target: { value: 1 } });
    const addTimerSave = screen.getByTestId("addTimerSave");
    expect(addTimerSave).toBeInTheDocument();
    fireEvent.click(addTimerSave);
    await waitFor(() => {
      expect(addTimerButton).toBeInTheDocument();
    });
  });
});

// Integration Testing

describe("Timer Functionality Testing", () => {
  it("should start timer when timer start button is pressed", () => {
    render(
      <TimerDataContextProvider>
        <ClockTicker setIsTimeUp={jest.fn}></ClockTicker>
        <TimerTab></TimerTab>
      </TimerDataContextProvider>
    );
    const timerItemStartButton = screen.getAllByTestId("timerItemStartButton");
    fireEvent.click(timerItemStartButton[0]);
    const secondText = screen.getByTestId("secondText");
    expect(secondText).not.toHaveTextContent("00");
  });

  it("should change timer title when timer start button is pressed", () => {
    render(
      <TimerDataContextProvider>
        <ClockTicker setIsTimeUp={jest.fn}></ClockTicker>
        <TimerTab></TimerTab>
      </TimerDataContextProvider>
    );
    const timerItemStartButton = screen.getAllByTestId("timerItemStartButton");
    fireEvent.click(timerItemStartButton[0]);
    const timerTitle = screen.getByTestId("timerTitle");
    expect(timerTitle).not.toHaveTextContent("No Timer Selected");
  });

  it("should change total timer intervals when timer start button is pressed", () => {
    render(
      <TimerDataContextProvider>
        <ClockTicker setIsTimeUp={jest.fn}></ClockTicker>
        <TimerTab></TimerTab>
      </TimerDataContextProvider>
    );
    const timerItemStartButton = screen.getAllByTestId("timerItemStartButton");
    fireEvent.click(timerItemStartButton[0]);
    const timerIntervals = screen.getByTestId("timerIntervals");
    expect(timerIntervals).not.toHaveTextContent("0/0");
  });

  it("should enable pause button and disable start button when timer start button is pressed, pause changes to resume when pause button pressed", () => {
    render(
      <TimerDataContextProvider>
        <ClockTicker setIsTimeUp={jest.fn}></ClockTicker>
        <TimerTab></TimerTab>
      </TimerDataContextProvider>
    );

    const pauseButton = screen.getByTestId("pauseButton");
    expect(pauseButton).toBeDisabled();
    const resetButton = screen.getByTestId("resetButton");
    expect(resetButton).not.toBeDisabled();
    const timerItemStartButton = screen.getAllByTestId("timerItemStartButton");
    fireEvent.click(timerItemStartButton[0]);
    expect(pauseButton).not.toBeDisabled();
    fireEvent.click(pauseButton);
    expect(pauseButton).toHaveTextContent("Resume");
    expect(timerItemStartButton[0]).toBeDisabled();
  });
});
