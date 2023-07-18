import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { FC, useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { addTimer, editTimer, removeTimer, getTimers } from "@/lib/CRUD_Timers";
import timers from "../DefaultTimers";
import { TimerDataType } from "@/lib/types";

jest.mock("../../CRUD_Timers");

const TimerComponent: FC = () => {
  const [timers, setTimers] = useState<{
    data: TimerDataType[];
    error: null | PostgrestError;
  }>({
    data: [],
    error: null,
  });

  useEffect(() => {
    getTimers(setTimers);
  }, []);

  const display = () => {
    if (timers.data.length == 0) {
      return <div>No timers</div>;
    }
    if (timers.error) {
      return <div>Error: {timers.error.message}</div>;
    }
    return (
      <div>
        {timers.data.map((timer) => (
          <div key={timer.id}>Title: {timer.title}</div>
        ))}
      </div>
    );
  };
  return display();
};

describe("Mock", () => {
  describe("Add Timer", () => {
    it("Adds timer successfully", async () => {
      const result = await addTimer(timers[0]);
      expect(result).toEqual({
        data: null,
        error: null,
      });
    });
  });

  describe("Remove Timer", () => {
    it("Successfully removes timers with valid user_id", async () => {
      const timer: TimerDataType = timers[0];
      timer.user_id = "1";
      const result = await removeTimer(timer);
      expect(result).toBe(null);
    });

    it("Returns error if timer user_id is empty string", async () => {
      const timer: TimerDataType = timers[0];
      timer.user_id = "";
      const result = await removeTimer(timer);
      expect(result).toEqual({
        message: "No user ID",
        details: "No user ID associated with timer",
        hint: "IDK",
        code: "Test code",
      });
    });

    it("Returns error if timer user_id is not defined", async () => {
      const timer: TimerDataType = timers[0];
      timer.user_id = undefined;
      const result = await removeTimer(timer);
      expect(result).toEqual({
        message: "No user ID",
        details: "No user ID associated with timer",
        hint: "IDK",
        code: "Test code",
      });
    });
  });

  describe("Edit Task", () => {
    it("Edits successfully if timer has valid user_id", async () => {
      const timer: TimerDataType = timers[0];
      timer.user_id = "1";
      const result = await editTimer(timer);
      expect(result).toEqual({
        data: null,
        error: null,
      });
    });

    it("Returns error if timer user_id is empty string", async () => {
      const timer: TimerDataType = timers[0];
      timer.user_id = "";
      const result = await editTimer(timer);
      expect(result).toEqual({
        data: null,
        error: {
          message: "No user ID",
          details: "No user ID associated with timer",
          hint: "IDK",
          code: "Test code",
        },
      });
    });

    it("Returns error if timer user_id is not defined", async () => {
      const timer: TimerDataType = timers[0];
      timer.user_id = undefined;
      const result = await editTimer(timer);
      expect(result).toEqual({
        data: null,
        error: {
          message: "No user ID",
          details: "No user ID associated with timer",
          hint: "IDK",
          code: "Test code",
        },
      });
    });
  });

  describe("Get timers", () => {
    it("Gets and sets timers", async () => {
      const { findAllByText } = render(<TimerComponent />);
      const htmlArray = await findAllByText(/Title:/);
      htmlArray.forEach((elem, index) => {
        const expectedText = `Title: ${timers[index].title}`;
        expect(elem).toHaveTextContent(expectedText);
      });
    });
  });
});
