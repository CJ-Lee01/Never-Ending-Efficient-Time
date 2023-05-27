"use client";
import { Grid, Stack, Image, Button } from "@chakra-ui/react";
import ToDoSummary from "@/components/Dashboard/ToDoSummary";

export default function ToDoPage() {
  return (
    <Stack align="center">
      <Image src="/images/WIP.png" w="300px" p={6} />
      <Button>Add Item</Button>
      <ToDoSummary />
    </Stack>
  );
}
