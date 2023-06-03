"use client";
import CalendarGrid from "@/components/Calendar/CalendarGrid";
import EventsList from "@/components/Calendar/EventsList";
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
} from "@chakra-ui/react";
import { PostgrestError } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";

export const EventInfoContext = createContext<
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
    <EventInfoContext.Provider value={{ events: eventList.data ?? [], pageUpdater: pageUpdater }}>
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
              <Stack px={{ base: 28, xl: 12 }} pb={10}>
                <Image src="/images/NUSmods.png" alt="" />
                <FormControl justifyContent="center">
                  <FormLabel>Enter your NUSmods timetable link:</FormLabel>
                  <Textarea size="lg" resize="none"></Textarea>
                </FormControl>
              </Stack>
            </Stack>
            <Divider
              borderColor={useColorModeValue("orange.300", "green.300")}
              borderWidth={1}
            />
            <EventsList />
          </Stack>
        </GridItem>
      </Grid>
    </EventInfoContext.Provider>
  );
}
