"use client";

import { Grid, GridItem, Stack, Spacer } from "@chakra-ui/react";
import Clock from "@/components/Timer/Clock";
import TimerSettings from "@/components/Timer/TimerSettings";

export default function TimerPage() {
  return (
    <Stack direction={"row"}>
      <Clock />
      <Spacer />
      <TimerSettings />
    </Stack>
  );
}
