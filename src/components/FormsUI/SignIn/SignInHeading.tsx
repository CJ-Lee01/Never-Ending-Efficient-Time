import { Stack, Heading, Text, Link } from "@chakra-ui/react";

export default function SignInHeading() {
  return (
    <Stack align={"center"}>
      <Heading fontSize={"4xl"}>Sign in to your account</Heading>
      <Text fontSize={"lg"} color={"gray.600"}>
        to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
      </Text>
    </Stack>
  )
};