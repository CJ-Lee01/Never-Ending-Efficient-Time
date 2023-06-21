"use client";

import ToDoSummary from "@/components/Dashboard/ToDoSummary";
import Annoucements from "@/components/Dashboard/Annoucements";
import { Flex, Stack, Heading } from "@chakra-ui/react";

export default function dashboard() {
  return (
    <Flex minH={"100vh"}>
      <Stack direction="column">
        <Heading textAlign={"left"} p={10}>
          Welcome, Username
        </Heading>
        <Stack direction={{ base: "column", md: "row" }}>
          <ToDoSummary />
          <Annoucements />
        </Stack>
      </Stack>
    </Flex>
  );
}
