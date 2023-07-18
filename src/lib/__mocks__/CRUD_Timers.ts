import { Dispatch, SetStateAction } from "react";
import { TimerDataType } from "../types";
import { PostgrestError } from "@supabase/supabase-js";

const timerFunctions = jest.createMockFromModule<typeof import("../CRUD_Timers")>("../CRUD_Timers")