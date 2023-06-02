"use client";
import CalendarGrid from "@/components/Calendar/CalendarGrid";
import EventsList from "@/components/Calendar/EventsList";
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

export default function CalendarPage() {
  return (
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
  );
}
