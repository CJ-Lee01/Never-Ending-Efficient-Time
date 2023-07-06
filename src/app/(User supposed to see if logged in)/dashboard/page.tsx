"use client";

import ToDoSummary from "@/components/Dashboard/ToDoSummary";
import Annoucements from "@/components/Dashboard/Annoucements";
import { Stack, Heading } from "@chakra-ui/react";
import { getProfile } from "@/lib/CRUD_Profile";
import { ProfileType } from "@/lib/types";
import { PostgrestError } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

export default function dashboard() {
  const [ProfileData, setProfileData] = useState<{
    data: ProfileType | null;
    error: PostgrestError | null;
  }>({
    data: null,
    error: null,
  });

  useEffect(() => {
    getProfile(setProfileData);
  }, []);

  return (
    <Stack direction="column" minH={"100vh"}>
      <Heading textAlign={"left"} p={14}>
        Welcome, {ProfileData.data?.full_name}
      </Heading>
      <Stack direction={{ base: "column", lg: "row" }} mb={{ base: 10, lg: 0 }}>
        <ToDoSummary />
        <Annoucements />
      </Stack>
    </Stack>
  );
}
