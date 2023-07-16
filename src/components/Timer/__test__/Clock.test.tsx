import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Clock from "../Clock";
import {
  calculateHours,
  calculateMinutes,
  calculateSeconds,
} from "@/lib/timerFunctions";
import TimeToggleButtons from "../TimeToggleButtons";

// Unit Testing

describe("Clock Rendering", () => {
  it("Title should render properly at the start", () => {
    render(<Clock counterSeconds={0} counterIntervals={0} intervalTitle="" />);

    const headingText = screen.getByText(/No Timer Selected/i);
    expect(headingText).toBeInTheDocument();
  });

  it("Hours should render properly at the start", () => {
    render(<Clock counterSeconds={0} counterIntervals={0} intervalTitle="" />);

    const hourText = screen.getByTestId("hourText");
    expect(hourText).toHaveTextContent("00");
  });

  it("Minutes should render properly at the start", () => {
    render(<Clock counterSeconds={0} counterIntervals={0} intervalTitle="" />);

    const minuteText = screen.getByTestId("minuteText");
    expect(minuteText).toHaveTextContent("00");
  });

  it("Seconds should render properly at the start", () => {
    render(<Clock counterSeconds={0} counterIntervals={0} intervalTitle="" />);

    const secondText = screen.getByTestId("secondText");
    expect(secondText).toHaveTextContent("00");
  });

  it("Hours should render properly when time is passed into clock", () => {
    render(
      <Clock counterSeconds={3700} counterIntervals={0} intervalTitle="" />
    );

    const hourText = screen.getByTestId("hourText");
    const hr = calculateHours(3700);
    expect(hourText).toHaveTextContent(`${hr}`);
  });

  it("Minutes should render properly when time is passed into clock", () => {
    render(
      <Clock counterSeconds={3700} counterIntervals={0} intervalTitle="" />
    );

    const minuteText = screen.getByTestId("minuteText");
    const min = calculateMinutes(3700);
    expect(minuteText).toHaveTextContent(`${min}`);
  });

  it("Seconds should render properly when time is passed into clock", () => {
    render(
      <Clock counterSeconds={3700} counterIntervals={0} intervalTitle="" />
    );

    const secondText = screen.getByTestId("secondText");
    const sec = calculateSeconds(3700);
    expect(secondText).toHaveTextContent(`${sec}`);
  });
});

describe("Clock Button Rendering", () => {
  it("should render pause button as disabled intially", () => {
    render(<TimeToggleButtons />);
    const pauseButton = screen.getByTestId("pauseButton");
    expect(pauseButton).toBeDisabled();
  });

  it("should render reset button", () => {
    render(<TimeToggleButtons />);
    const resetButton = screen.getByTestId("resetButton");
    expect(resetButton).toBeInTheDocument();
  });
});
