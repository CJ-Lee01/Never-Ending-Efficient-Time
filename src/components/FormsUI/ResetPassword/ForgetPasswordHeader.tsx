import { Stack, Heading, Text } from "@chakra-ui/react";

export default function ForgetPasswordHeader() {
  return (
    <Stack align={"center"}>
      <Heading fontSize={"4xl"}>Reset your Password</Heading>
      <Text fontSize={"lg"} color={"gray.600"}>
        by entering your{" "}
        <Text as={"span"} color={"blue.400"}>
          Email
        </Text>
      </Text>
    </Stack>
  );
}
