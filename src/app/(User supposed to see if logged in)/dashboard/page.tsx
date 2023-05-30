"use client";

import NotLoggedIn from "@/components/AuthUI/NotLoggedIn";
import { AuthError, Session } from "@supabase/supabase-js";
import { useState } from "react";
import { supabaseUser } from "@/lib/initSupabase";
import SignOutButton from "@/components/AuthUI/SignOutButton";
import ToDoSummary from "@/components/Dashboard/ToDoSummary";
import Annoucements from "@/components/Dashboard/Annoucements";
import { Button, Flex, Stack } from "@chakra-ui/react";

export default function dashboard() {


  return (
    <Flex>
      <Stack direction={{ base: "column", md: "row" }}>
        <ToDoSummary />
        <Annoucements />
      </Stack>
    </Flex>
  );
}
