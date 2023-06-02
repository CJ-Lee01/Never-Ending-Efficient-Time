"use client";

import { Grid, GridItem, Stack, Spacer } from "@chakra-ui/react";
import Clock from "@/components/Timer/Clock";
import TimerSettings from "@/components/Timer/TimerSettings";

export default function TimerPage() {
  return (
    <Stack
      justify={"center"}
      spacing={{ base: 20, xl: 36 }}
      py={{ base: 20, md: 28 }}
      px={{ base: 5, xl: 10 }}
      direction={{ base: "column", xl: "row" }}
    >
      <Clock />
      <TimerSettings />
    </Stack>
  );
}
