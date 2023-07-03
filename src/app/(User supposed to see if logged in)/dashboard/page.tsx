"use client";

import ToDoSummary from "@/components/Dashboard/ToDoSummary";
import Annoucements from "@/components/Dashboard/Annoucements";
import { Stack, Heading } from "@chakra-ui/react";

export default function dashboard() {
  return (
    <Stack direction="column" minH={"100vh"}>
      <Heading textAlign={"left"} p={14}>
        Welcome, Username
      </Heading>
      <Stack direction={{ base: "column", lg: "row" }} mb={{ base: 10, lg: 0 }}>
        <ToDoSummary />
        <Annoucements />
      </Stack>
    </Stack>
  );
}
