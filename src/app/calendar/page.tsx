"use client";
import CalendarGrid from "@/components/Calendar/calendarGrid";
import { Grid, GridItem, Stack } from "@chakra-ui/react";

export default function CalendarPage() {
  return (
    <Stack>
      <Grid
        templateAreas={`"calendar button"
                      "calendar NUSmods"
                      "calendar events"`}
        gridTemplateRows={"1fr 2fr 2fr"}
        gridTemplateColumns={"5fr 1fr"}
      >
        <GridItem bg="orange.300" area={"calendar"}>
          <CalendarGrid />
        </GridItem>
        <GridItem bg="pink.300" area={"button"}>
          button
        </GridItem>
        <GridItem bg="green.300" area={"NUSmods"}>
          NUSmods Schedule
        </GridItem>
        <GridItem bg="blue.300" area={"events"}>
          events
        </GridItem>
      </Grid>
    </Stack>
  );
}
