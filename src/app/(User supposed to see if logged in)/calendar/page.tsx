"use client";
import CalendarGrid from "@/components/Calendar/CalendarGrid";
import EventsList from "@/components/Calendar/EventsList";
import { ICSinputHandler } from "@/components/Calendar/ICSinputHandler";
import { URLinputHandler } from "@/components/Calendar/URLinputHandler";
import { defaultEvent, getEvent } from "@/lib/CRUD_Calendar";
import { eventInformation } from "@/lib/types";
import {
  Grid,
  GridItem,
  Stack,
  Image,
  FormControl,
  FormLabel,
  Divider,
  useColorModeValue,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { PostgrestError } from "@supabase/supabase-js";
import { ChangeEvent, ChangeEventHandler, createContext, useEffect, useState } from "react";

export const EventListInfoContext = createContext<
  {
    events: eventInformation[],
    pageUpdater: () => void,
  }
>({
  events: [],
  pageUpdater: () => { },
});

export default function CalendarPage() {
  const [eventList, setEventList] = useState<{
    data: eventInformation[] | null,
    error: PostgrestError | null,
  }>({
    data: null,
    error: null,
  })


  const [dummy, updateEvent] = useState<boolean>(false); //just a gimmick to ensure that the page is rerendered.
  const pageUpdater = () => updateEvent(prevBool => !prevBool);

  useEffect(() => {
    getEvent(setEventList);
  }, [dummy])


  return (
    <EventListInfoContext.Provider value={{ events: eventList.data ?? [], pageUpdater: pageUpdater }}>
      <Grid
        gridTemplateRows={"1fr"}
        gridTemplateColumns={{ base: "1fr", md: "1fr", xl: "6fr 2fr" }}
        gap={6}
        p={16}
      >
        <GridItem>
          <CalendarGrid />
        </GridItem>
        <GridItem>
          <Stack align={"center"}>
            <Stack
              borderRadius={15}
              borderColor={useColorModeValue("blackAlpha.300", "whiteAlpha.500")}
              borderWidth={1}
              p={3}
              mb={4}
            >
              <URLinputHandler />
            </Stack>
            <Divider
              borderColor={useColorModeValue("orange.300", "green.300")}
              borderWidth={1}
            />
            <EventsList />
          </Stack>
        </GridItem>
      </Grid>
    </EventListInfoContext.Provider>
  );
}
