"use client";
import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";

import ForgetPasswordHeader from "@/components/FormsUI/ResetPassword/ForgetPasswordHeader";
import ForgetPasswordForm from "@/components/FormsUI/ResetPassword/ForgetPasswordForm";

export default function ForgetPasswordPage() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <ForgetPasswordHeader />
        <ForgetPasswordForm />
      </Stack>
    </Flex>
  );
}
