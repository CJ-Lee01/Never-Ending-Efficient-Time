"use client";
import { Heading, Stack } from "@chakra-ui/react";
import SettingsForm from "@/components/Settings/SettingsForm";

export default function SettingsPage() {
  return (
    <>
      <Stack mb={48}>
        <Heading textAlign={"left"} py={14} px={{ base: 10, lg: 48 }}>
          Settings
        </Heading>
        <SettingsForm></SettingsForm>
      </Stack>
    </>
  );
}
