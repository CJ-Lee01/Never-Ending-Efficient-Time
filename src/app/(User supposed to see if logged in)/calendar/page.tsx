"use client";
import CalendarGrid from "@/components/Calendar/calendarGrid";
import { Button, Grid, GridItem, Stack, Image } from "@chakra-ui/react";

export default function CalendarPage() {
  return (
    <Stack>
      <Grid
        templateAreas={`"calendar button"
                      "calendar NUSmods"
                      "calendar events"`}
        gridTemplateRows={"1fr 2fr 2fr"}
        gridTemplateColumns={"5fr 1fr"}
        gap={6}
        p={16}
      >
        <GridItem area={"calendar"}>
          <CalendarGrid />
        </GridItem>
        <GridItem area={"button"} p={6}>
          <Button bg="orange.300">Switch View</Button>
        </GridItem>
        <GridItem bg="green.300" area={"NUSmods"} borderRadius={15}>
          <Image src="/images/NUSmods.png" alt=""/>
        </GridItem>
        <GridItem bg="blue.300" area={"events"} borderRadius={15} p={6}>
          Events List
        </GridItem>
      </Grid>
    </Stack>
  );
}
