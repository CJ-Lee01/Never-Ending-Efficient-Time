"use client";

import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import SignUpHeader from "@/components/FormsUI/SignUp/SignUpHeader";
import SignUpForm from "@/components/FormsUI/SignUp/SignUpForm";

export default function SignUpPage() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <SignUpHeader />
        <SignUpForm />
      </Stack>
    </Flex>
  );
}
