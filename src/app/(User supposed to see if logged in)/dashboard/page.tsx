"use client";

import ToDoSummary from "@/components/Dashboard/ToDoSummary";
import Annoucements from "@/components/Dashboard/Annoucements";
import { Stack, Heading } from "@chakra-ui/react";

export default function dashboard() {
  return (
    <Stack direction="column" minH={"100vh"}>
      <Heading textAlign={"left"} p={10}>
        Welcome, Username
      </Heading>
      <Stack direction={{ base: "column", lg: "row" }}>
        <ToDoSummary />
        <Annoucements />
      </Stack>
    </Stack>
  );
}
