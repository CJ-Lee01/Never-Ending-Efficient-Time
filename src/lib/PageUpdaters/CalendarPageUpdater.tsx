import { createContext } from "react";
import { eventInformation } from "../types";

export const EventListInfoContext = createContext<
  {
    events: eventInformation[],
    pageUpdater: () => void,
  }
>({
  events: [],
  pageUpdater: () => { },
});