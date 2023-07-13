"use client";
import UpdatePasswordForm from "@/components/FormsUI/ResetPassword/UpdatePasswordForm";
import UpdatePasswordHeader from "@/components/FormsUI/ResetPassword/UpdatePasswordHeader";
import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";

export default function UpdatePasswordPage() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <UpdatePasswordHeader />
        <UpdatePasswordForm />
      </Stack>
    </Flex>
  );
}
