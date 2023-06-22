"use client";

import { Stack, Heading, Text } from "@chakra-ui/react";

export default function SignUpHeader() {
  return (
    <Stack align={"center"}>
      <Heading fontSize={"4xl"} textAlign={"center"}>
        Sign up
      </Heading>
      <Text fontSize={"lg"} color={"gray.600"}>
        to enjoy all of our cool{" "}
        <Text as={"span"} color={"blue.400"}>
          features
        </Text>
      </Text>
    </Stack>
  );
}
