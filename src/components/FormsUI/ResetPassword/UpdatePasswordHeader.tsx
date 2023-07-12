import { Stack, Heading, Text, Link } from "@chakra-ui/react";

export default function UpdatePasswordHeader() {
  return (
    <Stack align={"center"}>
      <Heading fontSize={"4xl"}>Update your Password</Heading>
      <Text fontSize={"lg"} color={"gray.600"}>
        Enter your new{" "}
        <Text as={"span"} color={"blue.400"}>
          Password
        </Text>
      </Text>
    </Stack>
  );
}
