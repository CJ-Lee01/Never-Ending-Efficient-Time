import { Dispatch, SetStateAction } from "react";
import { TimerDataType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";
import timers from "./DefaultTimers";

/*
addTimer: returns { data: null, error: null }
removeTimer: returns null if user_id is valid. Otherwise, returns error.
editTimer: returns { data: null, error: null } if user_id is valid. Otherwise, returns error.
getTimers: sets the timer list.
*/

const timerFunctions =
  jest.createMockFromModule<typeof import("../CRUD_Timers")>("../CRUD_Timers");

timerFunctions.addTimer = async (timer: TimerDataType) => {
  return {
    data: null,
    error: null,
  };
};

timerFunctions.removeTimer = async (timer: TimerDataType) => {
  if (!timer.user_id) {
    return {
      message: "No user ID",
      details: "No user ID associated with timer",
      hint: "IDK",
      code: "Test code",
    };
  }
  return null;
};

timerFunctions.editTimer = async (timer: TimerDataType) => {
  if (!timer.user_id) {
    return {
      data: null,
      error: {
        message: "No user ID",
        details: "No user ID associated with timer",
        hint: "IDK",
        code: "Test code",
      },
    };
  }
  return {
    data: null,
    error: null,
  };
};

timerFunctions.getTimers = async (
  setState: Dispatch<
    SetStateAction<{
      data: any;
      error: null | PostgrestError;
    }>
  >
) => {
  setState({
    data: timers,
    error: null,
  });
};

module.exports = timerFunctions;
