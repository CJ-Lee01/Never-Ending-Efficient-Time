"use client";
import { Stack } from "@chakra-ui/react";
import SettingsForm from "@/components/Settings/SettingsForm";
import SettingsHeader from "@/components/Settings/SettingsHeader";

export default function SettingsPage() {
  return (
    <>
      <Stack mb={48}>
        <SettingsHeader></SettingsHeader>
        <SettingsForm></SettingsForm>
      </Stack>
    </>
  );
}
