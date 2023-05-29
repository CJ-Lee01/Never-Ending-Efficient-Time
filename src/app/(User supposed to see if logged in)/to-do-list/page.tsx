"use client";
import { Stack } from "@chakra-ui/react";
import ToDoList from "@/components/ToDoList/ToDoList";

export default function ToDoPage() {
  return (
    <>
      <Stack align="center" width="100%">
        <ToDoList />
      </Stack>
    </>
  );
}
