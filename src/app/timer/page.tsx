"use client";

import { Grid, GridItem, Stack, Spacer } from "@chakra-ui/react";
import Clock from "@/components/Timer/Clock";
import TimerSettings from "@/components/Timer/TimerSettings";

export default function TimerPage() {
  return (
    <Stack
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: "column", md: "row" }}
    >
      <Clock />
      <TimerSettings />
    </Stack>
  );
}
