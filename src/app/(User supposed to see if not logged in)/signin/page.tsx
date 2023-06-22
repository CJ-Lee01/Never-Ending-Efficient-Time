"use client";
import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";

import SignInHeading from "@/components/FormsUI/SignIn/SignInHeading";
import SignInForm from "@/components/FormsUI/SignIn/SignInForm";

export default function SignInPage() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <SignInHeading />
        <SignInForm />
      </Stack>
    </Flex>
  );
}
